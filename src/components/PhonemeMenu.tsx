import { useState } from "react";
import ListItem from "./generic/ListItem";
import { phonemes } from "../../public/data/phonemes";
import Popover from "./ui/Popover";
import PopoverBody from "./ui/PopoverBody";
import List from "./generic/List";

interface VoiceMenuProps {
  toggleLeaf: (value: string) => void;
}

const phonemeIntoMenuItem = (item: TechPhoneme): Item => {
  return {
    id: item.id,
    name: item.name,
    value: item.phoneme,
  };
};

const phonemesIntoMenuItem = (arr: TechPhoneme[]): Item[] =>
  arr.map(phonemeIntoMenuItem);

const PhonemeMenu: React.FC<VoiceMenuProps> = ({ toggleLeaf }) => {
  const [phonemeItems, setPhonemeItems] = useState(
    phonemesIntoMenuItem(phonemes)
  );

  const onApply = (item: Item) => {
    toggleLeaf(item.id);
  };

  return (
    <div className="relative pb-2 max-h">
      <List
        title="Phonemes"
        initialItems={phonemeItems}
        onApply={onApply}
        classes={"max-h-96"}
      />
    </div>
  );
};

export default PhonemeMenu;
