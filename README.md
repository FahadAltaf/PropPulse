# Prop pulse Starter Kit 3.0

A production-ready Next.js + Supabase starter kit with authentication, role-based access control (RBAC), user management, and a modern dashboard interface.

## 🚀 Quick Start

### Prerequisites

- Node.js 20.x or higher
- npm or yarn
- Git
- Supabase account

### Installation

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

#### Option A: For New Supabase Project

```bash
# Step 1: Initialize Supabase locally
npx supabase init

# Step 2: Login to Supabase
npx supabase login

# Step 3: Link to your Supabase project
npx supabase link --project-ref your-project-id

# Step 4: Push database migrations
npx supabase db push
```

**Important:** Replace `your-project-id` with your actual Supabase project reference ID. You can find this in your Supabase Dashboard under Project Settings > General > Reference ID.

#### Option B: For Existing Project with Different Structure

If you have an existing Supabase project with a different schema, you have two options:

**Option 1: Fresh Start (Recommended)**

- Create a new Supabase project for this starter kit
- Follow the steps in "Option A" above

**Option 2: Manual Migration**

- Review the migration files in `supabase/migrations/`
- Manually execute SQL commands in Supabase SQL Editor
- See `project-settings.md` for complete SQL setup script

4. **Configure Environment Variables**

Create a `.env.local` file in the root directory:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3028

# Email Configuration (Choose one)
# Option 1: SMTP
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# Option 2: Resend
RESEND_API_KEY=your_resend_api_key

# WhatsApp Integration (Optional)
ULTRAMSG_INSTANCE_ID=your_instance_id
ULTRAMSG_TOKEN=your_token
```

To get your Supabase credentials:

1. Go to your [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Go to Settings > API
4. Copy the Project URL and anon/public key

5. **Configure Email Templates (Important)**

After setting up the database, configure email templates in Supabase:

1. Go to: **Authentication > Email Templates** in Supabase Dashboard
2. Update each template with custom HTML from `project-settings.md`
3. Configure these templates:
   - **Confirm Signup** - For email verification
   - **Magic Link** - For passwordless login
   - **Reset Password** - For password recovery
   - **Invite User** - For user invitations

Complete HTML templates are available in the `project-settings.md` file.

6. **Run Development Server**

```bash
npm run dev
```

Open [http://localhost:3028](http://localhost:3028) in your browser.

## 📚 Available Scripts

```bash
# Development
npm run dev              # Start development server on port 3028
npm run build            # Create production build
npm run start            # Start production server
npm run lint             # Run ESLint

# Supabase Database Management
npm run supabase:init    # Initialize Supabase locally
npm run supabase:link    # Link to existing Supabase project
npm run db:migrate       # Push migrations to database (alias for db:push)
npm run db:push          # Push migrations to database
npm run db:reset         # Reset database (destructive - use with caution)
npm run db:status        # Check migration status
```

## 🗄️ Database Schema

The starter kit includes a complete database schema with:

- **User Management**: `user_profile`, `roles` tables with RBAC
- **Authentication**: `password_resets` table for password recovery
- **Settings**: `settings` table for application configuration
- **Storage**: `uploads` bucket for file storage
- **Email Tracking**: `email_template_metadata` for template management

### Default Roles

The system comes with two default roles:

1. **Admin** - System administrator with full access
2. **User** - Regular user with basic access

### Database Commands Quick Reference

```bash
# Check current migration status
npx supabase db status

# Create a new migration
npx supabase migration new migration_name

# Push local migrations to remote database
npx supabase db push

# Pull remote migrations to local
npx supabase db pull

# Reset local database (destructive)
npx supabase db reset

