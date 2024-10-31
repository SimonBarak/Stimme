import { useCallback, useEffect, useState } from "react";
import List from "./generic/List";

interface VoiceMenuProps {
  toggleElement: (character: string, emotion: string) => void;
  languageValue: string;
  voices: Persona[];
}

const voiceIntoMenuItem = (item: Persona): Item => {
  return {
    id: item.DisplayName,
    name: `${item.DisplayName}`,
    value: "normal",
    options: item.StyleList,
    avatar: item.avatar,
  };
};

const voicesIntoMenuItem = (arr: Persona[]): Item[] =>
  arr.map(voiceIntoMenuItem);

const VoiceMenu: React.FC<VoiceMenuProps> = ({
  languageValue,
  toggleElement,
  voices,
}) => {
  function filterByLanguage(voices: Persona[], searchTerm: string): Persona[] {
    const filteredItems = voices.filter((item) =>
      item.LocaleName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filteredItems;
  }

  const [voiceItems, setVoiceItems] = useState<Item[]>(
    voicesIntoMenuItem(filterByLanguage(voices, languageValue))
  );

  // Change voiceItems list if language option is changed
  useEffect(() => {
    setVoiceItems(voicesIntoMenuItem(filterByLanguage(voices, languageValue)));
  }, [languageValue, voices]);

  const onApply = (item: Item) => {
    toggleElement(item.id, item.value);
  };

  // TODO: useEffect here as well

  return (
    <div className="border-b">
      <div className="relative">
        <List
          title="Voice Styles"
          initialItems={voiceItems}
          onApply={onApply}
          classes={"max-h-28"}
        />
      </div>
    </div>
  );
};

export default VoiceMenu;
