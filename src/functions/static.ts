import { promises as fs } from "fs";
import path from "path";
// Function to fetch the voices data from a local JSON file
export async function getVoices(): Promise<VoiceResponse[]> {
  try {
    // Load the JSON file containing voices and emotions
    const file = await fs.readFile(
      process.cwd() + "/src/data/voices_stimme.json",
      "utf8"
    );

    // Parse the JSON data into a JavaScript object
    const voicesResponse: VoiceResponse[] = JSON.parse(file);

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

    console.log(`JSON file successfully written to ${filePath}`);
  } catch (error) {
    console.error(`Error writing JSON file:`, error);
    throw new Error("Failed to write JSON file.");
  }
}
