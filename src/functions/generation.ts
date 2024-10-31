import { Readable } from "stream";
import * as sdk from "microsoft-cognitiveservices-speech-sdk";

interface ISpeechSynthesisResult {
  audioData: ArrayBuffer;
}

interface ISpeechSynthesisError {
  // Define the structure of the error object if known.
}

export const textToSpeech = async (
  key: string,
  region: string,
  text: string,
  filename?: string
): Promise<Readable> => {
  return new Promise((resolve, reject) => {
    const speechConfig = sdk.SpeechConfig.fromSubscription(key, region);

    if (speechConfig) {
      console.info("Successfully logged");
    } else {
      console.error("Failed to create speech config.");
    }

    speechConfig.speechSynthesisOutputFormat = 5; // mp3 format

    const synthesizer = new sdk.SpeechSynthesizer(speechConfig);

    synthesizer.speakSsmlAsync(
      text,
      (result: ISpeechSynthesisResult | any) => {
        // Use 'any' or a more specific type if known
        const { audioData } = result;
        synthesizer.close();
        const bufferStream = new Readable();
        bufferStream._read = () => {}; // noop
        bufferStream.push(Buffer.from(audioData));
        bufferStream.push(null); // End stream
        resolve(bufferStream);
      },
      (error: ISpeechSynthesisError | any) => {
        synthesizer.close();
        console.error("speakSsmlAsync");
        reject(error);
      }
    );
  });
};
