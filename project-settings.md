# Project Settings & Documentation

## 📋 Project Overview

**Project Name:** Prop pulse Starter Kit 3.0  
**Version:** 0.1.0  
**Type:** Next.js + Supabase Full-Stack Web Application  
**Port:** 3028 (Development)

This is a production-ready starter kit featuring authentication, role-based access control (RBAC), user management, and a modern dashboard interface.

---

## 🛠 Tech Stack

### Frontend

- **Framework:** Next.js 16.x (App Router)
- **UI Library:** React 19.x
- **Styling:** Tailwind CSS 4.x
- **UI Components:** shadcn/ui + Radix UI
- **Icons:** Remix Icons, Tabler Icons, Lucide React
- **Forms:** React Hook Form + Zod validation
- **State Management:** React Context API
- **Themes:** next-themes (Dark/Light mode)

### Backend

- **Database:** PostgreSQL (via Supabase)
- **Authentication:** Supabase Auth
- **API:** Next.js API Routes
- **File Storage:** Supabase Storage
- **GraphQL:** Custom GraphQL server implementation
- **Email Service:** Nodemailer/Resend

### Development Tools

- **Language:** TypeScript 5.x
- **Linting:** ESLint
- **Package Manager:** npm
- **Local Development:** Supabase CLI

---

## 🔐 Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3028

# Email Configuration (Choose one provider)
# Option 1: SMTP (Nodemailer)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# Option 2: Resend
RESEND_API_KEY=your_resend_api_key

# WhatsApp Integration (Optional)
ULTRAMSG_INSTANCE_ID=your_instance_id
ULTRAMSG_TOKEN=your_token

# Supabase Local Development
SUPABASE_AUTH_EXTERNAL_APPLE_SECRET=
SENDGRID_API_KEY=
OPENAI_API_KEY=
```

---

## 🚀 Setup Instructions

### Prerequisites

- Node.js 20.x or higher
- npm or yarn
- Git
- Supabase account

### Installation Steps

1. **Clone the repository**

```bash
git clone <repository-url>
cd "starter kit 3.0"
```

2. **Install dependencies**

```bash
npm install
```

3. **Setup Supabase Database**

Follow these steps to set up your Supabase database:

a. **For new Supabase project (Recommended):**

```bash
# Step 1: Initialize Supabase
npx supabase init

# Step 2: Login to Supabase
npx supabase login

# Step 3: Link to your project (replace with your project-ref)
npx supabase link

# Step 4: Push migrations to database
npx supabase db push
```

b. **Using npm scripts (alternative):**

```bash
npm run supabase:init
npm run supabase:login
npm run supabase:link
npm run db:push
```

c. **For local Supabase development:**

```bash
# Start local Supabase instance
npx supabase start

# Access Supabase Studio at: http://localhost:54323
```

**Important Notes:**

- Get your `project-ref` from Supabase Dashboard > Settings > General > Reference ID
- Migrations are located in `supabase/migrations/`
- The main schema is in `20250501_create_base_schema.sql`
- Email template setup is in `20250510_update_email_templates.sql`
- **For detailed instructions, see `MIGRATION_GUIDE.md`**

4. **Configure environment variables**

   - Create `.env.local` file in the root directory (see template below)
   - Add your Supabase credentials
   - Configure email provider credentials

5. **Run development server**

```bash
npm run dev
```

6. **Access the application**
   - Frontend: http://localhost:3028
   - Supabase Studio: http://localhost:54323 (local setup)

---

## 🗄️ Database Initial Setup

### Option 1: Using Migrations (Recommended)

The project includes migration files in `supabase/migrations/` that will automatically set up your database schema when you run:

```bash
npm run db:migrate
```

### Option 2: Manual Setup via SQL Editor

If you prefer to set up the database manually or need to initialize a fresh Supabase project, execute the following SQL commands in order via the Supabase SQL Editor:

#### Step 1: Create User Roles ENUM Type

```sql
CREATE TYPE public.user_roles AS ENUM ('admin', 'user');
```

#### Step 2: Create Settings Table

```sql
CREATE TABLE public.settings (
  id SERIAL PRIMARY KEY,
  site_name TEXT,
  site_image TEXT,
  appearance_theme TEXT,
  primary_color TEXT,
  secondary_color TEXT,
  logo_url TEXT,
  favicon_url TEXT,
  site_description TEXT,
  meta_keywords TEXT,
  contact_email TEXT,
  social_links JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  logo_setting TEXT,
  logo_horizontal_url TEXT,
  type public.user_roles
);
```

#### Step 3: Create Roles Table

```sql
CREATE TABLE public.roles (
  id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  name public.user_roles
);
```

#### Step 4: Create User Profile Table

```sql
CREATE TABLE public.user_profile (
  id UUID PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  role_id UUID NOT NULL,
  first_name TEXT,
  last_name TEXT,
  full_name TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  last_login TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  profile_image TEXT,
  CONSTRAINT user_profile_id_fkey FOREIGN KEY (id) REFERENCES auth.users (id),
  CONSTRAINT user_profile_role_id_fkey FOREIGN KEY (role_id) REFERENCES roles (id)
);
```

#### Step 5: Create Password Resets Table

```sql
CREATE TABLE public.password_resets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  email TEXT,
  token TEXT,
  expires_at TIMESTAMPTZ,
  user_id UUID,
  used_at TIMESTAMPTZ,
  CONSTRAINT password_resets_user_id_fkey
    FOREIGN KEY (user_id) REFERENCES user_profile(id) ON DELETE CASCADE
);
```

#### Step 6: Create Storage Bucket

```sql
INSERT INTO storage.buckets (id, name, public)
VALUES ('uploads', 'uploads', true);
```

#### Step 7: Enable Row Level Security (RLS)

```sql
-- Enable RLS on Settings
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow All"
ON public.settings
FOR ALL
TO public
USING (true)
WITH CHECK (true);

