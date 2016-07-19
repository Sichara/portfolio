(function (controllers, _, $, models, utils, nodes) {
    $(function () {
        var cars = models.cars;
        var data = cars.getData();

        controllers.rightMenu = (function () {
            return {
                render: function (data) {
                    var template, rightMenu, subMenu;
                    template = _.template($('#rightMenuTemplate').html());

                    rightMenu = data.reduce(function (html, data) {
                        var $html;
                        $html = $(template(data));
                        subMenu = this.renderSubMenu(data.pictures);

                        $html.find('.b-sub-menu').append(subMenu);

                        html += $html.html();

                        return html;
                    }.bind(this), '');

                    nodes.$rightMenu.html(rightMenu);
                },

                renderSubMenu: function (data) {
                    var templateSub, subMenu;
                    templateSub = _.template($('#rightSubMenuTemplate').html());

                    subMenu = data.reduce(function (html, data) {
                        html += templateSub(data);
                        return html;
                    }, '');

                    return subMenu;
                },

                findNodes: function () {
                    var article = $('.b-article');
                    nodes.$rightMenu = article.find('.b-menu');
                },

                setActiveMenu: function (indexToActivate) {
                    var $menus = nodes.$rightMenu.children('.b-menu_link');
                    $menus.siblings('.b-sub-menu').removeClass('active');
                    $menus
                        .filter(function (index) {
                            return index === indexToActivate;
                        })
                        .next('.b-sub-menu')
                        .addClass('active');
                },

                initEvents: function () {
                    var $menus = nodes.$rightMenu.children('.b-menu_link');
                    var $subMenus = $menus.siblings('.b-sub-menu');

                    utils.mediator.subscribe('changeCar', function (activeCar) {
                        this.setActiveMenu(activeCar.id);
                    }.bind(this));

                    $menus.on('click', function (e) {
                        e.preventDefault();
                        cars.setActiveCar($(e.target).data('id'));
                    });

                    $subMenus.on('mouseenter', '.b-menu_link', function (e) {
                        utils.mediator.publish('changeTitle', $(e.target).data('id'));
                    });

                    $subMenus.on('click', '.b-menu_link', function (e) {
                        e.preventDefault();
                        cars.setActivePicture($(e.target).data('id'));
                    });
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