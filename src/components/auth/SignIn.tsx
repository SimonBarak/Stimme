"use client";

import { useState } from "react";
import Button from "../ui/Button";
import validator from "validator";

export function SignInForm() {
  const [email, setEmail] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    // Email validation
    if (!email.includes("@")) {
      setStatusMsg("Email must include '@'.");
      return;
    }

    // Advanced email format validation with `validator`
    if (!validator.isEmail(email)) {
      setStatusMsg("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);
    setStatusMsg("");

    try {
      const response = await fetch("/api/check_email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (response.ok) {
        setIsVerified(true);
        // setStatusMsg("Email is on the way");
      } else {
        setStatusMsg(result.message || "Failed to send verification email.");
      }
    } catch (error) {
      console.error(error);
      setStatusMsg("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2 className="DialogTitle text-lg">Sign in with your email</h2>
      <p className="DialogDescription">
        No password is needed—we’ll send you a verification link to your inbox.
      </p>
      <form onSubmit={handleSubmit} onChange={() => setIsVerified(false)}>
        <div className="relative">
          <input
            className="Input Input-lg"
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="h-6">
          {statusMsg && (
            <p className="my-2 text-sm text-gray-500">{statusMsg}</p>
          )}
        </div>

        <div className="flex">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Sending..." : "Send Verification Email"}
          </Button>
          {isVerified && (
            <div className="p-3 flex items-center ">
              <div className="text-green-500">
                {"Great! check your email inbox"}
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
