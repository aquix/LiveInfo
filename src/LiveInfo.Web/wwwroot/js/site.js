const API_PATH = '/api/data';
const REQUEST_INTERVAL = 3000;
const ROW_WIDTH = 40;
const ANIMATION_TIME = 500;
const ANIMATION_STEP = 2;

class AppViewModel {
    constructor() {
        this.data = ko.observable([]);
    }
}

class ItemViewModel {
    constructor(id, name, rating) {
        this.id = id;
        this.rating = ko.observable(rating);
        this.name = ko.observable(name);

        this.position = ko.observable(0);
        this.marginTop = ko.observable(0);
    }
}

function updateTable() {
    let items = appViewModel.data();
    items.sort((a, b) => b.rating() - a.rating());
    items.forEach((value, i) => {
        let startPosition = items[i].marginTop();
        items[i].position(i);
        let endPosition =  (items[i].position() + 1) * ROW_WIDTH;
        let animDirection = endPosition > startPosition ? 1 : -1;

        console.log('start ' + i);
        let animationTimer = setInterval(() => {
            console.log(i + ' ' + items[i].marginTop());
            items[i].marginTop(items[i].marginTop() + ANIMATION_STEP * animDirection);
            let currentPosition = items[i].marginTop();

            // End animation
            if ((currentPosition - endPosition) * animDirection > 0) {
                items[i].marginTop(endPosition);
                clearInterval(animationTimer);
                console.log('end ' + i);
            }
        }, 20)
    });

    appViewModel.data(items);
}

function initData() {
    fetch(API_PATH).then(res => {
        return res.json();
    }).then(data => {
        appViewModel.data(data.map(itemData => {
            return new ItemViewModel(itemData.id, itemData.name, itemData.rating);
        }));

        updateTable();
    });
}

function updateData() {
    fetch(API_PATH).then(res => {
        return res.json();
    }).then(data => {
        appViewModel.data().forEach(item => {
            let itemData = data.find(itemData => itemData.name == item.name());
            item.name(itemData.name);
            item.rating(itemData.rating);
        })

        updateTable();
    });
}

let appViewModel = new AppViewModel();
ko.applyBindings(appViewModel);


initData();

let requestInterval = setInterval(() => {``
    updateData();
}, REQUEST_INTERVAL);
