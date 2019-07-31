import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
var ScreenService = /** @class */ (function () {
    function ScreenService(toastCtrl) {
        this.toastCtrl = toastCtrl;
    }
    ScreenService.prototype.presentToast = function (msg) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var toast;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastCtrl.create({
                            message: msg,
                            duration: 2000
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    ScreenService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [ToastController])
    ], ScreenService);
    return ScreenService;
}());
export { ScreenService };
//# sourceMappingURL=screen.service.js.map