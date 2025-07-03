"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSlideDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_slide_dto_1 = require("./create-slide.dto");
class UpdateSlideDto extends (0, mapped_types_1.PartialType)(create_slide_dto_1.CreateSlideDto) {
}
exports.UpdateSlideDto = UpdateSlideDto;
//# sourceMappingURL=update-slide.dto.js.map