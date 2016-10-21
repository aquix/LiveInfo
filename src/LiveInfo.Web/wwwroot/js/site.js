const API_PATH = '/api/data';
const REQUEST_INTERVAL = 1000;

class AppViewModel {
    constructor() {
        this.data = ko.observable([]);
    }
}

class ItemViewModel {

}

let appViewModel = new AppViewModel();
ko.applyBindings(appViewModel);

let requestInterval = setInterval(() => {``
    fetch(API_PATH).then(res => {
        return res.json();
    }).then(data => {
        appViewModel.data(data);
    })
}, REQUEST_INTERVAL);
