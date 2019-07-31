import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
var NavigationService = /** @class */ (function () {
    function NavigationService(navCtrl) {
        this.navCtrl = navCtrl;
    }
    NavigationService.prototype.push = function (url, data) {
        if (data === void 0) { data = ''; }
        this.data = data;
        this.navCtrl.navigateForward('/' + url);
    };
    NavigationService.prototype.pop = function (url) {
        this.navCtrl.navigateBack('/' + url);
    };
    NavigationService.prototype.get = function (key) {
        return this.data[key];
    };
    NavigationService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [NavController])
    ], NavigationService);
    return NavigationService;
}());
export { NavigationService };
//# sourceMappingURL=navigation.service.js.map