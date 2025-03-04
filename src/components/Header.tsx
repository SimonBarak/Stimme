import Link from "next/link";
import StartButton from "./StartButton";
import Authentication from "./auth/Authentication";
import UserPlan from "./auth/UserPlan";

type HeaderType = {
  showCTS: boolean;
};

export default function Header({ showCTS = false }: HeaderType) {
  return (
    <div className="fixed top-0 w-full backdrop-blur-[10px] supports-[backdrop-filter]:bg-[--slate-1]/90">
      <div className="py-5 px-10">
        <div className="flex items-center">
          <div className="grow font-medium">
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
                variant={"bold"}
              />
            ) : null}
          </nav>
        </div>
      </div>
    </div>
  );
}
