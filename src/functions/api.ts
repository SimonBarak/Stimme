export async function fetchPostJSON(url: string, data?: any) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    // Check if the response status is not okay (e.g., 200-299).
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "An error occurred");
    }

    return await response.json();
  } catch (error: any) {
    console.error("Error in fetchPostJSON:", error);
    return { statusCode: 500, message: error.message };
  }
}

//
//
//
export async function fetchData(input: string): Promise<void> {
  try {
    // Fetch the audio stream from your API
    const res = await fetch("/api/files", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ input }),
    });

    if (!res.ok) {
      throw new Error("Audio fetch failed");
    }

    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.error("Error fetching or playing audio", error);
  }
}

//
//
//
export async function fetchAudioData(input: string): Promise<string | null> {
  try {
    // Fetch the audio stream from your API
    const response = await fetch("/api/tts", {
      method: "POST",
      headers: {
        "Content-Type": "audio/mpeg",
      },
      body: JSON.stringify(input), // Assuming the API expects a JSON object with a 'text' field
    });

    if (!response.ok) {
      throw new Error("Audio fetch failed");
    }

    // Get the audio data as a Blob
    const audioBlob = await response.blob();

    // Create a Blob URL to use as the audio src
    const audioUrl = URL.createObjectURL(audioBlob);
    return audioUrl;
  } catch (error) {
    console.error("Error fetching or playing audio", error);
    return null;
  }
}
//
//
//
export async function generateAudioFiles(): Promise<void> {
  try {
    // Making a GET request to the /api/generate route
    const response = await fetch("/api/generate", {
      method: "GET",
    });

    // Check if the response is OK (status code 200-299)
    if (!response.ok) {
      throw new Error("Audio fetch failed");
    }

    // Parse the JSON response data
    const data = await response.json();

    // Log the data received from the API
    console.log("Audio files generated:", data);
  } catch (error) {
    // Log any errors that occur during the fetch or processing
    console.error("Error fetching or generating audio files:", error);
  }
}

//
//
//
export async function generateSchemas(): Promise<void> {
  try {
    // Making a GET request to the /api/schemas route
    const response = await fetch("/api/schemas", {
      method: "GET",
    });

    // Check if the response is OK (status code 200-299)
    if (!response.ok) {
      throw new Error("Schemas fetch failed");
    }

    // Parse the JSON response data
    const data = await response.json();

    // Log the data received from the API
    console.log("Schema files generated:", data);
  } catch (error) {
    // Log any errors that occur during the fetch or processing
    console.error("Error fetching schemas:", error);
  }
}

//
//
//
export async function fetchTTS(input: string) {
  try {
    const response = await fetch("/api/tts", {
      method: "POST", // Or 'POST' if your API requires it
      headers: {
        "Content-Type": "audio/mpeg",
      },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      throw new Error("Audio fetch failed");
    } else {
      response;
    }
    // Use the Web Audio API to play the audio
    const audioContext = new window.AudioContext();
    const audioData = await response.arrayBuffer();

    const blob = new Blob([audioData], { type: "audio/mpeg" });

    // Create a Blob URL
    const audioUrl = URL.createObjectURL(blob);

    return audioUrl;
  } catch (error) {
    console.error("Error fetching or playing audio", error);
  }
  console.count("play");
}
//
//
//
export const fetchSecureData = async () => {
  try {
    const res = await fetch("/api/tts/secure");
    if (!res.ok) {
      throw new Error(await res.text());
    }
    const data = await res.json();
    console.log(data);
    // Handle the secure data
  } catch (error) {
    console.error("Failed to fetch secure data:", error);
    // Handle errors (e.g., showing an error message to the user)
  }
};

//
//
//
export const fetchLog = async () => {
  console.log("fetchLog");
  try {
    const res = await fetch("/api/log");
    if (!res.ok) {
      throw new Error(await res.text());
    }
    const data = await res.json();
    console.log(data);
    // Handle the secure data
  } catch (error) {
    console.error("Failed to fetch secure data:", error);
    // Handle errors (e.g., showing an error message to the user)
  }
};

//
//
//

export const fetchVoices = async (
  lang: string
): Promise<VoiceResponse[] | undefined> => {
  try {
    const res = await fetch("/api/voices");
    if (!res.ok) {
      throw new Error(await res.text());
    }
    const data = await res.json();

    const voiceList = JSON.parse(data);

    console.log(voiceList);

    return voiceList;
    // Handle the secure data
  } catch (error) {
    console.error("Failed to fetch secure data:", error);
    return undefined;
    // Handle errors (e.g., showing an error message to the user)
  }
};

// export const fetchVoicesFile = async (
//   lang: string
// ): Promise<VoiceResponse[] | undefined> => {
//   console.log("Fetching voices for lang:", lang);
//   try {
//     // Determine the file path
//     const filePath = path.join(process.cwd(), "data", "default_voices.json");

//     // Read the file content
//     const fileContent = await fs.readFile(filePath, "utf-8");

//     // Parse the JSON content
//     const voiceList: VoiceResponse[] = JSON.parse(fileContent);

//     console.log(voiceList);

//     return voiceList;
//   } catch (error) {
//     console.error("Failed to fetch voices:", error);
//     return undefined;
//   }
// };
