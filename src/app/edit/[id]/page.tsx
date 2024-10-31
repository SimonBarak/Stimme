import StimmeEditor from "@/components/stimmeEditor";
import { getPropsData } from "@/functions/static";
import { auth } from "@/server/auth";
import { Descendant } from "slate";

type EditPropsType = {
  personas: Persona[];
  initialValue: Descendant[];
  initialLanguage: string;
};

export default async function Page({ params }: { params: { id: string } }) {
  const postData: EditPropsType = await getPropsData(params);
  const { initialValue, initialLanguage, personas } = postData;
  const session = await auth();
  const isAuth = session != null;

  return (
    <>
      <StimmeEditor
        initialValue={initialValue}
        initialLaguage={initialLanguage}
        personas={personas}
        isAuth={isAuth}
      />
    </>
  );
}
