# Cursor Shop

![image](https://github.com/user-attachments/assets/c84e74fd-b9a2-49f6-952f-681ed9d3a8d6)

A modern e-commerce platform built with Next.js 14, TypeScript, Prisma, and Stripe.

## Features

- **Modern Tech Stack**: Next.js 14 with App Router, TypeScript, and Tailwind CSS
- **Authentication**: NextAuth.js with Google OAuth and email/password login
- **Database**: PostgreSQL with Prisma ORM
- **Payment Processing**: Secure checkout with Stripe integration
- **Product Management**: Categories, products, and inventory management
- **Shopping Experience**: Responsive design, search functionality, and cart management
- **User Accounts**: Profile management, order history, and wishlist
- **Admin Dashboard**: Comprehensive admin panel for managing products, orders, and users
- **PWA Support**: Progressive Web App capabilities for mobile users
- **Performance Optimized**: Image optimization, caching strategies, and security headers

## Prerequisites

- Node.js 18.x or later
- PostgreSQL database
- Google OAuth credentials
- Stripe account

## Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/cursor-shop.git
cd cursor-shop
```

2. Install dependencies:
```bash
npm install
```

3. Set up your environment variables:
- Copy `.env.example` to `.env`
- Update the variables with your values:
  - `DATABASE_URL`: Your PostgreSQL database URL
  - `NEXTAUTH_SECRET`: A random string for NextAuth.js
  - `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`: Your Google OAuth credentials
  - `STRIPE_SECRET_KEY` and `STRIPE_PUBLISHABLE_KEY`: Your Stripe API keys
  - `STRIPE_WEBHOOK_SECRET`: Your Stripe webhook signing secret

4. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── (admin)/           # Admin routes (protected)
│   │   ├── dashboard/     # Admin dashboard
│   │   ├── products/      # Product management
│   │   ├── categories/    # Category management
│   │   ├── orders/        # Order management
│   │   └── users/         # User management
│   ├── (auth)/            # Authentication routes
│   │   ├── login/         # Login page
│   │   └── register/      # Registration page
│   ├── (shop)/            # Shop routes
│   │   ├── products/      # Product listings
│   │   ├── categories/    # Category pages
│   │   ├── cart/          # Shopping cart
│   │   ├── checkout/      # Checkout process
│   │   ├── account/       # User account
│   │   └── search/        # Search functionality
│   └── api/               # API routes
│       ├── auth/          # Authentication endpoints
│       ├── products/      # Product endpoints
│       ├── categories/    # Category endpoints
│       ├── orders/        # Order endpoints
│       └── stripe/        # Stripe integration
├── components/            # React components
│   ├── layout/            # Layout components
│   ├── ui/                # UI components
│   ├── forms/             # Form components
│   └── products/          # Product-related components
├── lib/                   # Utility functions and configurations
│   ├── prisma.ts          # Prisma client
│   ├── auth.ts            # NextAuth configuration
│   ├── stripe.ts          # Stripe configuration
│   └── utils.ts           # Utility functions
├── hooks/                 # Custom React hooks
└── types/                 # TypeScript type definitions
```

## Environment Variables

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/cursor-shop"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Stripe
STRIPE_SECRET_KEY="your-stripe-secret-key"
STRIPE_PUBLISHABLE_KEY="your-stripe-publishable-key"
STRIPE_WEBHOOK_SECRET="your-stripe-webhook-secret"
```

## Key Technologies

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **Authentication**: NextAuth.js
- **Payment Processing**: Stripe
- **Deployment**: Vercel (recommended)
- **PWA**: next-pwa

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
