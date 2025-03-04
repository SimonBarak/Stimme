// Create a HeroSection component that is used in the app/page.tsx file

import StartButton from "@/components/StartButton";
import { Background } from "./Background";

export default function HeroSection() {
  return (
    <section id="hero" className="text-center">
      <div className="container mx-auto py-12 md:py-44 w-full">
        <h1 className="px-4 text-4xl font-medium tracking-tight leading-tight md:text-5xl md:leading-tight lg:text-7xl lg:leading-tight xl:text-8xl xl:leading-tight mb-4 md:mb-6 lg:mb-8">
          AI Powered Voices
        </h1>
        <div className="px-4 text-base leading-relaxed md:text-lg md:leading-relaxed lg:text-xl lg:leading-relaxed xl:text-2xl xl:leading-relaxed font-normal mb-6 md:mb-8 lg:mb-10 max-w-2xl mx-auto">
          <p>Create high-quality audio in your own language </p>
          <p>🇪🇺 🇩🇪 🇨🇿 🇫🇷 🇮🇹 🇪🇸</p>
        </div>
        <div className="px-4 mb-20">
          <StartButton
            size={"large"}
            variant={"bold"}
            href={"/edit"}
            text={"Create recording"}
          />
        </div>

        <div className="w-full max-w-6xl mx-auto bg-gray-100 rounded-2xl shadow-xl overflow-hidden border-4 border-gray-100">
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
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <Background />
        </div>
      </div>
    </section>
  );
}
