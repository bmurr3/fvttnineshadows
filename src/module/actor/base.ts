import { TokenDocumentNs } from "@module/scene/token-document/document.ts";

class ActorNs<TParent extends TokenDocumentNs | null = TokenDocumentNs | null> extends Actor<TParent> {
    declare initialized: boolean;
}

export { ActorNs };
