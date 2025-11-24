# Vercel Deployment Guide

## 🚀 Steps to Deploy on Vercel

### 1. Push Code to GitHub
```bash
git add .
git commit -m "Add Vercel configuration"
git push origin main
```

### 2. Import Project in Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure project settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist/spa`
   - **Install Command**: `npm install`

### 3. Add Environment Variables
In Vercel Dashboard → Settings → Environment Variables, add:

```
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-gmail-app-password
ADMIN_EMAIL=your-email@gmail.com
```

⚠️ **Important**: Make sure to use Gmail App Password, not your regular password.

### 4. Deploy
Click "Deploy" and wait for the build to complete.

## 📝 Important Notes

### Contact Form Limitation on Vercel
⚠️ The contact form **will NOT work on Vercel's free plan** because:
- Vercel only serves static files
- The Express.js backend API routes won't work
- Email functionality requires a backend server

### Solutions:

#### Option 1: Use Vercel Serverless Functions
Convert the contact API to a serverless function:

**Create**: `api/contact.ts` (in root)
```typescript
import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Your existing contact handler code here
}
```

#### Option 2: Deploy Backend Separately
- Deploy frontend on Vercel (static)
- Deploy backend on:
  - **Railway.app** (recommended)
  - **Render.com**
  - **Heroku**
  - **DigitalOcean**

#### Option 3: Use a Contact Form Service
Replace custom backend with:
- **Formspree** - [formspree.io](https://formspree.io)
- **EmailJS** - [emailjs.com](https://www.emailjs.com)
- **Netlify Forms** - If using Netlify instead

## 🔄 Current Setup (Static Only)

For now, your portfolio will work on Vercel with:
- ✅ All pages (Home, About, Portfolio, Contact)
- ✅ Dark mode
- ✅ Animations
- ✅ Responsive design
- ❌ Contact form email functionality

## 🛠️ To Enable Contact Form

### Quick Fix: Use Railway for Full Stack

1. **Create Railway Account**: [railway.app](https://railway.app)

2. **Deploy Full Project**:
```bash
# Railway will automatically detect and deploy both frontend & backend
railway init
railway up
```

3. **Add Environment Variables** in Railway dashboard

4. **Your app will be live** with full functionality!

## 📧 Alternative: FormSpree (Easiest)

Update `client/pages/Contact.tsx`:

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });
  
  // Handle response
};
```

## 🎯 Recommended Approach

**For Portfolio (Static + Contact Form):**
1. Use **Vercel** for frontend (free, fast)
2. Use **Railway** or **Render** for backend API (free tier available)
3. Update API URL in frontend to point to backend server

**Or Simply:**
- Deploy everything on **Railway** or **Render** for full functionality

---

Need help? Check [Railway Docs](https://docs.railway.app) or [Vercel Docs](https://vercel.com/docs)
