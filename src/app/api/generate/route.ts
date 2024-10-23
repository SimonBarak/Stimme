import { getVoices } from "@/functions/static";
import { createSSML, getTexts } from "@/functions/voiceListing";
import * as sdk from "microsoft-cognitiveservices-speech-sdk";
import { NextResponse } from "next/server";
import { string } from "slate";

interface ISpeechSynthesisResult {
  audioData: ArrayBuffer;
}

function getJSON(jsonData: string) {
  try {
    // Perform some processing with the JSON data (this is just an example)
    const processedData = JSON.parse(jsonData);

    return processedData;
  } catch (error) {
    // Handle errors
    console.error("Error processing JSON:", error);
  }
}

const textToSpeech = async (
  speechConfig: sdk.SpeechConfig,
  text: string,
  filename: string = "output.mp3"
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const audioConfig = sdk.AudioConfig.fromAudioFileOutput(
      "audio_files/" + filename + "-2.mp3"
    );

    speechConfig.speechSynthesisOutputFormat = 5; // mp3 format

    const synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);

    console.log(filename + "?");

    synthesizer.speakSsmlAsync(
      text,
      function (result) {
        if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
          console.log(filename + " is ok");
        } else {
          console.error("Speech synthesis canceled");
        }
        synthesizer.close();
      },
      function (err) {
        console.error("err - " + err);
        synthesizer.close();
      }
    );
    resolve(true);
    reject(false);
  });
};

// Utility function to create a delay
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const key = "93fdc2673c3049039038d23dc8bec817";
const region = "westeurope";

async function processVoiceItems(items: GenItem[]): Promise<boolean> {
  const speechConfig = sdk.SpeechConfig.fromSubscription(key, region);

  if (speechConfig) {
    console.log("Successfully logged");
  } else {
    console.error("Failed to create speech config.");
  }

  let i = 0;

  for (const item of items) {
    await textToSpeech(speechConfig, item.ssml, item.id);

    // Add a 500ms delay before processing styleTexts
    await delay(3000);

    console.log("__");
  }

  return true;
}

function mapTranslation(lang: string, texts: Translation[]) {
  const translation = texts.find((t: { lang: string }) => t.lang === lang);

  if (translation) {
    return translation.text;
  } else {
    console.error(lang);
  }
}

function getGenItems(voices: VoiceResponse[], texts: Translation[]): GenItem[] {
  const genItems = voices.flatMap((voice) => {
    const translation = mapTranslation(voice.Locale, texts) ?? "";

    const id = voice.DisplayName.toLocaleLowerCase();

    // Base item without style
    const baseItem = {
      id: id,
      ssml: createSSML(voice.Locale, voice.ShortName, translation),
    };

    // Items with styles if available
    const styleItems =
      voice.StyleList?.map((style) => ({
        id: `${id}_${style}`,
        ssml: createSSML(voice.Locale, voice.ShortName, translation, style),
      })) || [];

    return [baseItem, ...styleItems];
  });

  return genItems;
}

async function generate(): Promise<void> {
  try {
    const voices = await getVoices();
    const texts = await getTexts();
    if (voices && texts) {
      const genItems = getGenItems(voices, texts);
      const chunk = genItems.slice(100, 148);
      await processVoiceItems(chunk);
      console.log("DONE", chunk.length, "/", genItems.length);
    }
  } catch (error) {
    console.error("Get Voices failed");
  }
}

export async function GET() {
  // Log request
  generate();

  // You can customize the response data here
  const data = { message: "Hello from /api/generate in Next.js!" };

  // Returning the response with a status of 200 (OK)
  return NextResponse.json(data, { status: 200 });
}
