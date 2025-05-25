import { ActorNs } from "@actor/base.ts";
import { TokenDocumentNs } from "@module/scene/token-document/document.ts";

class PartyNs<TParent extends TokenDocumentNs | null = TokenDocumentNs | null> extends ActorNs<TParent> {
    override armorClass = null;
}

export { PartyNs };
