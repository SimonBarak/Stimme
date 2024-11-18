import StimmeEditor from "@/components/stimmeEditor";
import { getPropsData } from "@/functions/static";
import { Descendant } from "slate";
import { auth } from "@/server/auth";

type EditPropsType = {
  personas: Persona[];
  initialValue: Descendant[];
  phonemes: TechPhoneme[];
  initialLanguage: string;
  initialAudioLink: string;
};

export default async function Page() {
  const postData: EditPropsType = getPropsData({
    id: "de-DE-ConradNeural",
  });

  const {
    initialValue,
    initialLanguage,
    personas,
    phonemes,
    initialAudioLink,
  } = postData;

  const session = await auth();

  // console.log("Session:", session);
  // if (session) {
  //   console.log("User Data:", session.user);
  //   console.log("Is Pro User:", session.user?.isPro);
  // } else {
  //   console.log("No session found, user is not authenticated.");
  // }

  const isAuth = Boolean(session);

  const isPro = isAuth && session?.user?.isPro === true;

  return (
    <>
      <StimmeEditor
        initialValue={initialValue}
        initialLaguage={initialLanguage}
        personas={personas}
        phonemes={phonemes}
        isAuth={isAuth}
        isPro={isPro}
        initialAudioLink={initialAudioLink}
      />
    </>
  );
}
