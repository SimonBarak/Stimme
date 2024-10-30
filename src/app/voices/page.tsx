"use server";
import Header from "@/components/Header";
import VoiceList from "@/components/VoiceList";
import { addUIdata } from "@/functions/helpers";
import { getVoices } from "@/functions/static";

// Main component for the Voices page
const Voices = async () => {
  const voicesResponse: VoiceResponse[] = (await getVoices()) ?? [];
  const personas = addUIdata(voicesResponse);

  const h1 = "List of all voices";
  const h2 =
    "This list summarizes languages, voices and emotions. Choose AI voice for your language and create audio recording.";

  return (
    <>
      <Header showCTS={true} />
      <div>
        {/* Header Section */}
        <div className="container mx-auto mb-10 mt-20 lg:mb-20 lg:mt-40">
          <h1 className="text-3xl md:text-6xl mb-4">{h1}</h1>
          <h2 className="text-lg lg:text-xl">{h2}</h2>
        </div>

        {/* <div>
        <GenerateButton />
        <GenerateSchemaButton />
      </div> */}

        {/* VoiceList Component Rendering */}
        <div className="pb-40">
          <VoiceList
            voices={personas}
            size="lg"
            defaultValue={"German (Germany)"}
          />
        </div>
      </div>
    </>
  );
};

export default Voices;
