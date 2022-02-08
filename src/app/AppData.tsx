import { AboutData } from "../data/AboutData";
import { CodeData } from "../data/CodeData";
import { JourneyData } from "../data/JourneyData";
import { PersonalData } from "../data/PersonalData";
import { TalkData } from "../data/TalkData";
import { TextData } from "../data/TextData";

export interface AppData {
  personal: PersonalData;
  about: AboutData;
  journey: JourneyData;
  text: TextData;
  talk: TalkData;
  code: CodeData;
}
