import { getVoices } from "@/functions/static";
import { addUIdata, validateSchema } from "@/functions/helpers";
import VoiceList from "@/components/VoiceList";
import Header from "@/components/Header";
import StartButton from "@/components/StartButton";

export default async function Page() {
  const voicesResponse: VoiceResponse[] = getVoices();
  const personas: Persona[] = addUIdata(voicesResponse);

  return (
    <>
      <Header showCTS={true} />
      <div className=" ">
        <section className="container mx-auto py-28 md:py-44 w-full text-left">
          <h1 className="px-4 text-4xl font-medium tracking-tight leading-tight md:text-5xl md:leading-tight lg:text-7xl lg:leading-tight xl:text-8xl xl:leading-tight mb-4 md:mb-6 lg:mb-8">
            AI Powered Voices
            <br /> for Audio Recording
          </h1>
          <p className="px-4 text-base leading-relaxed md:text-lg md:leading-relaxed lg:text-xl lg:leading-relaxed xl:text-2xl xl:leading-relaxed font-normal mb-6 md:mb-8 lg:mb-10">
            Create high-quality audio in your own language 🇪🇺
          </p>
          <div className="px-4 mb-20">
            <StartButton
              size={"large"}
              href={"/edit"}
              text={"Create recording"}
            />
          </div>

          <div className="w-full max-w-4xl mx-auto bg-gray-100 rounded-2xl shadow-xl overflow-hidden border-4 border-gray-100">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover rounded-2xl overflow-hidden"
            >
              <source
                src="https://res.cloudinary.com/dhxmg9p4i/video/upload/v1730476281/wavepage/klipp23fiedbtxlm4wli.webm"
                type="video/webm"
              />
              <source
                src="https://res.cloudinary.com/dhxmg9p4i/video/upload/v1730476584/wavepage/soy2skmjpmtxashueck1.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        </section>
        <section className="container mx-auto py-20">
          {/* <h2 className="px-4 max-w-4xl text-3xl md:text-5xl lg:text-8xl lg:leading-none xl:leading-none mb-6 lg:mb-20 xl:mb-20">
            Premium voices in Europian languages
          </h2> */}
          <div>
            <VoiceList
              voices={personas}
              size="lg"
              defaultValue={"German (Germany)"}
            />
          </div>
        </section>
        <section id="contact" className="container mx-auto py-20">
          <h2 className="px-4 max-w-4xl text-3xl md:text-5xl lg:text-8xl lg:leading-none xl:leading-none mb-6 lg:mb-20 xl:mb-8">
            Contact
          </h2>
          <p className="px-4 max-w-2xl text-lg md:text-2xl lg:text-2xl lg:leading-tight xl:leading-tight font-normal xl:mb-20">
            If you need any support, please contact me by mail
          </p>
          <p className="px-4 mb-8 ">
            <span className="font-semibold text-gray-500">EMAIL</span>
          </p>

          <p className="px-4 max-w-2xl text-lg md:text-2xl lg:text-2xl lg:leading-tight xl:leading-tight font-normal mb-16">
            simon@hlasem.com
          </p>
          <p className="px-4 mb-8 ">
            <span className="font-semibold text-gray-500">ADDRESS</span>
          </p>
          <p className="px-4 max-w-2xl text-lg md:text-2xl lg:text-2xl lg:leading-tight xl:leading-tight font-normal mb-8">
            Strallauer Allee 17b
            <br /> Berlin, Germany
          </p>
        </section>
        <section className="flex justify-center py-80 bg-gray-200">
          <div className="flex flex-col text-center">
            <a href="https://simon-barak.link/" className="">
              © simon-barak.link
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