-- Enable RLS on Roles
ALTER TABLE public.roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow All"
ON public.roles
FOR ALL
TO public
USING (true)
WITH CHECK (true);

-- Enable RLS on User Profile
ALTER TABLE public.user_profile ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow All"
ON public.user_profile
FOR ALL
TO public
USING (true)
WITH CHECK (true);

-- Enable RLS on Password Resets
ALTER TABLE public.password_resets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow All"
ON public.password_resets
FOR ALL
TO public
USING (true)
WITH CHECK (true);
```

#### Step 8: Insert Default Data

```sql
-- Insert default roles
INSERT INTO public.roles (id, description, name)
VALUES
  (extensions.uuid_generate_v4(), 'System administrator', 'admin'),
  (extensions.uuid_generate_v4(), 'Regular user', 'user');

-- Insert default settings
INSERT INTO public.settings (
  id,
  site_name,
  site_image,
  appearance_theme,
  primary_color,
  secondary_color,
  logo_url,
  favicon_url,
  site_description,
  meta_keywords,
  contact_email,
  social_links,
  created_at,
  updated_at,
  logo_setting,
  logo_horizontal_url,
  type
)
VALUES (
  1,
  'Prop pulse',
  NULL,
  'light',
  '#83201e',
  NULL,
  'https://eqlrncvnjdoxtxjannkw.supabase.co/storage/v1/object/public/uploads/public/mountain1-01.jpg',
  'https://eqlrncvnjdoxtxjannkw.supabase.co/storage/v1/object/public/uploads/public/mountain1-01.jpg',
  NULL,
  NULL,
  NULL,
  NULL,
  NOW(),
  NOW(),
  'square',
  NULL,
  'admin'
);
```

### Complete Setup Script

For convenience, here's the complete SQL script you can run in one go:

```sql
-- Complete Database Setup Script for Prop pulse Starter Kit 3.0

-- 1. Create ENUM Type
CREATE TYPE public.user_roles AS ENUM ('admin', 'user');

-- 2. Create Tables
CREATE TABLE public.settings (
  id SERIAL PRIMARY KEY,
  site_name TEXT,
  site_image TEXT,
  appearance_theme TEXT,
  primary_color TEXT,
  secondary_color TEXT,
  logo_url TEXT,
  favicon_url TEXT,
  site_description TEXT,
  meta_keywords TEXT,
  contact_email TEXT,
  social_links JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  logo_setting TEXT,
  logo_horizontal_url TEXT,
  type public.user_roles
);

CREATE TABLE public.roles (
  id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  name public.user_roles
);

CREATE TABLE public.user_profile (
  id UUID PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  role_id UUID NOT NULL,
  first_name TEXT,
  last_name TEXT,
  full_name TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  last_login TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  profile_image TEXT,
  CONSTRAINT user_profile_id_fkey FOREIGN KEY (id) REFERENCES auth.users (id),
  CONSTRAINT user_profile_role_id_fkey FOREIGN KEY (role_id) REFERENCES roles (id)
);

CREATE TABLE public.password_resets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  email TEXT,
  token TEXT,
  expires_at TIMESTAMPTZ,
  user_id UUID,
  used_at TIMESTAMPTZ,
  CONSTRAINT password_resets_user_id_fkey
    FOREIGN KEY (user_id) REFERENCES user_profile(id) ON DELETE CASCADE
);

-- 3. Create Storage Bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('uploads', 'uploads', true);

-- 4. Enable Row Level Security
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.password_resets ENABLE ROW LEVEL SECURITY;

-- 5. Create RLS Policies
CREATE POLICY "Allow All" ON public.settings
FOR ALL TO public USING (true) WITH CHECK (true);

CREATE POLICY "Allow All" ON public.roles
FOR ALL TO public USING (true) WITH CHECK (true);

CREATE POLICY "Allow All" ON public.user_profile
FOR ALL TO public USING (true) WITH CHECK (true);

CREATE POLICY "Allow All" ON public.password_resets
FOR ALL TO public USING (true) WITH CHECK (true);

-- 6. Insert Default Data
INSERT INTO public.roles (id, description, name)
VALUES
  (extensions.uuid_generate_v4(), 'System administrator', 'admin'),
  (extensions.uuid_generate_v4(), 'Regular user', 'user');

INSERT INTO public.settings (
  id, site_name, site_image, appearance_theme, primary_color, secondary_color,
  logo_url, favicon_url, site_description, meta_keywords, contact_email,
  social_links, created_at, updated_at, logo_setting, logo_horizontal_url, type
)
VALUES (
  1, 'Prop pulse', NULL, 'light', '#83201e', NULL,
  'https://eqlrncvnjdoxtxjannkw.supabase.co/storage/v1/object/public/uploads/public/mountain1-01.jpg',
  'https://eqlrncvnjdoxtxjannkw.supabase.co/storage/v1/object/public/uploads/public/mountain1-01.jpg',
  NULL, NULL, NULL, NULL, NOW(), NOW(), 'square', NULL, 'admin'
);
```

### Post-Setup Verification

After running the setup script, verify your database structure:

```sql
-- Check if tables were created
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
AND table_type = 'BASE TABLE';

