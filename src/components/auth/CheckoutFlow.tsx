import { auth } from "@/server/auth";
import { SignIn } from "./SignIn";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import CreateStripeCheckout from "./CreateStripeCheckout";

// TODO: how to solve signIn flow?
export default async function CheckoutFlow() {
  const session = await auth();

  return (
    <>
      <div className="mb-5 bg-gray-100 p-5 rounded-xl">
        <div className="mb-10">
          <span className="text-gray-900">1. Create account</span>
        </div>
        <div className="ml-5">
          {session ? (
            <>
              <div className="flex gap-2 items-center">
                <CheckCircledIcon />
                <div className="text-2xl">You are signed in</div>
              </div>
            </>
          ) : (
            <SignIn />
          )}
        </div>
      </div>
      <div className="mb-5 bg-gray-100 p-5 rounded-xl">
        <div className="mb-10">
          <span className="text-gray-900">
            2. Upgarde to professional account
          </span>
        </div>
        <div className="ml-5">
          <div className="">
            {session?.user?.isPro ? (
              <>
                <div className="mb-5">
                  <div className="flex gap-2 items-center">
                    <CheckCircledIcon />
                    <div className="text-2xl">
                      {"You've upgraded to professional account"}
                    </div>
                  </div>
                </div>
                <div className="-">
                  <a
                    href="/edit"
                    className="bg-yellow-200 hover:bg-yellow-300 px-6 py-3 text-lg inline-flex items-center justify-center rounded-md transition-all cursor-pointer text-black"
                  >
                    Create recording
                  </a>
                </div>
              </>
            ) : session.user.stripeCustomerId ? (
              <>
                <div className="mb-5">
                  <div className="text-lg mb-2">Make one time payment</div>
                  <div className="-">
                    <div className="text-gray-500">
                      or{" "}
                      <Link className="underline" href="/">
                        contact us
                      </Link>{" "}
                      for invoice payment
                    </div>
                  </div>
                </div>
                <div className="mb-5">
                  <CreateStripeCheckout
                    consumerId={session.user.stripeCustomerId}
                  />
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
