export declare class SlideDto {
    id: number;
    title: string;
    content: string;
    threadId: number;
    isPublished: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export declare class SlideDetailDto extends SlideDto {
    thread: {
        id: number;
        title: string;
    };
}