-- Verify default roles
SELECT * FROM public.roles;

-- Verify default settings
SELECT * FROM public.settings;

-- Check storage buckets
SELECT * FROM storage.buckets WHERE id = 'uploads';
```

### Important Notes

⚠️ **Security Considerations:**

- The RLS policies above use "Allow All" for simplicity. In production, you should implement more restrictive policies based on your security requirements.
- Consider implementing proper authentication checks in your RLS policies.
- Restrict public access to sensitive tables.

💡 **Tips:**

- Make sure the `uuid-ossp` extension is enabled (usually enabled by default in Supabase)
- Update the logo URLs in the settings table to point to your own assets
- Customize the primary color (`#83201e`) to match your brand
- The `uploads` storage bucket is created as public; adjust this based on your needs

---

## 📁 Project Structure

```
starter-kit-3.0/
├── app/                          # Next.js App Router
│   ├── (dashboard)/             # Dashboard layout group
│   │   ├── dashboard/           # Main dashboard
│   │   ├── settings/            # Settings page
│   │   └── users/               # User management
│   ├── (landing)/               # Landing page layout group
│   │   ├── privacy/             # Privacy policy
│   │   └── terms/               # Terms of service
│   ├── api/                     # API routes
│   │   ├── auth/                # Authentication endpoints
│   │   ├── attachments/         # File upload handling
│   │   ├── graphql/             # GraphQL endpoint
│   │   └── send-email/          # Email sending
│   ├── auth/                    # Authentication pages
│   │   ├── login/               # Login page
│   │   ├── signup/              # Registration page
│   │   ├── forgot-password/     # Password reset request
│   │   ├── reset-password/      # Password reset form
│   │   ├── verify/              # Email verification
│   │   └── callback/            # OAuth callback
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Landing page
│
├── components/                   # React components
│   ├── (dashboard)/             # Dashboard-specific components
│   ├── (landing-page)/          # Landing page components
│   ├── auth/                    # Auth guard components
│   ├── data-table/              # Reusable data table
│   ├── main-layout/             # Main app layout
│   └── ui/                      # shadcn/ui components
│
├── context/                      # React Context providers
│   ├── AuthContext.tsx          # Authentication context
│   └── ThemeContext.tsx         # Theme management
│
├── hooks/                        # Custom React hooks
│   ├── use-debounce.ts          # Debounce hook
│   ├── use-file-upload.ts       # File upload handler
│   ├── use-mobile.ts            # Mobile detection
│   └── useGraphQL.ts            # GraphQL client hook
│
├── lib/                          # Utility libraries
│   ├── actions/                 # Server actions
│   ├── routes/                  # Route definitions
│   ├── helper/                  # Helper functions
│   ├── email-service.ts         # Email utilities
│   ├── graphql-client.ts        # GraphQL client
│   ├── permissions.ts           # Permission utilities
│   ├── supabase-auth-client.ts  # Supabase client (browser)
│   └── supabase-server-client.ts # Supabase client (server)
│
├── modules/                      # Feature modules
│   ├── auth/                    # Authentication module
│   ├── users/                   # User management module
│   ├── roles/                   # Role management module
│   └── settings/                # Settings module
│
├── supabase/                     # Supabase configuration
│   ├── migrations/              # Database migrations
│   ├── actions/                 # Database actions
│   └── config.toml              # Supabase config
│
├── types/                        # TypeScript definitions
│   ├── types.ts                 # Global types
│   └── global.d.ts              # Global type declarations
│
├── utils/                        # Utility functions
│   ├── colors.ts                # Color utilities
│   ├── format-currency.ts       # Currency formatting
│   ├── format-file-size.ts      # File size formatting
│   └── image-crop.ts            # Image cropping
│
├── middleware.ts                 # Next.js middleware
├── package.json                  # Dependencies
├── tsconfig.json                 # TypeScript config
├── next.config.ts               # Next.js config
├── tailwind.config.ts           # Tailwind config
└── components.json               # shadcn/ui config
```

---

## ✨ Features

### Authentication

- ✅ Email/Password authentication
- ✅ Email verification
- ✅ Password reset flow
- ✅ Magic link authentication (OTP)
- ✅ Protected routes with middleware
- ✅ Session management
- ✅ Auth context with React

### User Management

- ✅ User CRUD operations
- ✅ Role-based access control (RBAC)
- ✅ User profile management
- ✅ Profile image upload
- ✅ User status (active/inactive)
- ✅ Last login tracking

### Role-Based Access Control

- ✅ Predefined roles: Admin, Manager, User
- ✅ Permission-based resource access
- ✅ Dynamic role assignment
- ✅ Resource-action based permissions

### Dashboard

- ✅ Modern responsive sidebar
- ✅ User dropdown menu
- ✅ Settings page
- ✅ Theme switcher (light/dark)
- ✅ User management interface
- ✅ Data tables with sorting/filtering

