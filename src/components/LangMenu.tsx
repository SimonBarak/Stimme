import SelectLang from "./ui/SelectLang";

interface VoiceListProps {
  def: string;
  voices: Persona[];
  setLanguageValue: (value: string) => void;
}

const LangMenu: React.FC<VoiceListProps> = ({
  voices,
  setLanguageValue,
  def,
}) => {
  const languageItems = [...new Set(voices.map((item) => item.LocaleName))];

  function handleFilterValue(value: string) {
    setLanguageValue(value);
  }

  return (
    <div className="border-b pb-4">
      <div className="flex w-full px-4 pt-6 pb-4">
        <div className="grow label">Language</div>
      </div>
      <div className="px-4">
        <SelectLang
          options={languageItems}
          setValue={handleFilterValue}
          def={def}
        />
      </div>
    </div>
  );
};

export default LangMenu;
