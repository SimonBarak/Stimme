import React, { useState, useEffect, useRef } from "react";
import { createAudioLink } from "../functions/helpers.js";
import {
  CheckIcon,
  MagicWandIcon,
  ReloadIcon,
  PlusIcon,
} from "@radix-ui/react-icons";
import Button from "@/components/ui/Button";

const initialSrc =
  "https://text-with-speech.s3.eu-central-1.amazonaws.com/Litera%CC%81rni%CC%81-odkaz-Jana-Amose-4-23-14-37.mp3";

const endOfSampleSrc =
  "https://wavepagestorage.blob.core.windows.net/samples/end-of-sample-en.mp3";

export type AudioPlayerProps = {
  audioLink: string;
  pageId: string;
  state: GenerationState;
  handleGeneration: () => Promise<void>;
};

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  audioLink,
  state,
  pageId,
  handleGeneration,
}) => {
  return (
    <div className="controls flex gap-2 items-center">
      <div className="-">
        {state === "disabled" ? (
          <Button size="medium" variant="disabled">
            <div className="mr-2">
              <MagicWandIcon />
            </div>
            Generate
          </Button>
        ) : state === "loading" ? (
          <div className="flex justify-center bg-gray-200 w-20 py-3 rounded">
            <div className="animate-spin">
              <ReloadIcon />
            </div>
          </div>
        ) : state === "ready" ? (
          <Button onClick={handleGeneration} size="medium">
            <div className="mr-2">
              <MagicWandIcon />
            </div>
            Generate
          </Button>
        ) : null}
      </div>

      {audioLink ? (
        <audio src={audioLink} controls></audio>
      ) : (
        <div className=" w-72 h-10 rounded bg-gray-200"></div>
      )}
    </div>
  );
};

export default AudioPlayer;
