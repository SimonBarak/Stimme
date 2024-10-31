"use client";
import { CheckIcon, CopyIcon, PlayIcon, PlusIcon } from "@radix-ui/react-icons";
import Button from "@/components/ui/Button";
import React, { useState } from "react";
//import { useRouter } from "next/router";
import { useRouter } from "next/navigation";
import Image from "next/image";
//import { generateRandomGradient } from "@/functions/gradient";

interface VoiceItemProps {
  voice: Persona;
  handlePlayAudio: (id: string) => Promise<void>;
}

const VoiceItem: React.FC<VoiceItemProps> = ({ voice, handlePlayAudio }) => {
  const [isLoading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const router = useRouter();

  // Function to copy text to clipboard
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 500);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  const openLink = async (id: string) => {
    try {
      setLoading(true);
      router.push(`/edit/${id}`);

      // Optionally, reset the copied state after a few seconds
      setTimeout(() => setLoading(false), 1000);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  function handleOpenClick() {
    openLink(voice.ShortName);
  }

  function handlePlayClick() {
    handlePlayAudio(voice.DisplayName);
  }

  function handleClickstyle(style: string) {
    handlePlayAudio(voice.DisplayName + "_" + style);
  }

  function handleCopy() {
    copyToClipboard(JSON.stringify(voice));
  }

  return (
    <>
      <li className="p-5 rounded-lg bg-ghost">
        <div className="flex justify-between mb-4">
          <div className="flex items-center">
            {voice.avatar ? (
              <div className="mr-2">
                <Image src={voice.avatar} alt="" width={50} height={50} />
              </div>
            ) : (
              <div className="h-10 w-10 bg-gray-300 rounded-full mr-2"></div>
            )}
            <span className="text-2xl font-bold">{voice.DisplayName}</span>
          </div>
          <div>
            <div className="flex gap-2">
              <Button variant="ghost" onClick={handleOpenClick}>
                {isLoading ? <span>Loading</span> : <span>Open</span>}
              </Button>
              <Button onClick={handlePlayClick}>
                <span>Play</span>
              </Button>

              {/* <Button onClick={handleCopy}>
                {copied ? <CheckIcon /> : <CopyIcon />}
              </Button> */}
            </div>
          </div>
        </div>
        <div className="">
          <div className="mb-5">
            <div>{voice.LocaleName}</div>
            <div className="">{voice.Gender}</div>
          </div>

          <div className="">
            <div className="flex gap-1 flex-wrap">
              {voice.StyleList
                ? voice.StyleList.map((style: string, index) => (
                    <Button
                      variant={"ghost"}
                      key={index}
                      onClick={() => handleClickstyle(style)}
                    >
                      <span>{style}</span>
                    </Button>
                  ))
                : null}
            </div>
          </div>
        </div>
      </li>
    </>
  );
};

export default VoiceItem;
