"use client";

import { useRouter } from "next/navigation";
import Button from "./ui/Button";

export default function StartButton() {
  const router = useRouter();

  function goToEditor() {
    router.push(`/edit`);
  }

  return (
    <div className="">
      <Button onClick={goToEditor}>Create recording</Button>
    </div>
  );
}
