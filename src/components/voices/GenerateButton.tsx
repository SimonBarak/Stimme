"use client";
import { generateSchemas } from "@/functions/api";
import Button from "../ui/Button";

interface GenerateButtonProps {}

const GenerateButton: React.FC<GenerateButtonProps> = () => {
  function handleGenerate() {
    generateSchemas();
  }

  return (
    <div className="pb-6">
      <div className="label p-4">Generate</div>
      <div className="flex flex-wrap gap-1 px-4">
        <Button onClick={handleGenerate}>Generate Schemas</Button>
      </div>
    </div>
  );
};

export default GenerateButton;
