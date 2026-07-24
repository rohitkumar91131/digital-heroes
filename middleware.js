import { auth } from '@/auth';

export default auth((req) => {
  const isAuthenticated = !!req.auth;
  const isAdminRoute = req.nextUrl.pathname.startsWith('/admin');

  // Agar admin route hai aur authenticated nahi hai, toh login pe bhejo
  if (isAdminRoute && !isAuthenticated) {
    return Response.redirect(new URL('/login', req.url));
  }
});

// Yahan define karte hain ki middleware kin routes par chalna chahiye
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|assets).*)'],
};