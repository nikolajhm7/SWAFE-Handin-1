import { Transaction } from "../transaction/transaction";

export interface CreditCard {
    cardNumber: number;
    cscCode: string;
    cardHolderName: string;
    expirationMonth: number;
    expirationYear: number;
    issuer: string;
    transactions: Transaction[];
}