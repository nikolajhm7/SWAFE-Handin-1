import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Transaction } from "../interfaces/transaction/transaction";
import { CreateTransaction } from "../interfaces/transaction/create-transaction";

const API = 'https://assignment1.swafe.dk/api';

@Injectable({ providedIn: 'root' })
export class TransactionsService {
    private http = inject(HttpClient);

    getTransactions(): Observable<Transaction[]>{
        return this.http.get<Transaction[]>(`${API}/Transaction`);
    }

    deleteTransaction(uid: string){
        console.log('Deleting transaction', uid);
        return this.http.delete(`${API}/Transaction/uid?uid=${uid}`);
    }

    addTransaction(t: CreateTransaction): Observable<Transaction>{
        return this.http.post<Transaction>(`${API}/Transaction`, t);
    }
}