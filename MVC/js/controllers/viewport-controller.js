(function (controllers, _, $, models, utils, nodes) {
    $(function () {
        var cars = models.cars;
        var data = cars.getData();

        controllers.viewport = (function () {
            return {
                renderViewport: function (data) {
                    data = data || {
                            name: 'Start picture',
                            link: './img/start_picture.jpg'
                        };
                    this.renderImg(data);
                    this.renderTitle(data);
                },

                findNodes: function () {
                    var content = $('.b-content');
                    nodes.$viewport = content.find('.b-viewport');
                    nodes.$viewportTitle = nodes.$viewport.find('.b-viewport_title');
                    nodes.$viewportImg = nodes.$viewport.find('.b-viewport_img-wrap');
                },

                renderTitle: function (data) {
                    var template;
                    template = _.template($('#viewportTitleTemplate').html());
                    nodes.$viewportTitle.html(template(data));
                },

                renderImg: function (data) {
                    var template;
                    template = _.template($('#viewportTemplate').html());
                    nodes.$viewportImg.html(template(data));
                },

                initEvents: function () {
                    utils.mediator.subscribe('changeTitle', function (pictureIndex) {
                        this.renderTitle(cars.getActivePictures()[pictureIndex]);
                    }.bind(this));

                    utils.mediator.subscribe('changePicture', function (activeCar) {
                        this.renderImg(activeCar);
                    }.bind(this));
                },

                init: function () {
                    this.findNodes();
                    this.renderViewport();
                    this.initEvents();
                }
            };
        })();
    });

})(window.app.controllers, _, jQuery, window.app.models, window.app.utils, window.app.nodes);