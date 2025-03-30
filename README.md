# Cursor Shop

A modern e-commerce platform built with Next.js, Prisma, and Stripe.

## Features

- User authentication with NextAuth.js and Google OAuth
- Product management with categories
- Shopping cart functionality
- Order processing with Stripe
- Admin dashboard
- Responsive design with Tailwind CSS

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
│   ├── (admin)/           # Admin routes
│   ├── (shop)/            # Shop routes
│   └── api/               # API routes
├── components/            # React components
├── lib/                   # Utility functions and configurations
└── types/                # TypeScript type definitions
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

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
