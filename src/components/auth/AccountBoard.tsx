//import { signOut } from "@/server/auth"; // Import the server action directly
import React from "react";
import Button from "../ui/Button";
import { signOut } from "@/server/auth";
import Link from "next/link";

interface AccountBoardProps {
  email: string;
  subscriptionType: SubscriptionType;
}

const AccountBoard: React.FC<AccountBoardProps> = ({
  email,
  subscriptionType,
}) => {
  const handleSignOut = async () => {
    //setIsLoading(true);

    try {
      const response = await fetch("/api/auth/signout", {
        method: "POST",
      });

      if (response.ok) {
        // Redirect or refresh the page after sign out
        //window.location.reload();
      } else {
        console.error("Sign out failed");
      }
    } catch (error) {
      console.error("Error signing out", error);
    } finally {
      //setIsLoading(false);
    }
  };

  return (
    <div>
      <div>
        {/* <p className="mb-4">
          <span>Plan:</span> {subscriptionType}
        </p> */}
        <div className="mb-4">
          <p className="-">
            <span className="font-bold">{subscriptionType}</span>
          </p>
          <p className="text-sm text-gray-400">
            Free plan enable user to text voices. For full access change our
            plan
          </p>
        </div>
      </div>
      <div className="mb-10">
        <Link href={"/pricing"} className="px-4 py-2 bg-yellow-200 rounded-lg">
          Change plan
        </Link>
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
