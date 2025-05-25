/// <reference types="vite/client" />

import { ActorNs } from "@actor/base.ts";
import { ItemNs } from "@item/base/document.ts";
import { ChatMessageNs } from "@module/chat-message/document.ts";
import { ActorsNs } from "@module/collection/actors.ts";
import { EncounterNs } from "@module/encounter/document.ts";
import { MacroNs } from "@module/macro.ts";
import { SceneNs } from "@module/scene/document.ts";
import { UserNs } from "@module/user/document.ts";

interface GameNs
    extends Game<
        ActorNs<null>,
        ActorsNs<ActorNs<null>>,
        ChatMessageNs,
        EncounterNs,
        ItemNs<null>,
        MacroNs,
        SceneNs,
        UserNs
    > {
    ns: {
        gm: {};
        system: {};
        settings: {};
    };
}

declare global {
    namespace globalThis {
        // sourcery skip: avoid-using-var
        // eslint-disable-next-line no-var
        var game: GameNs;
        // eslint-disable-next-line no-var
        var fu: typeof foundry.utils;

        interface Math {
            eq: (a: number, b: number) => boolean;
            gt: (a: number, b: number) => boolean;
            gte: (a: number, b: number) => boolean;
            lt: (a: number, b: number) => boolean;
            lte: (a: number, b: number) => boolean;
            ne: (a: number, b: number) => boolean;
            ternary: (condition: boolean | number, ifTrue: number, ifFalse: number) => number;
        }
    }

    interface RollMathProxy {
        eq: (a: number, b: number) => boolean;
        gt: (a: number, b: number) => boolean;
        gte: (a: number, b: number) => boolean;
        lt: (a: number, b: number) => boolean;
        lte: (a: number, b: number) => boolean;
        ne: (a: number, b: number) => boolean;
        ternary: (condition: boolean | number, ifTrue: number, ifFalse: number) => number;
    }

    const BUILD_MODE: "development" | "production";
    const ROLL_PARSER: string;
}
