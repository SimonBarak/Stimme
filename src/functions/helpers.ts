import { Descendant } from "slate";
import { getVoices } from "./static";

const bucketUrl = "https://wavepagestorage.blob.core.windows.net/audiofiles/";

// Define a utility function to ensure the schema is of the correct type
export const validateSchema = (schema: Descendanto[]): Descendant[] => {
  // Here, you'd ideally validate and transform your schema to match the expected type
  // This example assumes that schema already conforms to the correct type.

  return schema as Descendant[];
};

export const createAudioLink = (pageId: string) => {
  return bucketUrl + pageId + ".mp3";
};

export const mapCharacter = async (displayName: string) => {
  const voicesResponse: VoiceResponse[] = (await getVoices()) ?? [];
  const characterResponse = voicesResponse.find(
    (character) => character.DisplayName === displayName
  );

  if (characterResponse) {
    const character: Voice = addAvatar(characterResponse, 1);
    return character;
  } else {
    return addAvatar(voicesResponse[0], 0);
  }
};

// export const mapStyle = (color: string) => {
//   return "happy";
// };

// Helper function to map gender from CharacterResponse to Character
function mapGender(gender: string): string {
  return gender.toLowerCase();
}

export function toggleItemById(array: ToggleItem[], id: string): ToggleItem[] {
  // Find the index of the item with the specified id
  const index = array.findIndex((item) => item.id === id);

  if (index !== -1) {
    // If the item exists, toggle the isSelected property
    array[index].isSelected = !array[index].isSelected;
  }

  return array;
}

function chunkArray<T>(items: T[], chunkSize: number = 49): T[][] {
  const chunks: T[][] = [];

  for (let i = 0; i < items.length; i += chunkSize) {
    const chunk = items.slice(i, i + chunkSize);
    chunks.push(chunk);
  }

  return chunks;
}

export const inputItemToItemToggle = (
  arr: Voice[],
  selected: string[]
): ToggleItem[] =>
  arr.map((item) => {
    return {
      id: item.DisplayName,
      avatar: item.avatar,
      name: `${item.DisplayName}, ${item.LocaleName}`,
      isSelected: selected.includes(item.DisplayName),
    };
  });

export const addAvatar = (
  voiceResponse: VoiceResponse,
  index: number
): Voice => {
  const gender = voiceResponse.Gender === "Male" ? "a" : "b";
  const avatarNumber = index + 1;
  const avatarUrl = `/img/avatars/${gender}${avatarNumber}.png`;
  const voice: Voice = { ...voiceResponse, avatar: avatarUrl };
  return voice;
};

function addAvatars(voices: VoiceResponse[]) {
  const groupedItems = chunkArray(voices);

  const voicesWithAvatar = groupedItems.map((group) =>
    group.map((item, idex) => addAvatar(item, idex))
  );

  return voicesWithAvatar.flat();
}

export function addUIdata(voices: VoiceResponse[]): Voice[] {
  const voicesWithAvatars: Voice[] = addAvatars(voices);
  return voicesWithAvatars;
}
