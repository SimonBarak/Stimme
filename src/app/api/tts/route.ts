import { textToSpeech } from "@/functions/generation";
import { NextResponse } from "next/server";
import { auth } from "@/server/auth";

export async function POST(request: Request) {
  const key = process.env.AZURE_SPEECH_KEY;
  const region = process.env.AZURE_SPEECH_REGION || "westeurope";
  const session = await auth();

  let text: string = "";

  let limit = 600;
  if (session) {
    limit = 10000;
  }

  try {
    const body = await request.json();
    text = `${body}`;
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  console.log("text.length", text.length);

  if (text.length > limit) {
    return NextResponse.json({ error: "Text is too long" }, { status: 400 });
  }

  try {
    const resultStream = await textToSpeech(key, region, text);

    let dataChunks: Buffer[] = [];
    resultStream.on("data", (chunk: Buffer) => {
      dataChunks.push(chunk);
    });

    return new Promise((resolve, reject) => {
      resultStream.on("end", () => {
        const audioBuffer = Buffer.concat(dataChunks);

        const headers = new Headers({
          "Content-Type": "audio/mpeg",
          "Content-Length": audioBuffer.length.toString(),
        });

        resolve(new Response(audioBuffer, { status: 200, headers }));
      });

      resultStream.on("error", (error: any) => {
        console.error("Stream error:", error);
        reject(
          NextResponse.json(
            { error: "Failed to process text to speech." },
            { status: 500 }
          )
        );
      });
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to convert text to speech." },
      { status: 500 }
    );
  }
}
