window.app = {
    initialize: function () {
        // use - {{ }}
        _.templateSettings = {
            interpolate: /\{\{(.+?)\}\}/g
        };

        this.controllers.topMenu.init();
        this.controllers.rightMenu.init();
        this.controllers.viewport.init();

    },

    utils: {},
    controllers: {},
    models: {},
    nodes: {}
};