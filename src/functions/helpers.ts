import { Descendant } from "slate";
import { getVoices } from "./static";

const avaibleThumbNails = [
  "Conrad",
  "Gisela",
  "Kasper",
  "Amala",
  "Bernd",
  "Christoph",
  "Elke",
  "Killian",
  "Klarissa",
];

const bucketUrl = "https://wavepagestorage.blob.core.windows.net/audiofiles/";

// Define a utility function to ensure the schema is of the correct type
export const validateSchema = (
  schema: DescendantUseOnlyInIndex[]
): Descendant[] => {
  // Here, you'd ideally validate and transform your schema to match the expected type
  // This example assumes that schema already conforms to the correct type.

  return schema as Descendant[];
};

export const createAudioLink = (pageId: string) => {
  return bucketUrl + pageId + ".mp3";
};

export const mapCharacter = (displayName: string) => {
  const voicesResponse: VoiceResponse[] = getVoices() ?? [];
  const characterResponse = voicesResponse.find(
    (character) => character.DisplayName === displayName
  );

  if (characterResponse) {
    const character: Persona = addAvatar(characterResponse, 1);
    return character;
  } else {
    return addAvatar(voicesResponse[0], 0);
  }
};

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
  arr: Persona[],
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

const addAvatar = (voiceResponse: VoiceResponse, index: number): Persona => {
  const gender = voiceResponse.Gender === "Male" ? "a" : "b";
  const avatarNumber = index + 1;
  const avatarUrl = `/img/avatars/${gender}${avatarNumber}.png`;
  const voice: Persona = { ...voiceResponse, avatar: avatarUrl };
  return voice;
};

const addThumbImage = (persona: Persona): Persona => {
  if (avaibleThumbNails.includes(persona.DisplayName)) {
    return {
      ...persona,
      thumbImage: `/img/thumbnails/${persona.DisplayName}.png`,
    };
  }
  return persona;
};

const addThumbImages = (personas: Persona[]) => personas.map(addThumbImage);

function addAvatars(voices: VoiceResponse[]) {
  const groupedItems = chunkArray(voices);

  const voicesWithAvatar = groupedItems.map((group) =>
    group.map((item, idex) => addAvatar(item, idex))
  );

  return voicesWithAvatar.flat();
}

export function addUIdata(voices: VoiceResponse[]): Persona[] {
  const voicesWithAvatars: Persona[] = addAvatars(voices);
  const voicesWithThumbNails: Persona[] = addThumbImages(voicesWithAvatars);

  console.log(voicesWithThumbNails);
  return voicesWithThumbNails;
}
