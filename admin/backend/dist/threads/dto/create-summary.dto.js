"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSummaryDto = exports.SummaryStatus = void 0;
const class_validator_1 = require("class-validator");
var SummaryStatus;
(function (SummaryStatus) {
    SummaryStatus["PENDING"] = "pending";
    SummaryStatus["APPROVED"] = "approved";
    SummaryStatus["SAVED"] = "saved";
})(SummaryStatus || (exports.SummaryStatus = SummaryStatus = {}));
class CreateSummaryDto {
    title;
    content;
    status;
    notionUrl;
}
exports.CreateSummaryDto = CreateSummaryDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateSummaryDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateSummaryDto.prototype, "content", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(SummaryStatus),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateSummaryDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSummaryDto.prototype, "notionUrl", void 0);
//# sourceMappingURL=create-summary.dto.js.map