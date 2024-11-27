import Link from "next/link";

type PricingLinkType = {
  isPro: boolean; // Indicates if the user is a pro
  isAuth: boolean; // Indicates if the user is authenticated
};

const PricingLink: React.FC<PricingLinkType> = ({ isPro, isAuth }) => {
  if (isPro) return null; // Show nothing if the user is a pro

  const href = isAuth ? "/pricing" : "/login";
  const content = isAuth ? (
    <div className="flex justify-between">
      <div className="text-lg">
        <span>470 kč</span>
        <span className="text-sm">/month</span>
      </div>
      <div className="text-lg">Start now</div>
    </div>
  ) : (
    <div className="flex justify-between">
      <div className="text-lg">Ready to start?</div>
      <div className="text-lg">Sign in</div>
    </div>
  );

  return (
    <Link
      href={href}
      className="p-4 bg-yellow-200 rounded-lg shadow-md mb-2 block"
    >
      {content}
    </Link>
  );
};

export default PricingLink;
