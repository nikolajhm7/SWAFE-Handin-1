export interface CreateTransaction {
    cardNumber: number;
    amount: number;
    currencyCode: string;
    transactionDate: string;
    comment?: string | null;
}