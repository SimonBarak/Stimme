import Link from "next/link";
import StartButton from "./StartButton";
import Authentication from "./auth/Authentication";
import UserPlan from "./auth/UserPlan";

type HeaderType = {
  showCTS: boolean;
};

export default function Header({ showCTS = false }: HeaderType) {
  return (
    <div className="fixed top-0 w-full bg-white border-b">
      <div className="p-5 px-10 xl:px-16">
        <div className="flex items-center">
          <div className="grow font-bold">
            <Link href={"/"}>Stimme.studio</Link>
          </div>
          <div></div>
          <nav className="hidden sm:flex gap-6 items-center">
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
