import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function getUserData() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return null;
    }
    return session.user;
  } catch (error) {
    console.error("Error fetching session:", error);
    return null;
  }
}
