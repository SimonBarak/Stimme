import { signIn } from "@/server/auth"; // Adjust the import path as needed
import { NextResponse } from "next/server";
import validator from "validator";

export async function POST(request: Request): Promise<Response> {
  try {
    const { email } = await request.json();

    // Validate email
    if (!validator.isEmail(email)) {
      return NextResponse.json(
        { error: "Invalid email format. Please enter a valid email address." },
        { status: 400 }
      );
    }

    const response = await signIn("nodemailer", {
      email: email,
      redirect: false,
    });

    if (response) {
      return NextResponse.json(
        { error: "Verification email sent successfully!" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: "Failed to send verification email." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An error occurred during sign-in." },
      { status: 500 }
    );
  }
}
