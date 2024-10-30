import { textToSpeech } from "@/functions/generation";
import { NextResponse } from "next/server";
import { auth } from "@/server/auth";

export async function POST(request: Request): Promise<Response> {
  const requestData = await handleRequestData(request);
  if (requestData.error)
    return NextResponse.json({ error: "Wrong data type" }, { status: 400 });

  const lengthCheck = await checkRequestLength(requestData.text);
  if (lengthCheck.error)
    return NextResponse.json({ error: "Text is too logn" }, { status: 400 });

  const generationResult = await handleGeneration(requestData.text);
  if (generationResult.error)
    return NextResponse.json(
      { error: "Text-to-speech generation failed" },
      { status: 400 }
    );

  if (generationResult.buffer) {
    const headers = new Headers({
      "Content-Type": "audio/mpeg",
      "Content-Length": generationResult.buffer.length.toString(),
    });

    return new Response(generationResult.buffer, { status: 200, headers });
  } else {
    return NextResponse.json(
      { error: "Unknow error in audio stream" },
      { status: 400 }
    );
  }
}

/**
 * Handles request data extraction and validation.
 */
async function handleRequestData(request: Request): Promise<{
  text: string;
  error?: boolean;
}> {
  try {
    const body = await request.json();
    const text = String(body);
    return { text };
  } catch (error) {
    return {
      text: "",
      error: true,
    };
  }
}

/**
 * Checks if the request text length exceeds the allowed limit based on session status.
 */
async function checkRequestLength(
  text: string
): Promise<{ error?: boolean; response?: Response }> {
  const session = await auth();
  const limit = session ? 10000 : 600;

  if (text.length > limit) {
    console.warn("Text length exceeds limit");
    return {
      error: true,
      response: NextResponse.json(
        { error: "Text exceeds length limit" },
        { status: 400 }
      ),
    };
  }
  return {};
}

/**
 * Handles text-to-speech generation and stream response.
 */
async function handleGeneration(
  text: string
): Promise<{ buffer?: Buffer; error: boolean }> {
  const { AZURE_SPEECH_KEY: key, AZURE_SPEECH_REGION: region = "westeurope" } =
    process.env;

  if (!key) {
    return {
      error: true,
    };
  }

  try {
    const resultStream = await textToSpeech(key, region, text);
    const audioBuffer = await streamToBuffer(resultStream);
    return { buffer: audioBuffer, error: false };
  } catch (error) {
    console.error("Text-to-speech generation failed:", error);
    return {
      error: true,
    };
  }
}

/**
 * Converts a readable stream to a Buffer.
 */
async function streamToBuffer(stream: NodeJS.ReadableStream): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];

    stream.on("data", (chunk: Buffer) => chunks.push(chunk));
    // @ts-ignore
    stream.on("end", () => resolve(Buffer.concat(chunks)));
    stream.on("error", (error) => {
      console.error("Stream error:", error);
      reject(new Error("Stream processing error"));
    });
  });
}
