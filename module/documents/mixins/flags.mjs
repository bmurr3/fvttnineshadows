/**
 * Mixin used to add system flags enforcement to types.
 * @template {foundry.abstract.Document} T
 * @param {typeof T}
 * @returns {typeof SystemFlags}
 * @mixin
 */
export default function SystemFlagsMixin(Base) {
    class SystemFlags extends Base {
        /**
         * Get the data model that represents system flags.
         * @type {typeof DataModel|null}
         * @abstract
         */
        get _systemFlagsDataModel() {
            return null;
        }

        /* ---------------------------------------------- */

        /** @inheritDoc */
        prepareData() {
            super.prepareData();
            if ( ('fvttns' in this.flags) && this._systemFlagsDataModel ) {
                this.flags.fvttns = new this._systemFlagsDataModel(this._source.flags.fvttns, { parent: this });
            }
        }

        /* --------------------------------------------- */

        /** @inheritDoc */
        async setFlag(scope, key, value) {
            if ( (scope === "fvttns") && this._systemFlagsDataModel ) {
                let diff;
                const changes = foundry.utils.expandObject({ [key]: value });
                if ( this.flags.fvttns ) { 
                    diff = this.flags.fvttns.updateSource(changes, { dryRun: true });
                } else {
                    diff = new this._systemFlagsDataModel(changes, { parent: this }).toObject();
                }
                return this.update({ flags: { fvttns: diff } });
            }
            return super.setFlag(scope, key, value);
        }
    }

    return SystemFlags;
}