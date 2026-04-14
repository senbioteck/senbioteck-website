import * as crypto from 'crypto';

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 16;
const AUTH_TAG_LENGTH = 16;
const SALT_LENGTH = 64;
const KEY_LENGTH = 32;
const ITERATIONS = 100000;

export class EncryptionService {
  private key: Buffer;

  constructor(encryptionKey: string) {
    const salt = crypto.createHash('sha256').update(encryptionKey + 'senbioteck-salt').digest();
    this.key = crypto.pbkdf2Sync(encryptionKey, salt, ITERATIONS, KEY_LENGTH, 'sha512');
  }

  private getIv(): Buffer {
    return crypto.randomBytes(IV_LENGTH);
  }

  encrypt(plaintext: string): string {
    const iv = this.getIv();
    const cipher = crypto.createCipheriv(ALGORITHM, this.key, iv);

    let encrypted = cipher.update(plaintext, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    const authTag = cipher.getAuthTag();

    return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted}`;
  }

  decrypt(ciphertext: string): string {
    const parts = ciphertext.split(':');
    if (parts.length !== 3) {
      throw new Error('Invalid ciphertext format');
    }

    const iv = Buffer.from(parts[0], 'hex');
    const authTag = Buffer.from(parts[1], 'hex');
    const encrypted = parts[2];

    const decipher = crypto.createDecipheriv(ALGORITHM, this.key, iv);
    decipher.setAuthTag(authTag);

    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  }

  encryptObject<T extends Record<string, any>>(obj: T, fields: (keyof T)[]): T {
    const result = { ...obj };
    for (const field of fields) {
      if (typeof result[field] === 'string' && result[field]) {
        (result as any)[field] = this.encrypt(result[field]);
      }
    }
    return result;
  }

  decryptObject<T extends Record<string, any>>(obj: T, fields: (keyof T)[]): T {
    const result = { ...obj };
    for (const field of fields) {
      if (typeof result[field] === 'string' && result[field] && result[field].includes(':')) {
        try {
          (result as any)[field] = this.decrypt(result[field]);
        } catch {
          // Field may not be encrypted
        }
      }
    }
    return result;
  }
}

export const SENSITIVE_PATIENT_FIELDS = ['email', 'phone', 'address', 'emergencyContact', 'emergencyPhone', 'notes'] as const;

export function createEncryptionMiddleware(encryptionKey: string) {
  const encryptionService = new EncryptionService(encryptionKey);

  return {
    async encryptOnCreate(params: any, next: any) {
      if (params.model === 'Patient' && params.action === 'create') {
        const data = encryptionService.encryptObject(
          params.args.data,
          SENSITIVE_PATIENT_FIELDS
        );
        params.args.data = data;
      }
      return next(params);
    },

    async encryptOnUpdate(params: any, next: any) {
      if (params.model === 'Patient' && (params.action === 'update' || params.action === 'updateMany')) {
        const data = encryptionService.encryptObject(
          params.args.data,
          SENSITIVE_PATIENT_FIELDS
        );
        params.args.data = data;
      }
      return next(params);
    },

    async decryptOnRead(result: any, params: any, next: any) {
      if (params.model === 'Patient' && (params.action === 'findUnique' || params.action === 'findFirst' || params.action === 'findMany')) {
        if (Array.isArray(result)) {
          return result.map(r => encryptionService.decryptObject(r, SENSITIVE_PATIENT_FIELDS));
        }
        return encryptionService.decryptObject(result, SENSITIVE_PATIENT_FIELDS);
      }
      return result;
    }
  };
}
