import { promises as fs } from "fs";
import path from "path";
import { Descendant } from "slate";
import { addUIdata, validateSchema } from "./helpers";

export async function getFiles(): Promise<SchemaFile[] | undefined> {
  const filesData = await fs.readFile(
    process.cwd() + "/schemas/schemas.json",
    "utf8"
  );

  const files: SchemaFile[] = JSON.parse(filesData);

  if (files) {
    return files;
  } else {
    console.error("getVoices");
  }
}

export async function getFile(id: string) {
  const files = await getFiles();
  if (files) {
    const file = files.find((i) => i.id === id);
    return file;
  }
}

export async function getPropsData({ id }: IDObject) {
  // fetch value from file
  const initialFile = await getFile(id);

  // fetch value from file
  const defaultValue: Descendant[] = [];
  const defaultLanguage = "English (United States)";

  const initialValue = initialFile
    ? validateSchema(initialFile.schema)
    : defaultValue;

  const initialLanguage = initialFile ? initialFile.lang : defaultLanguage;

  // fetch voices from file
  const voicesResponse: VoiceResponse[] = (await getVoices()) ?? [];

  // create ui objects persona[]
  const personas: Persona[] = addUIdata(voicesResponse);

  return { personas, initialValue, initialLanguage };
}

// Function to fetch the voices data from a local JSON file
export async function getVoices(): Promise<VoiceResponse[]> {
  try {
    const filesData = await fs.readFile(
      process.cwd() + "/data/voices_stimme.json",
      "utf8"
    );

    // Parse the JSON data into a JavaScript object
    const voicesResponse: VoiceResponse[] = JSON.parse(filesData);

    return voicesResponse;
  } catch (error) {
    console.error("Error loading voices:", error);
    throw new Error("Error loading voices");
  }
}

export async function writeJsonFile(
  fileName: string,
  data: object
): Promise<void> {
  try {
    // Convert the object to a JSON string
    const jsonString = JSON.stringify(data, null, 2);

    // Define the full file path
    const filePath = path.join(process.cwd(), fileName);

    // Write the JSON string to the file
    await fs.writeFile(filePath, jsonString, "utf8");
  } catch (error) {
    console.error(`Error writing JSON file:`, error);
    throw new Error("Failed to write JSON file.");
  }
}
