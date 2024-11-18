import { textToSpeech } from "@/functions/generation";
import { NextResponse } from "next/server";
import { auth } from "@/server/auth";

export async function POST(request: Request): Promise<Response> {
  const requestData = await handleRequestData(request);
  if (requestData.error)
    return NextResponse.json({ error: "Wrong data type" }, { status: 400 });

  const lengthCheck = await checkRequestLength(requestData.text);

  if (!lengthCheck.ok) return lengthCheck.response;

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
): Promise<{ ok: boolean; response: Response }> {
  const session = await auth();

  const user = session?.user;

  console.log(text.length);
  if (user) {
    const isPro = session?.user?.isPro;
    console.log("isPro: ", isPro);
    const limit = isPro ? 2000 : 400;
    console.log("limit: ", limit);

    if (text.length < limit) {
      console.log("Text length is within limit");
      return {
        ok: true,
        response: Response.json(
          { error: "Text length is within limit" },
          { status: 200 }
        ),
      };
    } else {
      console.log("Text length exceeds limit");
      return {
        ok: false,
        response: Response.json(
          { error: "Text length exceeds limit" },
          { status: 400 }
        ),
      };
    }
  } else {
    return {
      ok: false,
      response: Response.json({ error: "Unauthorized user" }, { status: 400 }),
    };
  }
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
