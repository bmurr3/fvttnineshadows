import type { ActorNs } from "@actor";
import type { ItemNs } from "@item";
import type * as fields from "types/foundry/common/data/fields.d.ts";

const SIZES = ["tiny", "sm", "med", "lg", "huge", "grg"] as const;
const SIZE_SLUGS = ["tiny", "small", "medium", "large", "huge", "gargantuan"] as const;

type Size = (typeof SIZES)[number];

const RARITIES = ["common", "uncommon", "rare", "unique"] as const;
type Rarity = (typeof RARITIES)[number];

interface ValuesList<T extends string = string> {
    value: T[];
}

interface LabeledValueAndMax extends ValueAndMax {
    label: string;
}

interface LabeledNumber {
    label: string;
    value: number;
    type: string;
}

interface TypeAndValue<TType extends string> {
    type: TType;
    value: number;
}

interface TraitsWithRarity<T extends string> {
    value: T[];
    rarity: Rarity;
}

interface ValueAndMaybeMax {
    value: number;
    max?: number;
}

interface ValueAndMax extends Required<ValueAndMaybeMax> {}

interface NewDocumentMigrationRecord {
    version: null;
    previous: null;
}

type MigrationDataField = fields.SchemaField<{
    version: fields.NumberField<number, number, true, true, true>;
    previous: fields.SchemaField<
        {
            foundry: fields.StringField<string, string, true, true, true>;
            system: fields.StringField<string, string, true, true, true>;
            schema: fields.NumberField<number, number, true, true, true>;
        },
        { foundry: string | null; system: string | null; schema: number | null },
        { foundry: string | null; system: string | null; schema: number | null },
        true,
        true,
        true
    >;
}>;

type MigratedDocumentMigrationRecord = fields.SourcePropFromDataField<MigrationDataField>;

type MigrationRecord = NewDocumentMigrationRecord | MigratedDocumentMigrationRecord;

interface PublicationData {
    title: string,
    authors: string,
    license: "ORC" | "OGL";
    remaster: boolean;
}

export const TRAINING_RANKS = ["neophyte", "novice", "expert", "journeyman"] as const;

export const MATH_FUNCTION_NAMES: Set<MathFunctionName> = new Set([
    "abs",
    "acos",
    "acosh",
    "asin",
    "asinh",
    "atan",
    "atan2",
    "atanh",
    "cbrt",
    "ceil",
    "clamped",
    "clz32",
    "cos",
    "cosh",
    "exp",
    "expm1",
    "floor",
    "fround",
    "hypot",
    "imul",
    "log",
    "log10",
    "log1p",
    "log2",
    "max",
    "min",
    "normalizeDegrees",
    "normalizeRadians",
    "pow",
    "random",
    "round",
    "roundDecimals",
    "safeEval",
    "sign",
    "sin",
    "sinh",
    "sqrt",
    "tan",
    "tanh",
    "toDegrees",
    "toRadians",
    "trunc",
] as const);

type EnfolderableDocumentNs =
    | ActorNs<null>
    | ItemNs<null>
    | Exclude<EnfolderableDocument, Actor<null> | Item<null>>;

export { RARITIES, SIZES, SIZE_SLUGS };
export type {
    EnfolderableDocumentNs,
    LabeledNumber,
    LabeledValueAndMax,
    MigrationDataField,
    MigrationRecord,
    PublicationData,
    Rarity,
    Size,
    TraitsWithRarity,
    TypeAndValue,
    ValueAndMax,
    ValueAndMaybeMax,
    ValuesList,
};
