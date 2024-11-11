import { CheckCircledIcon } from "@radix-ui/react-icons";

type DeclineCardType = {};

export default async function DeclineCard({}: DeclineCardType) {
  return (
    <>
      <div className="flex flex-col gap-6 items-center">
        <div className="flex flex-col gap-2 items-center">
          <div>{":("}</div>
          <div className="text-2xl">Something went wrong...</div>
          <div>We’re sorry, but your payment wasn’t successful.</div>
        </div>

        <div>
          <a
            href="/edit"
            className="bg-yellow-200 hover:bg-yellow-300 px-6 py-3 text-lg inline-flex items-center justify-center rounded-md transition-all cursor-pointer text-black"
          >
            Create recording
          </a>
        </div>
      </div>
    </>
  );
}
