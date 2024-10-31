//import { signOut } from "@/server/auth"; // Import the server action directly
import React from "react";
import Button from "../ui/Button";
import { signOut } from "@/server/auth";

interface AccountBoardProps {
  email: string;
  subscriptionType: string;
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
        <p className="mb-4">
          <span>Email:</span> {email}
        </p>
        {/* <p className="mb-4">
          <span>Plan:</span> {subscriptionType}
        </p> */}
      </div>

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
