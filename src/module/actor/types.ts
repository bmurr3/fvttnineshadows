import type { ACTOR_TYPES } from "./values.ts";

type ActorType = (typeof ACTOR_TYPES)[number];

type ActorAlliance = "party" | "opposition" | null;

export type {
    ActorAlliance,
    ActorType,
};
