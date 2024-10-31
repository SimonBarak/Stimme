import StimmeEditor from "@/components/stimmeEditor";
import { getPropsData } from "@/functions/static";
import { Descendant } from "slate";
import { auth } from "@/server/auth";

type EditPropsType = {
  personas: Persona[];
  initialValue: Descendant[];
  initialLanguage: string;
};

export default async function Page() {
  const postData: EditPropsType = await getPropsData({ id: "vlasta" });
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
