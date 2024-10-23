import { getVoices, writeJsonFile } from "@/functions/static";
import { createSchema, getTexts } from "@/functions/voiceListing";
import { NextResponse } from "next/server";
import { text } from "stream/consumers";

const defaultValue: Descendanto[] = [
  {
    type: "paragraph",
    voice: "Conrad",
    emotion: "cheerful",
    children: [
      {
        text: "Lass uns Code schreiben!",
      },
      { text: "[1s]" },
      {
        text: "Alles, was du über den Aufbau einer Webanwendung wissen musst.",
      },
    ],
  },
];

type VoiceWithText = {
  voice: VoiceResponse;
  text: string;
};

function addTextToVoices(
  voices: VoiceResponse[],
  texts: Translation[]
): VoiceWithText[] {
  const items: VoiceWithText[] = voices.map((voice) => {
    const translation = texts.find((i) => i.lang === voice.Locale);

    return {
      voice,
      text: translation?.text ?? "",
    };
  });

  return items;
}

async function assemblySchemas(): Promise<SchemaFile[]> {
  try {
    // Attempt to fetch voices and texts
    const voices = await getVoices(); // fetch JSON
    const texts = await getTexts(); // fetch JSON

    if (!voices || voices.length === 0) {
      throw new Error("No voices available.");
    }

    if (!texts || texts.length === 0) {
      throw new Error("No translations available.");
    }

    // Add text to voices
    const items: VoiceWithText[] = addTextToVoices(voices, texts);

    if (!items || items.length === 0) {
      throw new Error("Failed to map texts to voices.");
    }

    // Create schemas based on the voices and texts
    const schemas: SchemaFile[] = items.map((item) => {
      return {
        id: item.voice.ShortName,
        lang: item.voice.LocaleName,
        schema: createSchema(item.voice, item.text),
      };
    });

    return schemas;
  } catch (error) {
    console.error("Error during schema assembly:", error);
    throw new Error("Failed to assemble schemas.");
  }
}

export async function GET() {
  const schemas = await assemblySchemas();

  writeJsonFile("/schemas/schemas.json", schemas);

  return NextResponse.json(schemas, { status: 200 });
}
