"use server";
import { signIn } from "@/server/auth";
import Button from "../ui/Button";

export async function SignIn() {
  return (
    <div>
      <h2 className="DialogTitle text-lg">Sign in with your email</h2>
      <p className="DialogDescription">We will send you verification link</p>
      <form
        action={async (formData) => {
          "use server";
          // TODO: redirect page
          await signIn("nodemailer", formData);
        }}
      >
        <div className="relative mb-5">
          <input
            className="Input Input-lg"
            type="text"
            name="email"
            placeholder="Email"
          />
        </div>
        <div>
          <Button type="submit">Send email</Button>
        </div>
      </form>
    </div>
  );
}
