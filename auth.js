import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // Direct .env se check ho raha hai
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (credentials?.email === adminEmail && credentials?.password === adminPassword) {
          // Valid: Return user object (JWT generate hogi)
          return { id: 'admin-1', name: 'Admin', email: adminEmail };
        }

        // Invalid
        throw new Error('Invalid email or password');
      },
    }),
  ],
  pages: {
    signIn: '/login', // Custom login page ka route
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 Days ki cookie
  },
  secret: process.env.AUTH_SECRET,
});