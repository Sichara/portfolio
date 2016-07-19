(function (controllers, _, $, models, utils, nodes) {
    $(function () {
        var cars = models.cars;
        var data = cars.getData();

        controllers.topMenu = (function () {
            return {
                render: function (data) {
                    var template, topMenu;
                    template = _.template($('#topMenuTemplate').html());

                    topMenu = data.reduce(function (html, data) {
                        html += template(data);
                        return html;
                    }, '');

                    nodes.$topMenu.html(topMenu);
                },

                renderSubMenu: function (data) {
                    var templateSub, subMenu;
                    templateSub = _.template($('#topSubMenuTemplate').html());

                    subMenu = data.reduce(function (html, data) {
                        html += templateSub(data);
                        return html;
                    }, '');

                    nodes.$topSubMenu.html(subMenu);
                },

                findNodes: function () {
                    var header = $('.b-header');
                    nodes.$topMenu = header.find('.b-menu');
                    nodes.$topSubMenu = header.find('.b-sub-menu');
                },

                initEvents: function () {

                    nodes.$topMenu.on('click', '.b-menu_link', function (e) {
                        e.preventDefault();
                        cars.setActiveCar($(e.target).data('id'));
                    });

                    nodes.$topSubMenu.on('mouseenter', '.b-menu_link', function (e) {
                        utils.mediator.publish('changeTitle', $(e.target).data('id'));
                    });

                    nodes.$topSubMenu.on('click', '.b-menu_link', function (e) {
                        e.preventDefault();
                        cars.setActivePicture($(e.target).data('id'));
                    });

                    utils.mediator.subscribe('changeCar', function (activeCar) {
                        this.renderSubMenu(activeCar.pictures);
                    }.bind(this));
                },

                init: function () {
                    this.findNodes();
                    this.render(data.cars);
                    this.initEvents();
                }
            };
        })();
    });

})(window.app.controllers, _, jQuery, window.app.models, window.app.utils, window.app.nodes);