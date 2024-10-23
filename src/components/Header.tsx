import Link from "next/link";
import CheckoutButton from "./CheckoutButton";
import Authentication from "./Authentication";

export default function Header() {
  return (
    <div className="fixed top-0 w-full">
      <div className="p-5 py-6">
        <div className="flex items-center">
          <div className="grow">
            <Link href={"/"}>Stimme.pro</Link>
          </div>
          <div></div>
          <nav className="flex gap-6 items-center">
            <Authentication />
          </nav>
        </div>
      </div>
    </div>
  );
}
