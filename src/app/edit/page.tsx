import StimmeEditor from "@/components/stimmeEditor";
import { getVoices } from "@/functions/static";
import { addUIdata, validateSchema } from "@/functions/helpers";
import { Descendant } from "slate";
import { promises as fs } from "fs";
import { auth } from "@/server/auth";

async function getFiles(): Promise<SchemaFile[] | undefined> {
  const filesData = await fs.readFile(
    process.cwd() + "/schemas/schemas.json",
    "utf8"
  );

  const files: SchemaFile[] = JSON.parse(filesData);

  if (files) {
    return files;
  } else {
    console.error("getVoices");
  }
}

export default async function Edit() {
  let initValue: Descendant[] = [];
  let initLanguage = "English (United States)";
  const session = await auth();
  const isAuth = session != null;

  const files = await getFiles();

  if (files) {
    // TODO default file
    const { lang, schema }: SchemaFile = files[0];
    initValue = validateSchema(schema);
    initLanguage = lang;
  }

  // fetch voices from file
  const voicesResponse: VoiceResponse[] = (await getVoices()) ?? [];

  const personas = addUIdata(voicesResponse);

  return (
    <>
      <StimmeEditor
        initialLaguage={initLanguage}
        initialValue={initValue}
        personas={personas}
        isAuth={isAuth}
      />
    </>
  );
}
