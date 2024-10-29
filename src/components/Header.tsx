import Link from "next/link";
import StartButton from "./StartButton";
import Authentication from "./Authentication";

type HeaderType = {
  showCTS: boolean;
};

export default function Header({ showCTS = false }: HeaderType) {
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
            {showCTS ? <StartButton /> : null}
          </nav>
        </div>
      </div>
    </div>
  );
}
