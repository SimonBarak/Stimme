import { phonemes } from "@/data/phonemes";

function mapPhoneme(id: string): TechPhoneme | undefined {
  return phonemes.find((i) => i.id === id);
}

function mapLang(LocaleName: string, personas: Persona[]) {
  // hack to defind lang
  const persona = personas.find((i) => i.LocaleName === LocaleName);
  if (persona) {
    return persona.Locale;
  } else {
    // TODO: make lang more safe
    return "en-US";
  }
}

function mapVoice(DisplayName: string, personas: Persona[]): string {
  const persona = personas.find((i) => i.DisplayName === DisplayName);

  if (persona) {
    return persona.ShortName;
  } else {
    // TODO: how to solve this error
    return "FALSE VOICE";
  }
}

function replaceBreakMarkers(text: string): string {
  // Define the regex pattern to match markers like [0.5s], [1s], [10s], etc.
  const regex = /\[(\d+(\.\d+)?)s\]/g;

  // Replace the markers with the corresponding <break time="xs"> tags
  return text.replace(regex, (_, seconds) => `<break time="${seconds}s"/>`);
}

function jsonToSSML(
  schema: any[],
  languageValue: string,
  personas: Persona[]
): string {
  // Initialize the SSML string with the header

  const lang = mapLang(languageValue, personas);
  let ssml = "";
  // Iterate over each paragraph in the schema
  schema.forEach((paragraph) => {
    // no map anymore
    const character = paragraph;

    if (paragraph.type === "paragraph" && character) {
      // Start a new <voice> tag for each paragraph
      ssml += `<voice name="${mapVoice(paragraph.voice, personas)}">`;

      if (paragraph.emotion) {
        ssml += `<mstts:express-as style="${paragraph.emotion}" styledegree="2">`;
      }

      paragraph.children.forEach((child: any) => console.log(child));
      paragraph.children.forEach((child: any) => {
        if (child.type) {
          const phonemeKey = child.id;
          const phoneme = mapPhoneme(phonemeKey);
          if (phoneme) {
            const ssmlPhoneme = `<phoneme alphabet="ipa" ph="${phoneme.phoneme}">${child.text}</phoneme>`;
            ssml += ssmlPhoneme;
          } else {
            ssml += child.text;
          }
        } else {
          ssml += child.text;
        }
      });

      if (paragraph.emotion) {
        ssml += `</mstts:express-as>`;
      }

      ssml += `</voice>`;

      return ssml;
    }
  });

  const header = `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="https://www.w3.org/2001/mstts" xml:lang="${lang}">`;
  const footer = `</speak>`;

  const ssmlWithBeaks = replaceBreakMarkers(ssml);

  const ssmlText = `${header}${ssmlWithBeaks}${footer}`;

  console.log(ssmlText);

  return ssmlText;
}

export default jsonToSSML;
