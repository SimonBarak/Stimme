import StimmeEditor from "@/components/stimmeEditor";
import { getPropsData } from "@/functions/static";
import { auth } from "@/server/auth";
import { Descendant } from "slate";

type EditPropsType = {
  personas: Persona[];
  initialValue: Descendant[];
  initialLanguage: string;
  initialAudioLink: string;
  phonemes: TechPhoneme[];
};

export default async function Page({ params }: { params: { id: string } }) {
  const postData: EditPropsType = getPropsData(params);
  const {
    initialValue,
    initialLanguage,
    personas,
    phonemes,
    initialAudioLink,
  } = postData;
  const session = await auth();
  const isAuth = session != null;
  const isPro = session?.user?.isPro === true;

  return (
    <>
      <StimmeEditor
        initialValue={initialValue}
        initialLaguage={initialLanguage}
        initialAudioLink={initialAudioLink}
        personas={personas}
        phonemes={phonemes}
        isAuth={isAuth}
        isPro={isPro}
      />
    </>
  );
}