### UI/UX

- ✅ Modern, responsive design
- ✅ Dark/Light theme support
- ✅ Toast notifications
- ✅ Loading states
- ✅ Form validation
- ✅ Error handling
- ✅ Confirmation dialogs
- ✅ Empty states

### Additional Features

- ✅ File upload & storage
- ✅ Image cropping
- ✅ GraphQL API
- ✅ Email service
- ✅ WhatsApp integration (optional)
- ✅ Internationalization support

---

## 🗄 Database Schema

### Tables

#### `user_profile`

Stores user profile information linked to Supabase Auth users.

| Column        | Type        | Description                         |
| ------------- | ----------- | ----------------------------------- |
| id            | UUID        | Primary key (references auth.users) |
| email         | TEXT        | User email (unique)                 |
| role_id       | UUID        | Foreign key to roles table          |
| first_name    | TEXT        | User's first name                   |
| last_name     | TEXT        | User's last name                    |
| profile_image | TEXT        | URL to profile image                |
| is_active     | BOOLEAN     | Account active status               |
| last_login    | TIMESTAMPTZ | Last login timestamp                |
| created_at    | TIMESTAMPTZ | Account creation date               |
| updated_at    | TIMESTAMPTZ | Last update timestamp               |

#### `roles`

Defines user roles in the system.

| Column      | Type        | Description        |
| ----------- | ----------- | ------------------ |
| id          | UUID        | Primary key        |
| name        | TEXT        | Role name (unique) |
| description | TEXT        | Role description   |
| created_at  | TIMESTAMPTZ | Creation timestamp |
| updated_at  | TIMESTAMPTZ | Update timestamp   |

**Default Roles:**

- `admin` - Full system access
- `manager` - Elevated access
- `user` - Basic user access

#### `role_access`

Maps permissions to roles for resource-action based access control.

| Column     | Type        | Description                                |
| ---------- | ----------- | ------------------------------------------ |
| id         | UUID        | Primary key                                |
| role_id    | UUID        | Foreign key to roles                       |
| resource   | TEXT        | Resource name (e.g., 'users', 'roles')     |
| action     | TEXT        | Action type (create, read, update, delete) |
| created_at | TIMESTAMPTZ | Creation timestamp                         |
| updated_at | TIMESTAMPTZ | Update timestamp                           |

#### `settings`

Application-wide settings and configurations.

| Column              | Type        | Description               |
| ------------------- | ----------- | ------------------------- |
| id                  | UUID        | Primary key               |
| site_name           | TEXT        | Application name          |
| site_description    | TEXT        | Site description          |
| appearance_theme    | TEXT        | Default theme             |
| primary_color       | TEXT        | Primary brand color       |
| logo_url            | TEXT        | Logo image URL            |
| logo_horizontal_url | TEXT        | Horizontal logo URL       |
| favicon_url         | TEXT        | Favicon URL               |
| contact_email       | TEXT        | Contact email             |
| social_links        | TEXT        | Social media links (JSON) |
| created_at          | TIMESTAMPTZ | Creation timestamp        |
| updated_at          | TIMESTAMPTZ | Update timestamp          |

#### `migration_logs`

Tracks database migration execution.

| Column         | Type        | Description         |
| -------------- | ----------- | ------------------- |
| id             | UUID        | Primary key         |
| migration_name | TEXT        | Migration file name |
| status         | TEXT        | Execution status    |
| message        | TEXT        | Status message      |
| executed_at    | TIMESTAMPTZ | Execution timestamp |

### Storage Buckets

#### `uploads`

General file storage bucket for user uploads.

- Public/Private: Configurable
- Max file size: 50MB
- Allowed types: All

---

## 🔄 Authentication Flow

### Sign Up Flow

1. User submits registration form
2. API validates input (email, password, names)
3. Supabase Auth creates user account
4. User profile record created in `user_profile` table
5. Default role assigned (usually "user")
6. Confirmation email sent
7. User redirected to verify email page

### Login Flow

1. User submits credentials
2. Supabase Auth validates credentials
3. Session created and stored in cookies
4. User profile fetched with role and permissions
5. User data stored in AuthContext
6. Middleware validates session on protected routes
7. User redirected to dashboard

### Password Reset Flow

1. User requests password reset
2. Reset email sent with secure token
3. User clicks link and redirected to reset page
4. Token validated by Supabase
5. User submits new password
6. Password updated in auth system
7. User redirected to login

### Permission Check Flow

1. User attempts to access resource
2. AuthContext provides user data
3. Permission utility checks role_access
4. Access granted or denied based on role
5. UI components conditionally rendered

---

## 📧 Email Templates

### 1. Confirm Signup Email

**Subject:** Confirm Your Signup

**Template Usage:** Sent when a user signs up to verify their email address.

**Variables:**

- `{{ .ConfirmationURL }}` - Email confirmation link

**HTML Template:**

