"use client";
import React, { useCallback, useEffect, useState } from "react";
import { createEditor, Descendant, Text, Transforms } from "slate";
import { Slate, Editable, withReact, RenderLeafProps } from "slate-react";

// This example is for an Editor with `ReactEditor` and `HistoryEditor`
import Sidebar from "./sidebar";
import jsonToSSML from "../functions/schemaToSsml";
import { fetchTTS } from "@/functions/api";
import CharacterElement from "./editor/CharacterElement";
import AudioPlayer from "./Player";
import Loading from "./Loading";
import Link from "next/link";

// This example is for an Editor with `ReactEditor` and `HistoryEditor`
import { BaseEditor } from "slate";
import { ReactEditor } from "slate-react";
import { HistoryEditor } from "slate-history";
import PhonemeMenu from "./PhonemeMenu";
import BreakMenu from "./BreakMenu";

type CustomElement = {
  type: "paragraph";
  voice: string;
  children: CustomText[];
};

type CustomText = { text: string; type: string; phoneme?: string };

export interface CustomRenderElementProps {
  children: any;
  element: CustomElement;
  attributes: {
    "data-slate-node": "element";
    "data-slate-inline"?: true;
    "data-slate-void"?: true;
    dir?: "rtl";
    ref: any;
  };
}

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

type StimmeEditorType = {
  initialValue: Descendant[];
  phonemes: TechPhoneme[];
  personas: Persona[];
  initialLaguage: string;
  isAuth: boolean;
  isPro: boolean;
};

const StimmeEditor = ({
  initialValue,
  personas,
  phonemes,
  initialLaguage,
  isAuth,
  isPro,
}: StimmeEditorType) => {
  const [errorMessage, setErrorMessage] = useState("");

  const [editor] = useState(() => withReact(createEditor()));

  const [editorState, setEditorState] = useState(initialValue);

  const [generationState, setGenerationState] =
    useState<GenerationState>("disabled");

  useEffect(() => {
    if (isAuth) setGenerationState("ready");
  }, [isAuth]);

  const [audioLink, setAudioLink] = useState("");

  const [languageValue, setLanguageValue] = useState(initialLaguage);

  const renderElement = useCallback((props: CustomRenderElementProps) => {
    return <CharacterElement {...props} />;
  }, []);

  const renderLeaf = useCallback(
    ({ attributes, children, leaf }: RenderLeafProps) => {
      if (leaf.type === "phoneme") {
        children = (
          <span className="px-1 py-1 bg-yellow-200 rounded">{children}</span>
        );
      }

      return <span {...attributes}>{children}</span>;
    },
    []
  );

  const toggleElement = (voice: string, emotion: string | undefined) => {
    Transforms.setNodes(editor, {
      type: "paragraph",
      voice: voice,
    });
  };

  const toggleLeaf = (value: string) => {
    Transforms.setNodes(
      editor,
      { type: "phoneme", phoneme: value },
      { match: (n) => Text.isText(n), split: true }
    );
  };

  async function handleGeneration() {
    setGenerationState("loading");
    try {
      const textSSML = jsonToSSML(
        editorState,
        languageValue,
        personas,
        phonemes
      );

      const src = await fetchTTS(textSSML);

      if (src) {
        setAudioLink(src);
      } else {
        throw new Error("No audio source returned");
      }
    } catch (error) {
      console.error("Error during generation:", error);
      alert(
        "Failed to generate audio. Please check your network connection and try again."
      );
    } finally {
      setGenerationState("ready");
    }
  }

  const insertBreak = useCallback(
    (duration: number) => {
      // Ensure there's a selection and normalize any potential null values
      const { selection } = editor;
      if (!selection) return;

      // Define the custom leaf to be inserted
      const breakLeaf = { text: `${duration}`, type: "break" };

      // Insert the custom leaf node at the current selection
      //Transforms.insertNodes(editor, breakLeaf);

      Transforms.insertText(editor, ` [${duration}s] `);

      // Optionally, move the cursor after the inserted node
      Transforms.move(editor, { distance: 1, unit: "offset" });
    },
    [editor]
  );

  const freeLimitLenght = 200;
  const proLimitLenght = 1500;

  function countTextLength(schema: Descendant[]): boolean {
    let totalLength = 0;

    // Iterate over each paragraph element
    schema.forEach((paragraph) => {
      // Iterate over the children of the paragraph
      // @ts-ignore
      const children = paragraph.children;
      if (children) {
        // @ts-ignore
        children.forEach((child) => {
          const text = child.text;
          if (text) totalLength += text.length;
        });
      }
    });

    const limitedLenght = isPro ? proLimitLenght : freeLimitLenght;

    return totalLength > limitedLenght;
  }

  return (
    <Slate
      editor={editor}
      initialValue={initialValue}
      onChange={(newValue) => {
        const isToLong = countTextLength(newValue);
        const errorMessage_Auth = `Create audio in smaller peaces. (Max. ${proLimitLenght} characters)`;
        const errorMessage_Free = `Free account can generate max. ${freeLimitLenght} characters`;

        if (isToLong) {
          setGenerationState("disabled");
          setErrorMessage(isPro ? errorMessage_Auth : errorMessage_Free);
        } else {
          setGenerationState("ready");
          setErrorMessage("");
        }

        setEditorState(newValue);
      }}
    >
      <div className="flex h-full">
        <div className="w-72">
          <div className="fixed top-24 left-5">
            <Sidebar
              toggleElement={toggleElement}
              personas={personas}
              languageValue={languageValue}
              setLanguageValue={setLanguageValue}
            />
          </div>
        </div>
        <div className="flex-1 relative">
          {errorMessage != "" ? (
            <div className=" bg-white fixed bottom-44 m-5 p-5 right-1/2 translate-x-1/2 rounded-lg shadow z-10">
              <div className="text-red-400">{errorMessage}</div>
            </div>
          ) : null}
          <Editable
            className="mt-24 m-5 p-5"
            renderElement={renderElement}
            renderLeaf={renderLeaf}
          />
          <div className="h-96"></div>
        </div>
        <div className="w-72">
          <div className="fixed top-24 right-5">
            <div className="w-60 bg-gray-100 rounded-lg text-sm shadow-md">
              <BreakMenu insertSpecialCharacter={insertBreak} />
              <PhonemeMenu phonemes={phonemes} toggleLeaf={toggleLeaf} />
            </div>
          </div>
        </div>
      </div>
      <div className="fixed flex justify-center bottom-56 md:bottom-56 left-0 right-0 z-10 pointer-events-none">
        <Loading isLoading={generationState === "loading"} />
      </div>
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 mb-4 ">
        {!isPro ? (
          <Link
            href={"/pricing"}
            className="p-4 bg-yellow-200 rounded-lg shadow-md mb-2 block"
          >
            <div className="flex justify-between">
              <div className="text-lg">
                <span className="">€19</span>
                <span className="text-sm">/month</span>
              </div>

              <div className="text-lg">Start now</div>
            </div>
          </Link>
        ) : null}

        <div className="p-4 py-4 bg-gray-100 rounded-lg shadow-md h-20 min-w-96">
          <AudioPlayer
            pageId={"aaa"}
            handleGeneration={handleGeneration}
            audioLink={audioLink}
            state={generationState}
            isAuth={isAuth}
          />
        </div>
      </div>
    </Slate>
  );
};

export default StimmeEditor;
