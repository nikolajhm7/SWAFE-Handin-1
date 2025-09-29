export interface CreateCreditCard {
    cardNumber: number;
    cscCode: number;
    cardHolderName: string;
    expirationMonth: number;
    expirationYear: number;
    issuer: string;
}