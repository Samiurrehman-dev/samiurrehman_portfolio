# 🌟 Sami Ur Rehman - Portfolio Website

A modern, responsive portfolio website built with React, TypeScript, and Express.js, featuring a complete contact system with email notifications.

![Portfolio Preview](./public/sami.jpg)

## ✨ Features

### 🎨 Design & UI
- **Modern & Responsive Design** - Fully responsive across all devices
- **Dark Mode Support** - Toggle between light and dark themes
- **Smooth Animations** - Beautiful transitions and scroll animations
- **Typewriter Effect** - Animated name and title on hero section
- **Interactive Elements** - Hover effects, transitions, and micro-interactions

### 📄 Pages
- **Home** - Hero section with animated profile, about, skills, experience, portfolio, and contact
- **About** - Detailed information about experience, skills, and background
- **Portfolio** - Showcase of projects with filtering capabilities
- **Contact** - Professional contact form with email notifications

### 🛠️ Technical Features
- **React 18** with TypeScript for type safety
- **React Router** for seamless navigation
- **Tailwind CSS** for modern styling
- **Radix UI** components for accessible UI elements
- **Express.js** backend for API routes
- **Nodemailer** for email functionality
- **Sonner** for toast notifications
- **Lucide Icons** for beautiful icons

### 📧 Contact Form
- **SMTP Email Integration** - Sends emails via Gmail SMTP
- **Admin Notifications** - Receive form submissions in your email
- **User Confirmations** - Automatic thank you emails to users
- **Form Validation** - Client and server-side validation
- **Loading States** - Visual feedback during submission
- **Toast Notifications** - Success/error messages
- **Professional Email Templates** - Beautiful HTML email designs

### 🎯 Skills Showcase
- **Animated Progress Bars** - Percentage-based skill indicators
- **Modern Tech Stack**:
  - JavaScript (85%)
  - TypeScript (95%)
  - Node.js (95%)
  - Next.js (75%)
  - React.js (75%)
  - MongoDB (80%)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or pnpm
- Gmail account (for SMTP email functionality)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Samiurrehman-dev/samiurrehman_portfolio.git
cd samiurrehman_portfolio
```

2. **Install dependencies**
```bash
npm install
# or
pnpm install
```

3. **Configure Environment Variables**

Create a `.env` file in the root directory:

```env
# SMTP Configuration for Contact Form
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password-here
ADMIN_EMAIL=your-email@gmail.com
```

**Note:** You need to generate a Gmail App Password. See [SMTP_SETUP.md](./SMTP_SETUP.md) for detailed instructions.

4. **Run Development Server**
```bash
npm run dev
```

The application will start on `http://localhost:8081`

5. **Build for Production**
```bash
npm run build
npm start
```

## 📁 Project Structure

```
Sami_ur_rehman/
├── client/                 # Frontend React application
│   ├── components/        # Reusable components
│   │   ├── Header.tsx
│   │   ├── DarkModeToggle.tsx
│   │   └── ui/           # Radix UI components
│   ├── pages/            # Page components
│   │   ├── Index.tsx
│   │   ├── About.tsx
│   │   ├── Portfolio.tsx
│   │   ├── Contact.tsx
│   │   └── NotFound.tsx
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions
│   └── App.tsx           # Main application component
│
├── server/                # Backend Express application
│   ├── routes/           # API route handlers
│   │   ├── contact.ts   # Contact form handler
│   │   └── demo.ts
│   ├── index.ts         # Express server setup
│   └── node-build.ts    # Production server
│
├── public/               # Static assets
│   ├── sami.jpg         # Profile image
│   └── robots.txt
│
├── .env                  # Environment variables (not in git)
├── package.json         # Dependencies and scripts
├── tailwind.config.ts   # Tailwind CSS configuration
├── tsconfig.json        # TypeScript configuration
└── vite.config.ts       # Vite configuration
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:client` - Build client only
- `npm run build:server` - Build server only
- `npm start` - Start production server
- `npm run typecheck` - Run TypeScript type checking
- `npm run format.fix` - Format code with Prettier

## 🌐 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms
- Build the project: `npm run build`
- Deploy the `dist` folder
- Set environment variables on hosting platform
- Start server: `npm start`

## 📧 Email Configuration

The contact form uses Gmail SMTP. Follow these steps:

1. **Enable 2-Factor Authentication** on your Google Account
2. **Generate App Password**:
   - Go to Google Account → Security → App Passwords
   - Select "Mail" and generate password
3. **Update `.env` file** with your credentials
4. **Restart the server**

For detailed instructions, see [SMTP_SETUP.md](./SMTP_SETUP.md)

## 🎨 Customization

### Change Colors
Edit `tailwind.config.ts` to customize the color scheme:
```typescript
colors: {
  primary: '#3BB1E5',
  // Add your colors
}
```

### Update Content
- **Profile Info**: Edit `client/pages/Index.tsx` (Hero section)
- **Skills**: Modify skill bars in About section
- **Experience**: Update timeline in About section
- **Projects**: Add/edit projects in Portfolio section

### Dark Mode
Dark mode is automatically handled using `localStorage` and system preferences.

## 🤝 Contact

- **Email**: samiurrehman.dev@gmail.com
- **Phone**: +92 328 8028776
- **Location**: Johr Town, Lahore, Pakistan
- **GitHub**: [@Samiurrehman-dev](https://github.com/Samiurrehman-dev)

## 📝 License

© 2024 Sami Ur Rehman. All rights reserved.

## 🙏 Acknowledgments

- Built with [React](https://reactjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Lucide](https://lucide.dev/)
- UI Components from [Radix UI](https://www.radix-ui.com/)
- Email service powered by [Nodemailer](https://nodemailer.com/)

---

⭐ **Star this repo if you find it helpful!**

Made with ❤️ by [Sami Ur Rehman](https://github.com/Samiurrehman-dev)
