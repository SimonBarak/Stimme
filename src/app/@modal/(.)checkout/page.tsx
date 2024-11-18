import CheckoutFlow from "@/components/auth/CheckoutFlow";
import DialogAuth from "@/components/DialogAuth";

export default function LoginModal() {
  return (
    <DialogAuth title={"Checkout"}>
      <CheckoutFlow />
    </DialogAuth>
  );
}
