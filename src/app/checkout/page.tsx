import CheckoutFlow from "@/components/auth/CheckoutFlow";
import Header from "@/components/Header";

export default function CheckoutPage() {
  return (
    <>
      <Header showCTS={true} />
      <div className="container mt-20">
        <div className="max-w-4xl mx-auto bg-gray-100 rounded-xl p-10">
          <CheckoutFlow />
        </div>
      </div>
    </>
  );
}