```html
<body
  style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;"
>
  <table
    cellpadding="0"
    cellspacing="0"
    border="0"
    width="100%"
    style="background-color: #f5f5f5;"
  >
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table
          cellpadding="0"
          cellspacing="0"
          border="0"
          width="600"
          style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.12);"
        >
          <!-- Body Content -->
          <tr>
            <td style="padding: 32px 24px; color: #202124;">
              <!-- Icon -->
              <table cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td align="center" style="padding-bottom: 24px;">
                    <div
                      style="width: 80px; height: 80px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 40px; position: relative;"
                    >
                      <img
                        data-emoji="✉️"
                        class="an1"
                        alt="✉️"
                        aria-label="✉️"
                        draggable="false"
                        src="https://fonts.gstatic.com/s/e/notoemoji/16.0/2709_fe0f/72.png"
                        loading="lazy"
                        style="height: 49px; margin: 15px 0 0 15px;"
                      />
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Title -->
              <h1
                style="font-size: 28px; font-weight: 500; color: #202124; text-align: center; margin: 0 0 8px 0; letter-spacing: -0.5px;"
              >
                Confirm Your Signup
              </h1>
              <p
                style="text-align: center; font-size: 14px; color: #5f6368; margin: 0 0 24px 0;"
              >
                Welcome! Let's get you started
              </p>

              <!-- Welcome Message -->
              <table
                cellpadding="0"
                cellspacing="0"
                border="0"
                width="100%"
                style="margin-bottom: 24px;"
              >
                <tr>
                  <td
                    style="background-color: #f8f9fa; border-left: 4px solid #667eea; padding: 16px; border-radius: 0 4px 4px 0; font-size: 14px; line-height: 1.6; color: #3c4043;"
                  >
                    Thanks for signing up! We're excited to have you on board.
                    Follow the link below to confirm your email address and
                    activate your account.
                  </td>
                </tr>
              </table>

              <!-- CTA Button -->
              <table
                cellpadding="0"
                cellspacing="0"
                border="0"
                width="100%"
                style="margin-bottom: 24px;"
              >
                <tr>
                  <td align="center">
                    <a
                      href="{{ .ConfirmationURL }}"
                      style="display: inline-block; padding: 14px 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; border-radius: 6px; font-size: 15px; font-weight: 600; border: none; box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);"
                      >Confirm Your Email</a
                    >
                  </td>
                </tr>
              </table>

              <!-- Alternative Link -->
              <table
                cellpadding="0"
                cellspacing="0"
                border="0"
                width="100%"
                style="margin-bottom: 24px;"
              >
                <tr>
                  <td
                    style="text-align: center; font-size: 13px; color: #5f6368;"
                  >
                    <p style="margin: 0 0 8px 0;">
                      Or copy and paste this link in your browser:
                    </p>
                    <p
                      style="margin: 0; word-break: break-all; color: #1f73e6; font-family: monospace; font-size: 12px;"
                    >
                      {{ .ConfirmationURL }}
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Info Box -->
              <table
                cellpadding="0"
                cellspacing="0"
                border="0"
                width="100%"
                style="margin-bottom: 24px; background-color: #e8f4f8; border: 1px solid #b3dfe0; border-radius: 4px;"
              >
                <tr>
                  <td
                    style="padding: 16px; font-size: 13px; line-height: 1.6; color: #2c5282;"
                  >
                    <p style="margin: 0 0 8px 0;">
                      <strong>ℹ️ This link will expire in 24 hours</strong>
                    </p>
                    <p style="margin: 0;">
                      If you didn't create this account, please ignore this
                      email.
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Security Tips -->
              <table
                cellpadding="0"
                cellspacing="0"
                border="0"
                width="100%"
                style="margin-bottom: 24px; background-color: #fef7e0; border: 1px solid #f9f1ba; border-radius: 4px;"
              >
                <tr>
                  <td
                    style="padding: 16px; font-size: 13px; line-height: 1.6; color: #3c4043;"
                  >
                    <p
                      style="margin: 0 0 8px 0; font-weight: 600; color: #202124;"
                    >
                      🔒 Safety First:
                    </p>
                    <ul style="margin: 0; padding-left: 20px;">
                      <li style="margin: 6px 0;">
                        Never share this email with anyone
                      </li>
                      <li style="margin: 6px 0;">
                        We will never ask for your password via email
                      </li>
                      <li style="margin: 6px 0;">
                        Keep your account secure with a strong password
                      </li>
                    </ul>
                  </td>
                </tr>
              </table>

              <!-- Quick Links -->
              <table cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td align="center" style="font-size: 12px; color: #5f6368;">
                    <p style="margin: 0;">
                      <a
                        href="#"
                        style="color: #1f73e6; text-decoration: none; margin: 0 12px;"
                        >FAQ</a
                      >
                      <span style="color: #dadce0;">|</span>
                      <a
                        href="#"
                        style="color: #1f73e6; text-decoration: none; margin: 0 12px;"
                        >Documentation</a
                      >
                      <span style="color: #dadce0;">|</span>
                      <a
                        href="#"
                        style="color: #1f73e6; text-decoration: none; margin: 0 12px;"
                        >Support</a
                      >
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr style="border-top: 1px solid #e8e8e8; background-color: #f8f9fa;">
            <td style="padding: 16px 24px;">
              <table cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td
                    style="font-size: 11px; color: #9aa0a6; text-align: center;"
                  >
                    <p style="margin: 0 0 8px 0;">
                      © 2025 Prop pulse. All rights reserved.
                    </p>
                    <p style="margin: 0;">
                      <a href="#" style="color: #1f73e6; text-decoration: none;"
                        >Privacy Policy</a
                      >
                      <span style="color: #dadce0;"> · </span>
                      <a href="#" style="color: #1f73e6; text-decoration: none;"
                        >Terms of Service</a
                      >
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
```

