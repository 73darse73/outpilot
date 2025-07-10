export declare enum SummaryStatus {
    PENDING = "pending",
    APPROVED = "approved",
    SAVED = "saved"
}
export declare class CreateSummaryDto {
    title: string;
    content: string;
    status: SummaryStatus;
    notionUrl?: string;
}
