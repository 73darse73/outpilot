"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThreadDetailDto = exports.ThreadDto = void 0;
class ThreadDto {
    id;
    title;
    createdAt;
    updatedAt;
    _count;
}
exports.ThreadDto = ThreadDto;
class ThreadDetailDto extends ThreadDto {
    messages;
    summaries;
}
exports.ThreadDetailDto = ThreadDetailDto;
//# sourceMappingURL=thread.dto.js.map