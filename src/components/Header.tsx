import Link from "next/link";
import StartButton from "./StartButton";
import Authentication from "./auth/Authentication";
import UserPlan from "./auth/UserPlan";

type HeaderType = {
  showCTS: boolean;
};

export default function Header({ showCTS = false }: HeaderType) {
  return (
    <div className="fixed top-0 w-full">
      <div className="p-5 py-6">
        <div className="flex items-center">
          <div className="grow">
            <Link href={"/"}>Stimme.studio</Link>
          </div>
          <div></div>
          <nav className="flex gap-6 items-center">
            <Authentication />
            {showCTS ? (
              <StartButton
                size={"medium"}
                href={"/edit"}
                text={"Create recording"}
              />
            ) : null}
          </nav>
        </div>
      </div>
    </div>
  );
}
