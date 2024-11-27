import Link from "next/link";

export default function Pricing() {
  return (
    <div className="flex">
      <div className="- border-r w-1/3 pr-8">
        <div className="border-b">
          <div className="pb-8 font-bold text-lg">Only testing</div>
        </div>
        <div className="border-b">
          <div className="py-8">
            <div className="text-4xl">Free</div>
          </div>
        </div>
        <div className="py-8">
          <div className="-">
            <ol className="list-disc">
              <li>Simple Sign In</li>
              <li>All languages</li>
              <li>200 characters per file</li>
            </ol>
          </div>
        </div>
        <div className="flex justify-center pb-4 pt-8">
          <Link href={"/login"} className="px-4 py-2 bg-yellow-200 rounded-lg">
            Sign in
          </Link>
        </div>
      </div>
      <div className="- border-r w-1/3 px-8">
        <div className="border-b">
          <div className="pb-8 font-bold text-lg">One-time</div>
        </div>
        <div className="border-b">
          <div className="py-8">
            <div className="text-4xl">
              470 kč<span className="text-sm text-gray-400">/month</span>
            </div>
          </div>
        </div>
        <div className="py-8">
          <div className="-">
            <ol className="list-disc">
              <li>Active for one month</li>
              <li>1 000 characters per file</li>
              <li>100 000 characters limit</li>
            </ol>
          </div>
        </div>
        <div className="flex justify-center pb-4 pt-8">
          <Link
            href={"/checkout"}
            className="px-4 py-2 bg-yellow-200 rounded-lg"
          >
            Checkout
          </Link>
        </div>
      </div>
      <div className="- w-1/3  pl-8">
        <div className="border-b">
          <div className="pb-8 font-bold text-lg">Professional</div>
        </div>
        <div className="border-b">
          <div className="py-8">
            <div className="text-4xl">
              4 700 kč<span className="text-sm text-gray-400">/year</span>
            </div>
          </div>
        </div>
        <div className="py-8">
          <div className="">
            <ol className="list-disc">
              <li>Invoice payment</li>
              <li>1 000 characters per file</li>
              <li>10 000 000 characters limit</li>
            </ol>
          </div>
        </div>
        <div className="flex justify-center pb-4 pt-8">
          <Link
            href={"/#contact"}
            className="px-4 py-2 bg-yellow-200 rounded-lg"
          >
            Contact us
          </Link>
        </div>
      </div>
    </div>
  );
}
