import fs from "fs";
import path from "path";
import { Descendant } from "slate";
import { addUIdata, validateSchema } from "./helpers";

function readFileSync(path: string): string | undefined {
  try {
    const data = fs.readFileSync(path, "utf8");
    return data;
  } catch (error) {
    console.error("Error reading file synchronously:", error);
  }
}

function readSchemas(): SchemaFile[] {
  const directory = path.join(
    process.cwd(),
    "src",
    "app",
    "data",
    "schemas.json"
  );

  const data = readFileSync(directory);

  if (data) {
    const files: SchemaFile[] = JSON.parse(data);
    return files;
  } else {
    console.error("Error loadign voices");
    return [];
  }
}

function getSchema(id: string): SchemaFile | undefined {
  const files = readSchemas();
  return files.find((i) => i.id === id);
}

export function getPropsData({ id }: IDObject) {
  // fetch value from file
  const initialFile = getSchema(id);

  // fetch value from file
  const defaultValue: Descendant[] = [];
  const defaultLanguage = "English (United States)";

  const initialValue = initialFile
    ? validateSchema(initialFile.schema)
    : defaultValue;

  const initialLanguage = initialFile ? initialFile.lang : defaultLanguage;

  // fetch voices from file
  const voicesResponse: VoiceResponse[] = getVoices() ?? [];

  // create ui objects persona[]
  const personas: Persona[] = addUIdata(voicesResponse);

  // create phonemes
  const phonemes: TechPhoneme[] = getPhonemes();

  return { personas, phonemes, initialValue, initialLanguage };
}

// Function to fetch the voices data from a local JSON file
export function getVoices(): VoiceResponse[] {
  try {
    const directory = path.join(
      process.cwd(),
      "src",
      "app",
      "data",
      "voices.json"
    );
    const data = readFileSync(directory);

    if (data) {
      // todo: map to voicesResponse
      const voiceList: VoiceResponse[] = JSON.parse(data);
      return voiceList;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error loading voices:", error);
    throw new Error("Error loading voices");
  }
}

// Function to fetch the voices data from a local JSON file
export function getPhonemes(): TechPhoneme[] {
  try {
    const directory = path.join(
      process.cwd(),
      "src",
      "app",
      "data",
      "phonemes.json"
    );
    const data = readFileSync(directory);

    if (data) {
      // todo: map to voicesResponse
      const phonemeList: TechPhoneme[] = JSON.parse(data);
      return phonemeList;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error loading phonemes:", error);
    throw new Error("Error loading phonemes");
  }
}
