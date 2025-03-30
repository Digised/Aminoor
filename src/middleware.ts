import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const isCheckoutRoute = req.nextUrl.pathname.startsWith('/checkout')
    const isOrdersRoute = req.nextUrl.pathname.startsWith('/orders')

    // Protect checkout and orders routes
    if ((isCheckoutRoute || isOrdersRoute) && !token) {
      return NextResponse.redirect(new URL('/login', req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: () => true,
    },
  }
)

export const config = {
  matcher: ['/checkout/:path*', '/orders/:path*'],
} 