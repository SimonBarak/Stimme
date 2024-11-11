import Header from "@/components/Header";
import CardSuccess from "@/components/success/CardSuccess";

export default function SuccessPage() {
  return (
    <>
      <Header showCTS={true} />
      <div className="container mt-20">
        <div className="max-w-4xl mx-auto bg-gray-100 rounded-xl p-10">
          <CardSuccess />
        </div>
      </div>
    </>
  );
}
