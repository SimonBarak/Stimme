//import { signOut } from "@/server/auth"; // Import the server action directly
import React from "react";
import Button from "../ui/Button";
import { signOut } from "@/server/auth";
import Link from "next/link";
import StartButton from "../StartButton";

interface AccountBoardProps {
  email: string;
  isPro: boolean;
}

const AccountBoard: React.FC<AccountBoardProps> = ({ email, isPro }) => {
  return (
    <div>
      <div>
        <div className="mb-4">
          <p className="-">
            <span className="font-bold">
              {isPro ? "Proffesional Plan" : "Free Plan"}
            </span>
          </p>
        </div>
      </div>
      <div className="mb-10">
        <StartButton
          variant={"default"}
          size={"medium"}
          href={"/pricing"}
          text={"Change Plan"}
        />
      </div>

      <p className="mb-4">
        {/* <span>User:</span> */}
        <span className="font-bold">{email}</span>
      </p>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <Button>Sign Out</Button>
      </form>
    </div>
  );
};

export default AccountBoard;
