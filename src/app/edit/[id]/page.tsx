import StimmeEditor from "@/components/stimmeEditor";
import { addUIdata, validateSchema } from "@/functions/helpers";
import { getVoices } from "@/functions/static";
import { auth } from "@/server/auth";
import { promises as fs } from "fs";

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

async function getFile(id: string) {
  const files = await getFiles();
  if (files) {
    const file = files.find((i) => i.id === id);
    console.log("getFile");
    console.log(file);
    return file;
  }
}

export const dynamicParams = false;

import { Descendant } from "slate"; // Import the correct type from Slate

export default async function Page({ params }: { params: { id: string } }) {
  let initValue: Descendant[] = [];
  let initLanguage = "English (United States)";
  const { id } = params;
  const file = await getFile(id);
  const session = await auth();
  const isAuth = session != null;

  if (file) {
    const { lang, schema }: SchemaFile = file;
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
function getSchema(id: string) {
  throw new Error("Function not implemented.");
}
