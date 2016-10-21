﻿const API_PATH = '/api/data';
const REQUEST_INTERVAL = 10;
const ROW_WIDTH = 40;

class AppViewModel {
    constructor() {
        this.data = ko.observable([]);
    }
}

class ItemViewModel {
    constructor(id, name, rating) {
        this.id = id;
        this.rating = rating;
        this.name = name;

        this.position = ko.observable(0);
        this.marginTop = ko.computed(() => `${(this.position() + 1) * ROW_WIDTH}px`);
    }
}

function updateTable() {
    let items = appViewModel.data();
    items.sort((a, b) => b.rating - a.rating);
    items.forEach((value, i) => {
        items[i].position(i);
    });

    appViewModel.data(items);
}

let appViewModel = new AppViewModel();
ko.applyBindings(appViewModel);

let requestInterval = setInterval(() => {``
    fetch(API_PATH).then(res => {
        return res.json();
    }).then(data => {
        appViewModel.data(data.map(itemData => {
            return new ItemViewModel(itemData.id, itemData.name, itemData.rating);
        }));

        updateTable();
    })

    clearInterval(requestInterval);
}, REQUEST_INTERVAL);
