"use server";
import { signIn } from "@/auth";

export async function authenticate(email: string, password: string) {
  try {
    const res = await signIn("credentials", {
      email,
      password,
      // callbackUrl: "/",
      redirect: false,
    });

    // console.log("Login response:", res);
    return res;

    
  } catch (error: any) {
    // console.log("Login error:", error.type);

    if (error.name === "InvalidEmailPasswordError") {
      return {
        error: error.type,
        errCode: 1,
      };
    } else if (error.name === "AccountNotActived") {
      return {
        error: error.type,
        errCode: 2,
      };
    } else {
      return {
        error: "Internal server error",
        errCode: 3,
      };
    }
  }
}
export async function loginWithGoogle() {
  await signIn("google", { redirectTo: "/" });
}
