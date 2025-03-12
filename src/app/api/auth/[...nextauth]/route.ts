import NextAuth, {
  NextAuthOptions,
  DefaultSession,
  Session,
  User,
  Account,
  Profile,
} from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";

// Extend the Session interface to include custom properties
declare module "next-auth" {
  interface Session extends DefaultSession {
    user?: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
    accessToken?: string; // Ensure accessToken exists in Session type
  }
}

// Extend the User interface to include the `id` property
declare module "next-auth" {
  interface User {
    id?: string;
  }
}

// Extend the JWT interface to ensure accessToken has the correct type
declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string; // Ensure it's defined as a string | undefined
  }
}


export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({
      account,
      profile,
    }: {
      account: Account | null;
      profile?: Profile;
    }): Promise<boolean> {
      // console.log(account, profile, "account, profile");
      
      if (!profile?.email) {
        return false; // Prevent sign-in if email is missing
      }
      return true;
    },

    async jwt({
      token,
      account,
      profile,
    }: {
      token: JWT;
      account?: Account | null;
      profile?: Profile;
    }): Promise<JWT> {
      // Store access token in token object and ensure proper typing
      if (account) {
        token.accessToken = account.access_token as string | undefined; // ✅ Fixed type error
      }
      if (profile?.email) {
        token.email = profile.email;
      }
      return token;
    },

    async session({
      session,
      token,
    }: {
      session: Session;
      token: JWT;
    }): Promise<Session> {
      // Ensure session has accessToken with correct type
      session.accessToken = token.accessToken as string | undefined; // ✅ Fixed type error
      if (session.user) {
        session.user.email = token.email;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
