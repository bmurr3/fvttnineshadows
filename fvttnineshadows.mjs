import { SystemActor } from "./module/documents.mjs";
import { HeroDataModel, VillainDataModel, PawnDataModel, WeaponDataModel, SpellDataModel } from "./module/data-modules.mjs";

const systemTitle = game.i18n.localize("NS.Title");

Hooks.once("init", () => {
    CONFIG.Actor.documentClass = SystemActor;

    CONFIG.Actor.dataModels = {
        hero: HeroDataModel,
        villain: VillainDataModel,
        pawn: PawnDataModel
    }

    CONFIG.Actor.trackableAttributes = {
        hero: {
            bar: ["resources.health", "resources.power", "goodness"],
            value: []
        },
        pawn: {
            bar: ["resources.health", "resources.power", "goodness"],
            value: []
        }
    };
});
