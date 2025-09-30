import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Transaction } from "../interfaces/credit-card/transaction";

const API = 'https://assignment1.swafe.dk/api';

@Injectable({ providedIn: 'root' })
export class TransactionsService {
    private http = inject(HttpClient);

    getTransactions(): Observable<Transaction[]>{
        return this.http.get<Transaction[]>(`${API}/Transaction`);
    }
}