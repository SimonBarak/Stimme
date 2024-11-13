import { auth } from "@/server/auth";
import { SignInForm } from "./SignIn";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import CreateStripeCheckout from "./CreateStripeCheckout";

export default async function CheckoutFlow() {
  // Initialize the flow state with default values
  const flowsState = {
    signIn: { finished: false },
    payment: { finished: false },
  };

  // Fetch the session and determine if the user is signed in and has a pro account
  const session = await auth();

  // Update flow state based on the session data
  if (session?.user) {
    flowsState.signIn.finished = true;
    if (session.user.isPro) {
      flowsState.payment.finished = true;
    }
  }

  return (
    <>
      {/* Step 1: Sign-in Section */}
      <div className="mb-8">
        <div className="mb-8">
          <span className="text-sm font-semibold text-gray-500">STEP 1</span>
        </div>
        <div>
          {flowsState.signIn.finished ? (
            <div className="flex gap-2 items-center">
              <CheckCircledIcon />
              <div className="text-lg">You are signed in</div>
            </div>
          ) : (
            <SignInForm />
          )}
        </div>
      </div>

      {/* Step 2: Payment Section */}
      <div className="mb-8">
        <div className="mb-8">
          <span className="text-sm font-semibold text-gray-500">STEP 2</span>
        </div>
        <div>
          {flowsState.payment.finished ? (
            <>
              <div className="mb-8 flex gap-2 items-center">
                <CheckCircledIcon />
                <div className="text-lg">
                  {"You've upgraded to a professional account"}
                </div>
              </div>
              <a
                href="/edit"
                className="bg-yellow-200 hover:bg-yellow-300 px-6 py-3 text-lg inline-flex items-center justify-center rounded-md transition-all cursor-pointer text-black"
              >
                Create recording
              </a>
            </>
          ) : (
            <>
              <div className="mb-5">
                <div className="text-lg mb-2">Make a one-time payment</div>
                <div className="text-gray-500">
                  <p>There’s no subscription required.</p>
                  If you prefer to pay via invoice, please{" "}
                  <Link className="underline" href="/">
                    contact us
                  </Link>
                  .
                </div>
              </div>
              <div className="">
                <CreateStripeCheckout
                  disabled={session?.user?.stripeCustomerId != undefined}
                  consumerId={session?.user?.stripeCustomerId}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
