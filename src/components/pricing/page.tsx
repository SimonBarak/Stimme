import Button from "@/components/ui/Button";
import CheckoutButton from "@/components/CheckoutButton";

export default function Pricing() {
  return (
    <div className="flex">
      <div className="- border-r w-1/2 pr-8">
        <div className="border-b">
          <div className="pb-8 font-bold text-xl">Simple use</div>
        </div>
        <div className="border-b">
          <div className="py-8">
            <div className="text-4xl">€9</div>
          </div>
        </div>
        <div className="py-8">
          <div className="-">
            <ol className="list-disc">
              <li>Active for next 24 hours</li>
              <li>1 000 characters per file</li>
              <li>100 000 characters limit</li>
              <li>Use without subscription</li>
            </ol>
          </div>
        </div>
        <div className="flex justify-center pb-4 pt-8">
          <CheckoutButton />
        </div>
      </div>
      <div className="- w-1/2  pl-8">
        <div className="border-b">
          <div className="pb-8 font-bold text-xl">Proffesional</div>
        </div>
        <div className="border-b">
          <div className="py-8">
            <div className="text-4xl">€250</div>
          </div>
        </div>
        <div className="py-8">
          <div className="">
            <ol className="list-disc">
              <li>Invoice payment</li>
              {/* <li>Open-source implementation</li> */}
              <li>1 000 characters per file</li>
              <li>10 000 000 characters limit</li>
              <li>.</li>
            </ol>
          </div>
        </div>
        <div className="flex justify-center pb-4 pt-8">
          <Button>Contact us</Button>
        </div>
      </div>
    </div>
  );
}
