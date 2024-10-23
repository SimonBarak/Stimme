import { NextResponse } from "next/server";

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

export async function GET() {
  return NextResponse.json({
    schemas: [defaultValue],
  });
}
