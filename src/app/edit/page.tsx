import StimmeEditor from "@/components/stimmeEditor";
import { getPropsData } from "@/functions/static";
import { Descendant } from "slate";
import { auth } from "@/server/auth";

type EditPropsType = {
  personas: Persona[];
  initialValue: Descendant[];
  phonemes: TechPhoneme[];
  initialLanguage: string;
};

export default async function Page() {
  const postData: EditPropsType = getPropsData({
    id: "de-DE-ConradNeural",
  });
  const { initialValue, initialLanguage, personas, phonemes } = postData;

  const session = await auth();
  const isAuth = session != null;

  return (
    <>
      <StimmeEditor
        initialValue={initialValue}
        initialLaguage={initialLanguage}
        personas={personas}
        phonemes={phonemes}
        isAuth={isAuth}
      />
    </>
  );
}
