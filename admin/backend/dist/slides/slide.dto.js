"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlideDetailDto = exports.SlideDto = void 0;
class SlideDto {
    id;
    title;
    content;
    threadId;
    createdAt;
    updatedAt;
}
exports.SlideDto = SlideDto;
class SlideDetailDto extends SlideDto {
    thread;
}
exports.SlideDetailDto = SlideDetailDto;
//# sourceMappingURL=slide.dto.js.map