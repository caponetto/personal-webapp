import { TFunction } from "i18next";
import literal from "../../static/locales/en/literal.json";

export type LiteralKey = keyof typeof literal;

export const literalKey = (key: LiteralKey) => `literal:${key}` as const;

export const tLiteral = (t: TFunction, key: LiteralKey) => t(literalKey(key));