---

### 2. Magic Link / OTP Email

**Subject:** One Time Login Code

**Template Usage:** Sent when a user requests a one-time login code.

**Variables:**

- `{{ .Token }}` - 6-digit OTP code

**HTML Template:**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>One Time Login Code</title>
  </head>
  <body
    style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;"
  >
    <table
      cellpadding="0"
      cellspacing="0"
      border="0"
      width="100%"
      style="background-color: #f5f5f5;"
    >
      <tr>
        <td align="center" style="padding: 20px 0;">
          <table
            cellpadding="0"
            cellspacing="0"
            border="0"
            width="600"
            style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.12);"
          >
            <!-- Body Content -->
            <tr>
              <td style="padding: 32px 24px; color: #202124;">
                <!-- Icon -->
                <table cellpadding="0" cellspacing="0" border="0" width="100%">
                  <tr>
                    <td align="center" style="padding-bottom: 24px;">
                      <div
                        style="width: 80px; height: 80px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 40px; position: relative;"
                      >
                        <img
                          data-emoji="🔐"
                          class="an1"
                          alt="🔐"
                          aria-label="🔐"
                          draggable="false"
                          src="https://fonts.gstatic.com/s/e/notoemoji/16.0/1f510/72.png"
                          loading="lazy"
                          style="height: 53px; margin: 10px 0 0 15px;"
                        />
                      </div>
                    </td>
                  </tr>
                </table>

                <!-- Title -->
                <h1
                  style="font-size: 28px; font-weight: 500; color: #202124; text-align: center; margin: 0 0 8px 0; letter-spacing: -0.5px;"
                >
                  One Time Login Code
                </h1>
                <p
                  style="text-align: center; font-size: 14px; color: #5f6368; margin: 0 0 24px 0;"
                >
                  Secure authentication code
                </p>

                <!-- Message Box -->
                <table
                  cellpadding="0"
                  cellspacing="0"
                  border="0"
                  width="100%"
                  style="margin-bottom: 24px;"
                >
                  <tr>
                    <td
                      style="background-color: #f8f9fa; border-left: 4px solid #1f2937; padding: 16px; border-radius: 0 4px 4px 0; font-size: 14px; line-height: 1.6; color: #3c4043;"
                    >
                      Your secure login code has been generated. This code is
                      unique and can only be used once. Do not share it with
                      anyone.
                    </td>
                  </tr>
                </table>

                <!-- Expiry Box -->
                <table
                  cellpadding="0"
                  cellspacing="0"
                  border="0"
                  width="100%"
                  style="margin-bottom: 24px; background-color: #fce8e6; border: 1px solid #f1c6c6; border-radius: 4px;"
                >
                  <tr>
                    <td style="padding: 12px 16px;">
                      <table
                        cellpadding="0"
                        cellspacing="0"
                        border="0"
                        width="100%"
                      >
                        <tr>
                          <td
                            style="font-size: 18px; width: 24px; vertical-align: middle;"
                          >
                            ⏰
                          </td>
                          <td
                            style="padding-left: 12px; font-size: 13px; font-weight: 500; color: #d33b27; vertical-align: middle;"
                          >
                            Expires in: 10 minutes
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>

                <!-- Code Section -->
                <table
                  cellpadding="0"
                  cellspacing="0"
                  border="0"
                  width="100%"
                  style="margin-bottom: 24px;"
                >
                  <tr>
                    <td
                      style="font-size: 12px; font-weight: 600; color: #5f6368; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px; display: block; padding-bottom: 12px;"
                    >
                      Your Code
                    </td>
                  </tr>
                  <tr>
                    <td
                      style="background-color: #f8f9fa; border: 1px solid #dadce0; border-radius: 4px; padding: 20px; text-align: center;"
                    >
                      <div
                        style="font-family: 'Courier New', monospace; font-size: 32px; font-weight: 700; color: #1f2937; letter-spacing: 6px;"
                      >
                        {{ .Token }}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style="font-size: 12px; color: #5f6368; text-align: center; padding-top: 8px; padding-bottom: 16px;"
                    >
                      👆 Click to copy
                    </td>
                  </tr>
                </table>

                <!-- Security Tips -->
                <table
                  cellpadding="0"
                  cellspacing="0"
                  border="0"
                  width="100%"
                  style="margin-bottom: 24px; background-color: #fef7e0; border: 1px solid #f9f1ba; border-radius: 4px;"
                >
                  <tr>
                    <td
                      style="padding: 16px; font-size: 13px; line-height: 1.6; color: #3c4043;"
                    >
                      <p
                        style="margin: 0 0 8px 0; font-weight: 600; color: #202124;"
                      >
                        ⚠️ Security Tips:
                      </p>
                      <ul style="margin: 0; padding-left: 20px;">
                        <li style="margin: 6px 0;">
                          Never share this code with anyone
                        </li>
                        <li style="margin: 6px 0;">
                          This code expires in 10 minutes
                        </li>
                        <li style="margin: 6px 0;">
                          If you didn't request this, ignore it
                        </li>
                      </ul>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Footer -->
            <tr
              style="border-top: 1px solid #e8e8e8; background-color: #f8f9fa;"
            >
              <td
                style="padding: 16px 24px; font-size: 12px; color: #5f6368; text-align: center;"
              >
                Need help?
                <a href="#" style="color: #1f73e6; text-decoration: none;"
                  >Contact Support</a
                >
                ·
                <a href="#" style="color: #1f73e6; text-decoration: none;"
                  >Privacy Policy</a
                >
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
```

---

### 3. Reset Password Email

**Subject:** Reset Your Password

**Template Usage:** Sent when a user requests a password reset.

**Variables:**

- `{{ .SiteURL }}` - Application base URL
- `{{ .TokenHash }}` - Password reset token

**HTML Template:**

```html
<table
  width="100%"
  cellpadding="0"
  cellspacing="0"
  border="0"
  style="background-color:#f5f5f5;"
