import { ActorNs, PartyNs } from "@actor";

export class ActorsNs<TActor extends ActorNs<null>> extends Actors<TActor> {
    get party(): PartyNs<null> | null {}
}
