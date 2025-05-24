export class LicenseViewer extends Application {
    static override get defaultOptions(): ApplicationOptions {
        return fu.mergeObject(super.defaultOptions, {
            id: "license-viewer",
            title: game.i18n.localize("NS.LicenseViewer.Label"),
            template: "systems/fvttnineshadows/templates/packs/license-viewer.hbs",
            width: 500,
            height: 600,
            resizable: true,
            tabs: [
                {
                    navSelector: "nav",
                    contentSelector: "section.content",
                    initial: "landing-page",
                },
            ],
        });
    }
}
