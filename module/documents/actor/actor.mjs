import SystemDocumentMixin from "../mixins/document.mjs";

/**
 * Extend the base Actor class to implement system-specific logic.
 */
export default class ActorNs extends SystemDocumentMixin(Actor) {
    
    /**
     * Lazily computed store of attributes.
     * @type {Record<string, Record<string, object>>}
     */
    _lazy = {};

    /* ------------------------------------------------- */

    /** @inheritDoc */
    prepareData() {
        if ( this.system.modelProvider !== fvttns ) { return super.prepareData(); }
        this._clearCachedValues();
        this._preparationWarnings = [];
        super.prepareData();
    }

    /**
     * Clear cached class collections.
     * @internal
     */
    _clearCachedValues() {
        this._lazy = {};
    }
}
