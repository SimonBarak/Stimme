import SignFlow from "@/components/auth/SignFlow";

export default function LoginPage() {
  return (
    <>
      <div className="container mt-20">
        <div className="max-w-4xl mx-auto bg-gray-100 rounded-xl p-10">
          <SignFlow />
        </div>
      </div>
    </>
  );
}
