(function (models, utils) {
    var carsData = {
        cars: [
            {
                carModel: 'Porsche',
                id: 0,
                pictures: [
                    {
                        name: 'Картинка 1.1',
                        id: 0,
                        link: './img/porsche_1.jpg'
                    },
                    {
                        name: 'Картинка 1.2',
                        id: 1,
                        link: './img/porsche_2.jpg'
                    },
                    {
                        name: 'Картинка 1.3',
                        id: 2,
                        link: './img/porsche_3.jpg'
                    }
                ]
            },
            {
                carModel: 'Maserati',
                id: 1,
                pictures: [
                    {
                        name: 'Картинка 2.1',
                        id: 0,
                        link: './img/maserati_1.jpg'
                    },
                    {
                        name: 'Картинка 2.2',
                        id: 1,
                        link: './img/maserati_2.jpg'
                    },
                    {
                        name: 'Картинка 2.3',
                        id: 2,
                        link: './img/maserati_3.jpg'
                    },
                    {
                        name: 'Картинка 2.4',
                        id: 3,
                        link: './img/maserati_4.jpg'
                    }
                ]
            },
            {
                carModel: 'Ferrari',
                id: 2,
                pictures: [
                    {
                        name: 'Картинка 3.1',
                        id: 0,
                        link: './img/ferrari_1.jpg'
                    },
                    {
                        name: 'Картинка 3.2',
                        id: 1,
                        link: './img/ferrari_2.jpg'
                    },
                    {
                        name: 'Картинка 3.3',
                        id: 2,
                        link: './img/ferrari_3.jpg'
                    },
                    {
                        name: 'Картинка 3.4',
                        id: 3,
                        link: './img/ferrari_4.jpg'
                    }
                ]
            }
        ],
        activeCar: {
            car: 0,
            picture: 0
        }
    };


    models.cars = {
        getData: function () {
            return carsData;
        },
        getActiveCar: function () {
            return carsData.cars[carsData.activeCar.car];
        },
        getActivePictures: function () {
            var car = this.getActiveCar();
            return car.pictures;
        },
        setActiveCar: function (activeCarIndex) {
            carsData.activeCar.car = activeCarIndex;
            utils.mediator.publish('changeCar', carsData.cars[activeCarIndex]);
        },
        setActivePicture: function (activePictureIndex) {
            var activeCar = carsData.activeCar;
            var car;
            activeCar.picture = activePictureIndex;
            car = carsData.cars[activeCar.car];
            utils.mediator.publish('changePicture', car.pictures[activeCar.picture]);
        }
    };


})(window.app.models, window.app.utils);