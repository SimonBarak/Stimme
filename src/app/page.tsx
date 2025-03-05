import { getVoices } from "@/functions/static";
import { addUIdata, validateSchema } from "@/functions/helpers";
import VoiceList from "@/components/VoiceList";
import Header from "@/components/Header";
import HeroSection from "@/sections/HeroSection";

export default async function Page() {
  const voicesResponse: VoiceResponse[] = getVoices();
  const personas: Persona[] = addUIdata(voicesResponse);

  return (
    <>
      <Header showCTS={true} />
      <div className="">
        <HeroSection />
        <section className="container mx-auto py-20">
          <div className="text-center">
            <h2 className="text-2xl tracking-tight leading-tight md:text-4xl md:leading-tight lg:leading-tight  xl:leading-tight mb-4 md:mb-6 lg:mb-8">
              Find a voice in your language
            </h2>
          </div>
          <div>
            <VoiceList
              voices={personas}
              size="lg"
              defaultValue={"German (Germany)"}
            />
          </div>
        </section>
        <section id="contact" className="bg-gray-100">
          <div className="container mx-auto py-20">
            <h2 className="px-4 max-w-4xl text-2xl md:text-4xl lg:leading-none xl:leading-none mb-6 lg:mb-20 xl:mb-8">
              Contact
            </h2>
            <p className="px-4 max-w-2xl text-lg md:text-2xl lg:leading-tight xl:leading-tight font-normal mb-16">
              If you need any support, please contact me by mail.
            </p>
            <p className="px-4 mb-4">
              <span className="font-semibold text-gray-500">EMAIL</span>
            </p>

            <p className="px-4 max-w-2xl text-lg md:text-2xl lg:text-2xl lg:leading-tight xl:leading-tight font-normal mb-16">
              simon@hlasem.com
            </p>
          </div>
        </section>
        <section className="flex justify-center py-80 bg-gray-200">
          <div className="flex flex-col text-center">
            <a href="https://simonbarak.de" className="">
              © simonbarak.de
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