>
  <tr>
    <td align="center" style="padding:24px 0;">
      <table
        width="600"
        cellpadding="0"
        cellspacing="0"
        border="0"
        style="background-color:#ffffff;border-radius:8px;box-shadow:0 1px 3px rgba(0,0,0,0.12);"
      >
        <tr>
          <td
            style="padding:32px 24px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;color:#202124;"
          >
            <!-- Icon -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td align="center" style="padding-bottom:24px;">
                  <div
                    style="width:80px;height:80px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:38px;"
                  >
                    <img
                      data-emoji="🔑"
                      class="an1"
                      alt="🔑"
                      aria-label="🔑"
                      draggable="false"
                      src="https://fonts.gstatic.com/s/e/notoemoji/16.0/1f511/72.png"
                      loading="lazy"
                      style="margin: 16px 0 0 17px; height: 45px;"
                    />
                  </div>
                </td>
              </tr>
            </table>

            <!-- Title -->
            <h1
              style="font-size:26px;font-weight:600;color:#202124;text-align:center;margin:0 0 8px 0;"
            >
              Reset Your Password
            </h1>
            <p
              style="text-align:center;font-size:14px;color:#5f6368;margin:0 0 24px 0;"
            >
              You've requested to reset your account password.
            </p>

            <!-- Message -->
            <table
              width="100%"
              cellpadding="0"
              cellspacing="0"
              border="0"
              style="margin-bottom:24px;"
            >
              <tr>
                <td
                  style="background-color:#f8f9fa;border-left:4px solid #667eea;padding:16px;border-radius:0 4px 4px 0;font-size:14px;line-height:1.6;color:#3c4043;"
                >
                  Click the button below to securely reset your password. This
                  link will expire in 1 hour for your security.
                </td>
              </tr>
            </table>

            <!-- CTA Button -->
            <table
              width="100%"
              cellpadding="0"
              cellspacing="0"
              border="0"
              style="margin-bottom:24px;"
            >
              <tr>
                <td align="center">
                  <a
                    href="{{ .SiteURL }}/auth/reset-password?token_hash={{ .TokenHash }}&type=recovery"
                    style="display:inline-block;padding:14px 40px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:white;text-decoration:none;border-radius:6px;font-size:15px;font-weight:600;box-shadow:0 4px 12px rgba(102,126,234,0.4);"
                  >
                    Reset Password
                  </a>
                </td>
              </tr>
            </table>

            <!-- Alternative Link -->
            <table
              width="100%"
              cellpadding="0"
              cellspacing="0"
              border="0"
              style="margin-bottom:24px;"
            >
              <tr>
                <td style="text-align:center;font-size:13px;color:#5f6368;">
                  <p style="margin:0 0 8px 0;">
                    If the button doesn't work, copy and paste this link into
                    your browser:
                  </p>
                  <p
                    style="margin:0;word-break:break-all;color:#1f73e6;font-family:monospace;font-size:12px;"
                  >
                    {{ .SiteURL }}/auth/reset-password?token_hash={{ .TokenHash
                    }}&type=recovery
                  </p>
                </td>
              </tr>
            </table>

            <!-- Security Tips -->
            <table
              width="100%"
              cellpadding="0"
              cellspacing="0"
              border="0"
              style="background-color:#fef7e0;border:1px solid #f9f1ba;border-radius:4px;margin-bottom:24px;"
            >
              <tr>
                <td
                  style="padding:16px;font-size:13px;line-height:1.6;color:#3c4043;"
                >
                  <p style="margin:0 0 8px 0;font-weight:600;color:#202124;">
                    ⚠️ Security Tips:
                  </p>
                  <ul style="margin:0;padding-left:20px;">
                    <li style="margin:6px 0;">
                      Never share this link with anyone
                    </li>
                    <li style="margin:6px 0;">The link expires in 1 hour</li>
                    <li style="margin:6px 0;">
                      If you didn't request this, ignore this email
                    </li>
                  </ul>
                </td>
              </tr>
            </table>

            <!-- Footer -->
            <table
              width="100%"
              cellpadding="0"
              cellspacing="0"
              border="0"
              style="border-top:1px solid #e8e8e8;background-color:#f8f9fa;"
            >
              <tr>
                <td
                  style="padding:16px 24px;text-align:center;font-size:12px;color:#5f6368;"
                >
                  Need help?
                  <a href="#" style="color:#1f73e6;text-decoration:none;"
                    >Contact Support</a
                  >
                  ·
                  <a href="#" style="color:#1f73e6;text-decoration:none;"
                    >Privacy Policy</a
                  >
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
```

---

## ⚙️ Configuration Files

### Supabase Configuration

**File:** `supabase/config.toml`

Key configurations:

- **Project ID:** Prop pulse
- **API Port:** 54321
- **Database Port:** 54322
- **Studio Port:** 54323
- **Auth Site URL:** http://127.0.0.1:3000
- **Email Confirmations:** Disabled (enable_confirmations = false)
- **Signup Enabled:** Yes
- **JWT Expiry:** 3600 seconds (1 hour)
- **Password Min Length:** 6 characters
- **File Size Limit:** 50MB

### Next.js Configuration

**File:** `next.config.ts`

Configured for:

- App Router
- TypeScript
- Image optimization
- Environment variables
- Webpack customization for SVG support

### Middleware Configuration

**File:** `middleware.ts`

- Handles Supabase session refresh
- Protects routes automatically
- Manages authentication cookies
- Skips static files and Next.js internals

---

## 🔧 Available Scripts

```bash
# Development
npm run dev              # Start development server on port 3028

