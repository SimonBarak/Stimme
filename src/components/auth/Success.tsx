import { CheckCircledIcon } from "@radix-ui/react-icons";

type SuccessType = {
  email: string;
};

export default async function Success({ email }: SuccessType) {
  return (
    <>
      <div className="flex flex-col gap-6 items-center">
        <div className="flex flex-col gap-2 items-center">
          <CheckCircledIcon />
          <div className="text-2xl">You are signed in!</div>
          <div>with your email: {email}</div>
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
