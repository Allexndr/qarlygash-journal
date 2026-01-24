
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getAdminByEmail } from "@/lib/db";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const admin = await getAdminByEmail(credentials.email);

        if (!admin) {
          // Default fallback for initial setup if no admin exists
          // In production, you'd want to seed this properly
          if (credentials.email === "admin@example.com" && credentials.password === "admin1234") {
            return {
              id: "default-admin",
              name: "Admin",
              email: "admin@example.com",
              role: "admin" as const
            }
          }
          return null;
        }

        // Verify password
        // Note: For the mock admin, the password might not be hashed if coming from mock
        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          admin.passwordHash
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: admin._id?.toString() || "mock-admin-id",
          name: admin.name,
          email: admin.email,
          role: admin.role || "user",
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
};