# Build
npm run build            # Create production build
npm run start            # Start production server

# Linting
npm run lint             # Run ESLint

# Supabase Setup
npm run supabase:init    # Initialize Supabase locally
npm run supabase:login   # Login to Supabase account
npm run supabase:link    # Link to Supabase project (prompts for project-ref)

# Database Management
npm run db:push          # Push local migrations to remote database
npm run db:migrate       # Alias for db:push
npm run db:pull          # Pull remote schema to local migrations
npm run db:reset         # Reset database and re-run all migrations (destructive)
npm run db:status        # Check which migrations have been applied

# Migrations
npm run migration:new    # Create a new migration file

# TypeScript
npm run types:generate   # Generate TypeScript types from database schema
```

### Database Command Examples

```bash
# Create a new migration
npm run migration:new add_user_preferences

# Check migration status
npm run db:status

# Push migrations to production
npx supabase db push --project-ref production-project-id

# Generate TypeScript types
npm run types:generate
```

**📚 For detailed database migration instructions, see `MIGRATION_GUIDE.md`**

---

## 🎨 Customization Guide

### Branding

1. **Update Site Name**

   - Edit settings in the database `settings` table
   - Or update via Settings page in the dashboard

2. **Change Colors**

   - Modify `app/globals.css` for global theme colors
   - Update Tailwind config for custom colors
   - Adjust gradient colors in email templates

3. **Update Logo**
   - Upload logo via Settings page
   - Or directly update `logo_url` in settings table
   - Update favicon in `/public` directory

### Adding New Roles

1. Insert role in `roles` table
2. Define permissions in `role_access` table
3. Update role enum in `types/types.ts`
4. Adjust permission checks in components

### Adding New Features

Follow the modular architecture:

1. Create module in `modules/` directory
2. Define types in module's `models/`
3. Create services in `services/`
4. Add components in `components/`
5. Create API routes in `app/api/`
6. Export from module's `index.ts`
7. Import in main `modules/index.ts`

---

## 🐛 Troubleshooting

### Common Issues

**Issue:** Supabase connection error

```bash
# Solution: Check environment variables
# Verify NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
```

**Issue:** Email not sending

```bash
# Solution: Check email configuration
# Verify SMTP credentials or Resend API key
# Check Supabase email settings in config.toml
```

**Issue:** Permission denied on routes

```bash
# Solution: Check user role and permissions
# Verify role_access records in database
# Check AuthContext for correct user data
```

**Issue:** Session expired too quickly

```bash
# Solution: Adjust JWT expiry in config.toml
# Update jwt_expiry value (in seconds)
```

### Database Issues

**Reset local database:**

```bash
npm run db:reset
```

**Check migration status:**

```bash
npm run db:status
```

**View Supabase logs:**

```bash
npx supabase logs
```

---

## 📝 Development Best Practices

1. **Always use TypeScript** - Define types for all data structures
2. **Follow the module pattern** - Keep related code together
3. **Use server components** - Default to server components, use client only when needed
4. **Implement proper error handling** - Use try-catch and display user-friendly errors
5. **Validate all inputs** - Use Zod for form validation
6. **Check permissions** - Always verify user permissions before actions
7. **Use environment variables** - Never hardcode sensitive data
8. **Write migrations** - All schema changes should be in migration files
9. **Test email templates** - Use Inbucket (port 54324) for local email testing
10. **Keep components small** - Break down large components into smaller ones

---

## 🚢 Deployment

### Environment Setup

1. Create production Supabase project
2. Set up environment variables on hosting platform
3. Configure email provider (Resend/SMTP)
4. Update site URL in Supabase auth settings
5. Run migrations on production database

### Vercel Deployment

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
# Add all variables from .env.local
```

### Database Migration

```bash
# Push migrations to production
npx supabase db push --project-ref YOUR_PROJECT_REF
```

---

## 📚 Additional Resources

- **Next.js Docs:** https://nextjs.org/docs
- **Supabase Docs:** https://supabase.com/docs
- **Tailwind CSS:** https://tailwindcss.com/docs
- **shadcn/ui:** https://ui.shadcn.com
- **React Hook Form:** https://react-hook-form.com

---

## 🤝 Support

For issues, questions, or contributions:

- Create an issue in the repository
- Contact support team
- Check documentation

---

**Last Updated:** November 26, 2025  
**Version:** 3.0
