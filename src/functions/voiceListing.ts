import { promises as fs } from "fs";
import { Descendant } from "slate";

export async function getTexts(): Promise<Translation[]> {
  try {
    // Load the JSON file
    const file = await fs.readFile(
      process.cwd() + "/src/data/sunny_sentences.json",
      "utf8"
    );
    const translations: Translation[] = JSON.parse(file);
    return translations;
  } catch (error) {
    console.error("Error loading or parsing the JSON file:", error);
    throw new Error("Failed to get translations.");
  }
}

export async function getText(lang: string): Promise<string> {
  try {
    const translations = await getTexts();

    // Find the translation for the given language
    const translation = translations.find(
      (t: { lang: string }) => t.lang === lang
    );

    if (!translation) {
      throw new Error(`Translation for language '${lang}' not found.`);
    }

    return translation.text;
  } catch (error) {
    console.error(`Error retrieving translation for '${lang}':`, error);
    throw new Error(`Failed to get text for language '${lang}'.`);
  }
}

export function createSSML(
  Locale: string,
  DisplayName: string,
  text: string,
  style?: string
) {
  const headerTag = `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="https://www.w3.org/2001/mstts" xml:lang="${Locale}">`;
  const voiceTag = `<voice name="${DisplayName}">`;
  const styleTag = style
    ? `<mstts:express-as style="${style}" styledegree="2">`
    : "";

  const styleClosingTag = style ? `</mstts:express-as>` : "";

  const footerTag = `</voice></speak>`;

  return headerTag + voiceTag + styleTag + text + styleClosingTag + footerTag;
}

export function assemblyParagraph(
  Locale: string,
  DisplayName: string,
  text: string,
  style?: string
): Descendant {
  const children = [{ type: "text", text: text }];

  let paragraph: Descendant = {
    type: "paragraph",
    voice: DisplayName,
    children,
  };

  if (style) {
    // @ts-ignore
    paragraph.emotion = style;
  }

  return paragraph;
}

export function createSchema(voice: VoiceResponse, text: string): Descendant[] {
  const paragraf = assemblyParagraph(voice.Locale, voice.DisplayName, text);

  return [paragraf];

  // if (voice.StyleList) {
  //   const styles = voice.StyleList.map((style) =>
  //     assemblyParagraph(voice.Locale, voice.DisplayName, text, style)
  //   );
  //   return [paragraf, ...styles];
  // } else {
  //   return [paragraf];
  // }
}
