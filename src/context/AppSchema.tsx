import { About, Code, Journey, Personal, Talk, Text } from "../schema";

export interface AppSchema {
  personal: Personal;
  about: About;
  journey: Journey;
  text: Text;
  talk: Talk;
  code: Code;
}
