"use client";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import VoiceItem from "@/components/VoiceItem";
import PlayerSm from "@/components/PlayerSm";
import SelectLang from "@/components/ui/SelectLang";
import SelectLangLg from "./ui/SelectLangLg";

interface VoiceListProps {
  defaultValue: string;
  voices: Persona[];
  size: "sm" | "lg";
}

function removeObjectsById(items: Persona[], idsToRemove: string[]): Persona[] {
  return items.filter((item) => !idsToRemove.includes(item.ShortName));
}

const filterItems = (searchTerm: string, items: Persona[]) => {
  const filteredItems = items.filter((item) =>
    item.LocaleName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return filteredItems;

  // const restItems = removeObjectsById(
  //   voices,
  //   filteredItems.map((i) => i.ShortName)
  // );

  // setRestItems(restItems);
};

const filterOutItems = (searchTerm: string, items: Persona[]) => {
  const filteredItems = items.filter(
    (item) => !item.LocaleName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return filteredItems;
};

const VoiceList: React.FC<VoiceListProps> = ({
  voices,
  defaultValue = "German (Germany)",
  size,
}) => {
  const [showFixedDiv, setShowFixedDiv] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [filteredItems, setFilteredItems] = useState<Persona[]>(
    filterItems(defaultValue, voices)
  );
  const [restItems, setRestItems] = useState<Persona[]>(
    filterOutItems(defaultValue, voices)
  );

  const [audioSrc, setAudioSrc] = useState<string | null>(
    "https://stimmestatic.blob.core.windows.net/audio/en-US-DavisNeural_cheerful.mp3"
  );

  const playAudio = async (id: string) => {
    const lowerCase = id.toLocaleLowerCase();
    const version = "2";
    const audioUrl = `https://stimmestatic.blob.core.windows.net/audio/${lowerCase}-${version}.mp3`;
    setAudioSrc(audioUrl);
  };

  const handlePlayAudio = async (id: string) => {
    playAudio(id);
    setIsPlaying(true);
  };

  const languageItems = [...new Set(voices.map((item) => item.LocaleName))];

  function handleFilterValue(value: string) {
    setFilteredItems(filterItems(value, voices));
    setRestItems(filterOutItems(value, voices));
  }

  const parentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const buffer = 800;
      if (parentRef.current) {
        const parentPosition =
          parentRef.current.getBoundingClientRect().top +
          window.scrollY -
          buffer;
        const scrollY = window.scrollY || document.documentElement.scrollTop;

        // Show the fixed div when the scroll position goes beyond the parent's position
        if (scrollY > parentPosition) {
          setShowFixedDiv(true);
        } else {
          setShowFixedDiv(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div ref={parentRef}>
      {showFixedDiv ? (
        isPlaying ? (
          <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-200 rounded-xl shadow">
            <div className="container mx-auto px-8 py-4">
              {audioSrc && <PlayerSm src={audioSrc} />}
            </div>
          </div>
        ) : null
      ) : null}

      <div className="container mx-auto mb-20">
        <div className="flex justify-center">
          {size === "lg" ? (
            <SelectLangLg
              options={languageItems}
              setValue={handleFilterValue}
              def={defaultValue}
            />
          ) : (
            <SelectLang
              options={languageItems}
              setValue={handleFilterValue}
              def={defaultValue}
            />
          )}
        </div>
      </div>

      <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-2 mb-20">
        {filteredItems.map((voice) => (
          <VoiceItem
            key={voice.DisplayName}
            voice={voice}
            handlePlayAudio={handlePlayAudio}
          />
        ))}
      </ul>

      {size != "lg" && restItems.length > 0 ? (
        <>
          <div className="container mx-auto mb-10">
            <h2 className="text-2xl">All voices</h2>
          </div>

          <ul className="container mx-auto grid grid-cols-3 gap-2 mb-96">
            {restItems.map((voice, index) => (
              <VoiceItem
                key={voice.DisplayName}
                voice={voice}
                handlePlayAudio={handlePlayAudio}
              />
            ))}
          </ul>
        </>
      ) : null}
    </div>
  );
};

export default VoiceList;
