# E2E Tests - Senbioteck

## Overview

This directory contains Playwright E2E tests for the Senbioteck platform including:
- Patient Portal (appointment booking, health resources, contact)
- Admin Portal (content management, appointment management)

## Prerequisites

- Node.js 20+
- Docker and Docker Compose (for local development)
- All services running: API (port 3000), PostgreSQL (port 5432), Redis (port 6379)

## Setup

```bash
# Install dependencies
npm install

# Install Playwright browsers
npm run test:e2e:install

# Run all E2E tests
npm run test:e2e

# Run tests with UI
npm run test:e2e:ui

# Run specific test file
npx playwright test e2e/specs/appointment-booking.spec.ts
```

## Test Structure

```
e2e/
├── fixtures/              # Test fixtures and helpers
│   └── base.fixture.ts
├── pages/                 # Page Object Models
│   ├── base.page.ts
│   ├── login.page.ts
│   ├── patient-portal.page.ts
│   ├── appointments.page.ts
│   ├── health-resources.page.ts
│   ├── contact.page.ts
│   ├── admin-login.page.ts
│   ├── admin-dashboard.page.ts
│   ├── content-management.page.ts
│   ├── admin-appointments.page.ts
│   └── admin-contact.page.ts
└── specs/                 # Test specifications
    ├── appointment-booking.spec.ts
    ├── health-resources.spec.ts
    ├── contact-form.spec.ts
    ├── admin-auth.spec.ts
    ├── admin-content-management.spec.ts
    └── admin-appointments.spec.ts
```

## Test Coverage Summary

| Suite | Tests | Description |
|-------|-------|-------------|
| Appointment Booking | 14 | Patient appointment booking flows |
| Health Resources | 15 | Health resource search and consultation |
| Contact Form | 14 | Contact form validation and submission |
| Admin Auth | 16 | Admin login/logout and route protection |
| Admin Content | 11 | CMS content management |
| Admin Appointments | 15 | Appointment management and validation |
| **Total** | **85** | |

### Patient Portal Tests

#### 1. Appointment Booking (14 tests)
- View appointments list
- Open booking modal, professional/date/time selection
- Booking confirmation/cancellation
- Error handling for invalid bookings
- Responsive design (mobile + tablet)

#### 2. Health Resource Consultation (15 tests)
- Resource search and category filtering
- Resource detail modal view
- Empty state handling
- Responsive design (mobile + tablet)

#### 3. Contact Form (14 tests)
- Form validation and submission
- Required field validation
- Success/error messaging
- Responsive design (mobile + tablet)

### Admin Portal Tests

#### 4. Admin Authentication (16 tests)
- Admin login with valid/invalid credentials
- Route protection (redirect to login)
- Logout functionality
- Responsive design

#### 5. Content Management (11 tests)
- Tab navigation (Pages, Blog Posts, Categories, Health Resources)
- Content creation modal
- Search functionality
- Responsive design

#### 6. Admin Appointments Management (15 tests)
- Appointment filtering (status, date)
- Appointment confirmation/cancellation/completion
- Appointment details modal
- Empty state handling
- Responsive design

## Expected API Endpoints

### Authentication
```
POST /auth/login
  Request: { email: string, password: string }
  Response: { accessToken: string, user: User }

POST /auth/register
  Request: { email: string, password: string, firstName: string, lastName: string }
  Response: { accessToken: string, user: User }

POST /auth/logout
  Headers: Authorization: Bearer <token>
```

### Patient Portal

#### Appointments
```
GET /appointments
  Headers: Authorization: Bearer <token>
  Response: Appointment[]

POST /appointments
  Headers: Authorization: Bearer <token>
  Request: { slotId: string, reason?: string }
  Response: Appointment

PATCH /appointments/:id/cancel
  Headers: Authorization: Bearer <token>
  Request: { cancellationReason?: string }
  Response: Appointment

GET /appointments/slots?professionalId=&date=
  Headers: Authorization: Bearer <token>
  Response: AppointmentSlot[]
```

