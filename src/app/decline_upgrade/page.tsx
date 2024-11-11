import Header from "@/components/Header";
import DeclineCard from "@/components/success/DeclineCard";

export default function DeclinePage() {
  return (
    <>
      <Header showCTS={true} />
      <div className="container mt-20">
        <div className="max-w-4xl mx-auto bg-gray-100 rounded-xl p-10">
          <DeclineCard />
        </div>
      </div>
    </>
  );
}
