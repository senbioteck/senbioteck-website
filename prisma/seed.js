"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const crypto = __importStar(require("crypto"));
const prisma = new client_1.PrismaClient();
function hashPassword(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}
async function main() {
    console.log('Starting seed...');
    await prisma.emailLog.deleteMany();
    await prisma.appointment.deleteMany();
    await prisma.appointmentSlot.deleteMany();
    await prisma.patient.deleteMany();
    await prisma.healthResource.deleteMany();
    await prisma.blogPost.deleteMany();
    await prisma.category.deleteMany();
    await prisma.teamMember.deleteMany();
    await prisma.contactMessage.deleteMany();
    await prisma.page.deleteMany();
    await prisma.user.deleteMany();
    const admin = await prisma.user.create({
        data: {
            email: 'admin@senbioteck.com',
            passwordHash: hashPassword('admin123'),
            role: client_1.UserRole.ADMIN,
            firstName: 'Admin',
            lastName: 'User',
            phone: '+33123456789',
            consentGivenAt: new Date(),
        },
    });
    const doctor = await prisma.user.create({
        data: {
            email: 'dr.martin@senbioteck.com',
            passwordHash: hashPassword('doctor123'),
            role: client_1.UserRole.MEDICAL_TEAM,
            firstName: 'Sophie',
            lastName: 'Martin',
            phone: '+33123456790',
            consentGivenAt: new Date(),
        },
    });
    const nurse = await prisma.user.create({
        data: {
            email: 'nurse.petit@senbioteck.com',
            passwordHash: hashPassword('nurse123'),
            role: client_1.UserRole.MEDICAL_TEAM,
            firstName: 'Marie',
            lastName: 'Petit',
            phone: '+33123456791',
            consentGivenAt: new Date(),
        },
    });
    const patient1 = await prisma.patient.create({
        data: {
            firstName: 'Jean',
            lastName: 'Dupont',
            email: 'jean.dupont@email.com',
            phone: '+33612345678',
            dateOfBirth: new Date('1985-03-15'),
            gender: 'Male',
            address: '123 Rue de Paris, 75001 Paris',
            emergencyContact: 'Marie Dupont',
            emergencyPhone: '+33698765432',
            notes: 'Allergie aux penicillines',
            consentGivenAt: new Date(),
            dataRetentionDate: new Date('2035-03-15'),
            gdprDeletableAt: new Date('2030-03-15'),
        },
    });
    const patient2 = await prisma.patient.create({
        data: {
            firstName: 'Claire',
            lastName: 'Bernard',
            email: 'claire.bernard@email.com',
            phone: '+33623456789',
            dateOfBirth: new Date('1992-07-22'),
            gender: 'Female',
            consentGivenAt: new Date(),
        },
    });
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(9, 0, 0, 0);
    const slot1 = await prisma.appointmentSlot.create({
        data: {
            professionalId: doctor.id,
            startTime: tomorrow,
            endTime: new Date(tomorrow.getTime() + 30 * 60000),
            status: client_1.SlotStatus.AVAILABLE,
        },
    });
    const slot2 = await prisma.appointmentSlot.create({
        data: {
            professionalId: doctor.id,
            startTime: new Date(tomorrow.getTime() + 30 * 60000),
            endTime: new Date(tomorrow.getTime() + 60 * 60000),
            status: client_1.SlotStatus.BOOKED,
        },
    });
    const appointment = await prisma.appointment.create({
        data: {
            slotId: slot2.id,
            patientId: patient1.id,
            userId: doctor.id,
            status: client_1.AppointmentStatus.SCHEDULED,
            reason: 'Consultation annuelle',
        },
    });
    await prisma.page.create({
        data: {
            slug: 'accueil',
            title: 'Bienvenue chez Senbioteck',
            body: {
                hero: {
                    title: 'Votre santé, notre priorité',
                    subtitle: 'Centre de santé polyvalent dédié à votre bien-être',
                },
                sections: [
                    { type: 'services', title: 'Nos Services' },
                    { type: 'contact', title: 'Contactez-nous' },
                ],
            },
            status: client_1.PageStatus.PUBLISHED,
            version: 1,
            publishedAt: new Date(),
        },
    });
    await prisma.page.create({
        data: {
            slug: 'about',
            title: 'À propos',
            body: {
                content: 'Senbioteck est un centre de santé innovant...',
            },
            status: client_1.PageStatus.PUBLISHED,
            version: 1,
            publishedAt: new Date(),
        },
    });
    const categorySante = await prisma.category.create({
        data: {
            name: 'Santé',
            slug: 'sante',
            description: 'Articles sur la santé générale',
        },
    });
    await prisma.blogPost.create({
        data: {
            title: 'Les bienfaits de la prévention',
            slug: 'bienfaits-prevention',
            excerpt: 'Découvrez pourquoi la prévention est essentielle...',
            body: {
                content: 'La prévention est le meilleur traitement...',
            },
            status: client_1.BlogPostStatus.PUBLISHED,
            categoryId: categorySante.id,
            tags: ['prévention', 'santé'],
            publishedAt: new Date(),
        },
    });
    await prisma.teamMember.create({
        data: {
            firstName: 'Sophie',
            lastName: 'Martin',
            role: 'Médecin Chef',
            department: 'Médecine Générale',
            bio: 'Dr. Martin a plus de 15 ans d\'expérience en médecine générale.',
            email: 'dr.martin@senbioteck.com',
            phone: '+33123456790',
            displayOrder: 1,
            isActive: true,
            socialLinks: { linkedin: 'https://linkedin.com/in/dr-martin' },
        },
    });
    await prisma.teamMember.create({
        data: {
            firstName: 'Marie',
            lastName: 'Petit',
            role: 'Infirmière Diplômée',
            department: 'Soins Infirmiers',
            bio: 'Marie est spécialisée en soins infirmiers depuis 8 ans.',
            displayOrder: 2,
            isActive: true,
        },
    });
    await prisma.contactMessage.create({
        data: {
            name: 'Pierre Durand',
            email: 'pierre.durand@email.com',
            phone: '+33612345678',
            subject: 'Rendez-vous',
            message: 'Je souhaite prendre rendez-vous pour une consultation.',
            isRead: false,
        },
    });
    await prisma.healthResource.create({
        data: {
            title: 'Guide de la prévention cardiovasculaire',
            slug: 'guide-prevention-cardiovasculaire',
            description: 'Un guide complet pour maintenir votre cœur en bonne santé.',
            content: {
                sections: [
                    { title: 'Alimentation', content: 'Une alimentation équilibrée...' },
                    { title: 'Activité physique', content: '30 minutes d\'exercice par jour...' },
                ],
            },
            category: client_1.ResourceCategory.PREVENTION,
            isFeatured: true,
            publishedAt: new Date(),
        },
    });
    await prisma.healthResource.create({
        data: {
            title: 'Premiers secours : Gestes qui sauvent',
            slug: 'premiers-secours',
            description: 'Apprenez les gestes essentiels des premiers secours.',
            content: {
                sections: [
                    { title: 'PLS', content: 'Position Latérale de Sécurité...' },
                    { title: 'Massage cardiaque', content: 'En cas d\'arrêt cardiaque...' },
                ],
            },
            category: client_1.ResourceCategory.EMERGENCY,
            publishedAt: new Date(),
        },
    });
    await prisma.emailLog.create({
        data: {
            userId: admin.id,
            recipient: 'admin@senbioteck.com',
            subject: 'Bienvenue sur Senbioteck',
            body: 'Votre compte a été créé avec succès.',
            status: 'sent',
        },
    });
    console.log('Seed completed successfully');
    console.log({
        users: [admin.email, doctor.email, nurse.email],
        patients: [patient1.email, patient2.email],
        appointments: appointment.id,
    });
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map