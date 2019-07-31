import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
var StorageService = /** @class */ (function () {
    function StorageService(storage) {
        this.storage = storage;
        storage.keys().then(function (keys) {
            if (!keys.includes('messages')) {
                storage.set('messages', []);
            }
        });
    }
    StorageService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [Storage])
    ], StorageService);
    return StorageService;
}());
export { StorageService };
//# sourceMappingURL=storage.service.js.map