#### Health Resources
```
GET /health-resources
  Query: ?category=&search=&page=&limit=
  Response: HealthResource[]

GET /health-resources/:slug
  Response: HealthResource
```

#### Contact
```
POST /contact
  Request: { name: string, email: string, phone?: string, subject?: string, message: string }
  Response: ContactMessage
```

### Admin Portal

#### Content Management
```
GET /admin/pages
  Headers: Authorization: Bearer <token>, Role: ADMIN
  Response: Page[]

POST /admin/pages
  Headers: Authorization: Bearer <token>, Role: ADMIN
  Request: { slug, title, body, status }
  Response: Page

PATCH /admin/pages/:id
  Headers: Authorization: Bearer <token>, Role: ADMIN
  Response: Page

DELETE /admin/pages/:id
  Headers: Authorization: Bearer <token>, Role: ADMIN

GET /admin/blog-posts
POST /admin/blog-posts
PATCH /admin/blog-posts/:id
DELETE /admin/blog-posts/:id

GET /admin/categories
POST /admin/categories
PATCH /admin/categories/:id
DELETE /admin/categories/:id

GET /admin/health-resources
POST /admin/health-resources
PATCH /admin/health-resources/:id
DELETE /admin/health-resources/:id
```

#### Admin Appointments
```
GET /admin/appointments
  Headers: Authorization: Bearer <token>, Role: ADMIN
  Query: ?status=&date=&search=
  Response: Appointment[]

PATCH /admin/appointments/:id/confirm
  Headers: Authorization: Bearer <token>, Role: ADMIN
  Response: Appointment

PATCH /admin/appointments/:id/complete
  Headers: Authorization: Bearer <token>, Role: ADMIN
  Response: Appointment

PATCH /admin/appointments/:id/cancel
  Headers: Authorization: Bearer <token>, Role: ADMIN
  Request: { cancellationReason: string }
  Response: Appointment
```

#### Admin Contact Messages
```
GET /admin/contact-messages
  Headers: Authorization: Bearer <token>, Role: ADMIN
  Query: ?unread=
  Response: ContactMessage[]

PATCH /admin/contact-messages/:id/read
  Headers: Authorization: Bearer <token>, Role: ADMIN
  Response: ContactMessage

PATCH /admin/contact-messages/:id/replied
  Headers: Authorization: Bearer <token>, Role: ADMIN
  Response: ContactMessage

DELETE /admin/contact-messages/:id
  Headers: Authorization: Bearer <token>, Role: ADMIN
```

## Data Models

### User
```typescript
{
  id: string;
  email: string;
  role: 'ADMIN' | 'MEDICAL_TEAM' | 'STAFF';
  firstName: string;
  lastName: string;
  phone?: string;
  isActive: boolean;
}
```

### Patient
```typescript
{
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  dateOfBirth?: Date;
  consentGivenAt: Date;
}
```

### Appointment
```typescript
{
  id: string;
  slotId: string;
  patientId: string;
  userId: string;
  status: 'SCHEDULED' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED' | 'NO_SHOW';
  reason?: string;
  cancellationReason?: string;
  scheduledAt: Date;
}
```

### HealthResource
```typescript
{
  id: string;
  title: string;
  slug: string;
  description?: string;
  content: Json;
  category: 'PREVENTION' | 'TREATMENT' | 'REHABILITATION' | 'WELLNESS' | 'EMERGENCY';
  isFeatured: boolean;
}
```

## Browser Support

- Chromium (Chrome)
- Firefox
- Safari (WebKit)
- Mobile Chrome (Pixel 5)
- Mobile Safari (iPhone 12)
- Tablet Chrome (iPad gen 7)

## Reports

Test reports are generated in:
- HTML: `e2e/reports/html/index.html`
- JSON: `e2e/reports/json/results.json`

## CI Integration

In CI environments, tests run with:
- 2 retries
- Single worker
- Forced forbidOnly

Set `BASE_URL` environment variable for CI deployments.