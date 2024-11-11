// import { Descendant } from "slate";

type GenerationState = "ready" | "loading" | "disabled" | "error";
type SubscriptionType = "Free" | "3 Days" | "Pro";

type Translation = {
  lang: string;
  text: string;
};

type GenItem = {
  id: string;
  ssml: string;
};

type Style = {
  id: string;
  name: string;
  color: string;
};

type Persona = VoiceResponse & {
  avatar: string;
  emotion?: string;
};

type VoiceResponse = {
  DisplayName: string;
  Gender: string;
  LocalName: string;
  LocaleName: string;
  Locale: string;
  Name: string;
  SampleRateHertz: string;
  ShortName: string;
  Status: string;
  VoiceType: string;
  WordsPerMinute: string;
  StyleList?: string[];
  RolePlayList?: string[];
  SecondaryLocaleList?: string[];
};

type DescendantUseOnlyInIndex = {
  type: string;
  voice: string;
  children: Array<{
    text: string;
  }>;
};

type SchemaFile = {
  id: string;
  lang: string;
  schema: DescendantUseOnlyInIndex[];
};

type VoiceItem = {
  voice: VoiceResponse;
  mainText: string;
  styleTexts?: string[];
};

type IDObject = {
  id: string;
};

type RouterParams = {
  params: IDObject;
};

type TechPhoneme = {
  name: string;
  phoneme: string;
  id: string;
};

type Emotion = Item & { color: string };

type ToggleItem = {
  id: string;
  name: string;
  isSelected: boolean;
  avatar?: string;
};

type Item = {
  id: string;
  name: string;
  value: string;
  options?: string[];
  avatar?: string;
};

type MenuItem = {
  id: string;
  name: string;
  value?: string;
  options?: string[];
};

type Field = {
  label: string;
  id: string;
  editable: boolean;
  value?: string;
  options?: string[];
  onChange: (string: string) => void;
};

type MenuItemProps = {
  item: MenuItem;
  onRemove: (id: string) => void;
  onClick: (name: string) => void;
};