# Generate TypeScript types from database
npx supabase gen types typescript --local > types/supabase.ts
```

## ✨ Features

- ✅ **Authentication**: Email/password, magic link, password reset
- ✅ **User Management**: Full CRUD operations with role-based access
- ✅ **RBAC**: Role-based access control with customizable permissions
- ✅ **Dashboard**: Modern, responsive interface with sidebar navigation
- ✅ **Settings**: Application-wide configuration management
- ✅ **File Upload**: Image upload with cropping functionality
- ✅ **Email Service**: Integrated email sending with custom templates
- ✅ **Dark Mode**: Theme switching with next-themes
- ✅ **Data Tables**: Advanced tables with sorting, filtering, pagination
- ✅ **Form Validation**: React Hook Form with Zod schemas
- ✅ **GraphQL**: Custom GraphQL server implementation
- ✅ **TypeScript**: Full type safety throughout the application

## 📁 Project Structure

```
starter-kit-3.0/
├── app/                 # Next.js App Router
│   ├── (dashboard)/    # Dashboard pages
│   ├── (landing)/      # Landing pages
│   ├── api/            # API routes
│   └── auth/           # Authentication pages
├── components/          # React components
├── context/            # React Context providers
├── hooks/              # Custom React hooks
├── lib/                # Utility libraries
├── modules/            # Feature modules (auth, users, roles, settings)
├── supabase/           # Supabase configuration & migrations
├── types/              # TypeScript definitions
└── utils/              # Utility functions
```

## 🔧 Configuration

### Port Configuration

The development server runs on port `3028` by default. To change it:

1. Update `package.json`:

   ```json
   "scripts": {
     "dev": "next dev -p YOUR_PORT"
   }
   ```

2. Update `.env.local`:
   ```env
   NEXT_PUBLIC_SITE_URL=http://localhost:YOUR_PORT
   ```

### Supabase Configuration

Local Supabase settings are in `supabase/config.toml`:

- **API Port**: 54321
- **Database Port**: 54322
- **Studio Port**: 54323
- **Inbucket (Email Testing)**: 54324

## 🐛 Troubleshooting

### Common Issues

**Issue: "Could not connect to Supabase"**

```bash
# Solution: Verify environment variables
# Check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local
```

**Issue: "Migration already exists"**

```bash
# Solution: Check migration status
npx supabase db status

# Reset database if needed (destructive)
npx supabase db reset
```

**Issue: "Cannot find module '@/modules'"**

```bash
# Solution: Clear Next.js cache and rebuild
rm -rf .next
npm run dev
```

**Issue: "Email not sending"**

```bash
# Solution: Check email configuration
# Verify SMTP credentials or Resend API key in .env.local
# For local testing, use Inbucket at http://localhost:54324
```

### Database Issues

**Reset local database:**

```bash
npx supabase db reset
```

**View migration history:**

```bash
npx supabase migration list
```

**Check Supabase logs:**

```bash
npx supabase logs
```

## 📖 Documentation

Comprehensive documentation is available in `project-settings.md`:

- Complete setup guide
- Database schema details
- Email template HTML
- API documentation
- Customization guide
- Deployment instructions

## 🚢 Deployment

### Vercel Deployment

1. **Install Vercel CLI**

```bash
npm install -g vercel
```

2. **Deploy**

```bash
vercel
```

3. **Set Environment Variables**

   - Add all variables from `.env.local` in Vercel Dashboard
   - Update `NEXT_PUBLIC_SITE_URL` to your production URL

4. **Update Supabase Settings**
   - Add production URL to allowed redirect URLs
   - Update site URL in Supabase auth settings

### Database Migration for Production

```bash
# Push migrations to production database
npx supabase db push --project-ref your-production-project-id
```

## 🔐 Security Notes

- Default RLS policies use "Allow All" for development convenience
- In production, implement proper authentication-based RLS policies
- Never commit `.env.local` to version control
- Rotate API keys regularly
- Use service role key only on the server side

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For issues, questions, or contributions:

- Create an issue in the repository
- Check `project-settings.md` for detailed documentation
- Review Supabase documentation: https://supabase.com/docs

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [React Hook Form](https://react-hook-form.com)

---

**Version:** 3.0  
**Last Updated:** November 26, 2025

Built with ❤️ using Next.js and Supabase
