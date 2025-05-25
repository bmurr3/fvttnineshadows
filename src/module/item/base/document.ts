import { ActorNs } from "@actor";

class ItemNs<TParent extends ActorNs | null = ActorNs | null> extends Item<TParent> {
    declare initialized: boolean;
}

export { ItemNs };
