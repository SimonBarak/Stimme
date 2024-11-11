import React from "react";
import VoiceMenu from "./VoiceMenu";
import LangMenu from "./LangMenu";

interface SidebarProps {
  toggleElement: (voice: string, emotion: string) => void;
  languageValue: string;
  setLanguageValue: React.Dispatch<React.SetStateAction<string>>;
  personas: Persona[];
  // Add any other props you need for the sidebar here
}

const Sidebar: React.FC<SidebarProps> = ({
  toggleElement,
  languageValue,
  setLanguageValue,
  personas,
}) => {
  return (
    <div className="w-60 bg-gray-100 rounded-lg text-sm shadow-md ">
      <div className="">
        <LangMenu
          voices={personas}
          setLanguageValue={setLanguageValue}
          def={languageValue}
        />
      </div>
      <div className="">
        <VoiceMenu
          toggleElement={toggleElement}
          languageValue={languageValue}
          voices={personas}
        />
      </div>

      {/* <div className="">
        <FileMenu />
      </div> */}
    </div>
  );
};

export default Sidebar;
