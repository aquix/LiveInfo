const API_PATH = '/api/data';
const REQUEST_INTERVAL = 10000;
const ROW_WIDTH = 40;
const ANIMATION_TIME = 500;
const ANIMATION_STEP = 3;

class AppViewModel {
    constructor() {
        this.data = ko.observable([]);
    }
}

class ItemViewModel {
    constructor(id, name, rating) {
        this.id = id;
        this.rating = ko.observable(rating);
        this.ratingRise = ko.observable(rating);
        this.name = ko.observable(name);
        this.rank = ko.observable(0);
        this.rankRise = ko.observable(0);
        this.marginTop = ko.observable(0);
    }
}

function updateTable() {
    let items = appViewModel.data();
    items.sort((a, b) => b.rating() - a.rating());
    items.forEach((value, i) => {
        let item = items[i];
        let startPosition = item.marginTop();

        // Update rank
        let lastRank = item.rank();
        item.rank(i);
        item.rankRise(lastRank - item.rank());

        let endPosition =  (item.rank() + 1) * ROW_WIDTH;
        let animDirection = endPosition > startPosition ? 1 : -1;

        let animationTimer = setInterval(() => {
            item.marginTop(item.marginTop() + ANIMATION_STEP * animDirection);
            let currentPosition = item.marginTop();

            // End animation
            if ((currentPosition - endPosition) * animDirection > 0) {
                item.marginTop(endPosition);
                clearInterval(animationTimer);
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
        for (let item of appViewModel.data()) {
            let itemData = data.find(itemData => itemData.name == item.name());
            item.name(itemData.name);

            // Update rating
            let lastRating = item.rating();
            item.rating(itemData.rating);
            item.ratingRise(item.rating() - lastRating);
        }

        updateTable();
    });
}

let appViewModel = new AppViewModel();
ko.applyBindings(appViewModel);


initData();

let requestInterval = setInterval(() => {
    updateData();
}, REQUEST_INTERVAL);

window.addEventListener('focus', function() {
    updateData();
    requestInterval = setInterval(() => {
        updateData();
    }, REQUEST_INTERVAL);
});

window.addEventListener('blur', function() {
    clearInterval(requestInterval);
});