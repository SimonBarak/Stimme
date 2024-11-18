import SignFlow from "@/components/auth/SignFlow";
import DialogAuth from "@/components/DialogAuth";
//import { Modal } from "@/components/Modal";

export default function LoginModal() {
  return (
    <DialogAuth title={"Sign in with your email"}>
      <SignFlow />
    </DialogAuth>
  );
}
