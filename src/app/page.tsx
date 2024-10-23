import { getVoices } from "@/functions/static";
import { addUIdata, validateSchema } from "@/functions/helpers";
import VoiceList from "@/components/VoiceList";
import Header from "@/components/Header";
import Layout from "./layout";

export default async function Page() {
  const voicesResponse: VoiceResponse[] = (await getVoices()) ?? [];
  const personas = addUIdata(voicesResponse);

  return (
    <>
      <div className=" ">
        <section className="container mx-auto py-20 md:py-36 w-full text-left">
          <h1 className="px-4 text-3xl md:text-5xl lg:text-8xl lg:leading-none xl:leading-none mb-6 lg:mb-10 xl:mb-10">
            AI-Powered Voices
            <br /> for Audio Recording
          </h1>
          <p className="px-4 max-w-2xl text-lg md:text-2xl lg:text-3xl lg:leading-tight xl:leading-tight font-normal mb-10">
            Create high-quality audio in your own language
          </p>
          <div className="px-4 mb-40">
            <a
              href="/edit"
              className="bg-yellow-200 hover:bg-yellow-300 px-6 py-3 text-lg inline-flex items-center justify-center rounded-md transition-all cursor-pointer text-black"
            >
              Create recording
            </a>
          </div>

          <div className="px-4 video-container -translate-y-10">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="background-video rounded-2xl overflow-hidden shadow-xl border-4 border-gray-100"
            >
              <source src="/videos/product-showcase.mp4" type="video/mp4" />
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
        <section className="container mx-auto py-20">
          <h2 className="px-4 max-w-4xl text-3xl md:text-5xl lg:text-8xl lg:leading-none xl:leading-none mb-6 lg:mb-20 xl:mb-8">
            Contact
          </h2>
          <p className="px-4 max-w-2xl text-lg md:text-2xl lg:text-2xl lg:leading-tight xl:leading-tight font-normal xl:mb-20">
            In Czech, German and English language. If you need a plan for you
            company or invoice, please contact me by mail
          </p>
          <p className="px-4 max-w-2xl text-lg md:text-2xl lg:text-2xl lg:leading-tight xl:leading-tight font-normal mb-8 text-gray-600">
            Email
          </p>
          <p className="px-4 max-w-2xl text-lg md:text-2xl lg:text-2xl lg:leading-tight xl:leading-tight font-normal mb-8">
            simon@hlasem.com
          </p>
          <p className="px-4 max-w-2xl text-lg md:text-2xl lg:text-2xl lg:leading-tight xl:leading-tight font-normal mb-8  text-gray-600">
            Address
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
