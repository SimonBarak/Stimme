"use server";
import { signIn } from "@/server/auth";
import Button from "../ui/Button";

export async function SignIn() {
  return (
    <div>
      <h2 className="DialogTitle text-lg">Authenticate with your email</h2>
      <p className="DialogDescription">You need to</p>
      <form
        action={async (formData) => {
          "use server";
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
          <Button type="submit">Sign in</Button>
        </div>
      </form>
    </div>
  );
}
