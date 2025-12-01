# 🚀 Quick Start Guide - Prop pulse Starter Kit 3.0

**Get up and running in 5 minutes!**

---

## Step 1: Install Dependencies

```bash
npm install
```

---

## Step 2: Setup Supabase Database

### Get Your Project ID

1. Go to https://app.supabase.com
2. Create a new project (or select existing one)
3. Go to **Settings** → **General** → Copy **Reference ID**

### Run Setup Commands

```bash
# Initialize Supabase
npx supabase init

# Login to Supabase (opens browser)
npx supabase login

# Link to your project (replace YOUR_PROJECT_ID)
npx supabase link

# Push database migrations
npx supabase db push
```

✅ **Your database is now set up with:**

- User tables
- Role-based access control
- Settings table
- Storage bucket
- Email templates tracking

---

## Step 3: Configure Environment Variables

Create `.env.local` file in the root directory:

```env
# Supabase (get from: Settings > API in Supabase Dashboard)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3028

# Email (choose one)
# Option 1: Gmail SMTP
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Option 2: Resend
RESEND_API_KEY=re_your-api-key
```

---

## Step 4: Configure Email Templates

1. Go to Supabase Dashboard
2. Navigate to: **Authentication** → **Email Templates**
3. Update these templates with HTML from `project-settings.md`:
   - ✉️ Confirm Signup
   - 🔐 Magic Link
   - 🔑 Reset Password
   - 📧 Invite User

---

## Step 5: Run Development Server

```bash
npm run dev
```

Open http://localhost:3028 in your browser.

---

## ✅ Verification Checklist

### Database

```bash
# Check migration status
npm run db:status

# Should show 2 migrations applied:
# - 20250501_create_base_schema
# - 20250510_update_email_templates
```

### Supabase Dashboard

- [ ] Tables created: `settings`, `roles`, `user_profile`, `password_resets`
- [ ] Storage bucket: `uploads` exists
- [ ] Default roles: `admin` and `user` exist

### Application

- [ ] http://localhost:3028 loads
- [ ] Can access signup page
- [ ] Can access login page

---

## 🎯 Test Your Setup

1. **Register a new user:**

   - Go to http://localhost:3028/auth/signup
   - Fill in the form and submit
   - Check Supabase Dashboard → Authentication → Users

2. **Make yourself an admin:**

   - Go to Supabase Dashboard → Table Editor → `user_profile`
   - Find your user record
   - Update `role_id` to match the admin role ID from `roles` table

3. **Test login:**
   - Go to http://localhost:3028/auth/login
   - Login with your credentials
   - Should redirect to dashboard

---

## 📚 Next Steps

### Customize Your App

- Update site name in Settings page
- Upload your logo
- Change brand colors

### Development

- Explore the codebase in `app/`, `components/`, `modules/`
- Add new features using the modular architecture
- Create new migrations: `npm run migration:new feature_name`

### Learn More

- 📖 **README.md** - Overview and detailed setup
- 🗄️ **MIGRATION_GUIDE.md** - Database migration details
- ⚙️ **project-settings.md** - Complete documentation

---

## ⚡ Common Commands

```bash
# Development
npm run dev              # Start dev server

# Database
npm run db:status        # Check migrations
npm run db:push          # Push new migrations
npm run db:pull          # Pull schema changes
npm run db:reset         # Reset database (destructive)

# Migrations
npm run migration:new    # Create new migration

# Types
npm run types:generate   # Generate TS types from DB
```

---

## 🐛 Common Issues

### "Could not connect to Supabase"

```bash
# Check your .env.local file
# Verify URL and keys are correct
```

### "Migration already applied"

```bash
# Check status
npm run db:status

# If needed, reset (destructive)
npm run db:reset
```

### "Email not sending"

```bash
# For local testing, use Inbucket
# Open: http://localhost:54324
# All emails will be captured here
```

---

## 🆘 Need Help?

- 💬 Check `MIGRATION_GUIDE.md` for detailed troubleshooting
- 📖 Read `project-settings.md` for complete documentation
- 🔍 Search [Supabase Docs](https://supabase.com/docs)
- 💡 Create an issue in the repository

---

**That's it! You're ready to build! 🎉**

Happy coding! 👨‍💻👩‍💻
