import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CreditCard } from "../interfaces/credit-card/credit-card";
import { CreateCreditCard } from "../interfaces/credit-card/create-credit-card";

const API = 'https://assignment1.swafe.dk/api';

@Injectable({ providedIn: 'root' })
export class CreditCardService{
    private http = inject(HttpClient);

    getAll(): Observable<CreditCard[]>{
        return this.http.get<CreditCard[]>(`${API}/CreditCard`);
    }

    getByCardNumber(cardNumber: number): Observable<CreditCard>{
        return this.http.get<CreditCard>(`${API}/CreditCard/cardnumber?cardnumber=${cardNumber}`)
    }

    add(card: CreateCreditCard){
        return this.http.post(`${API}/CreditCard`, card);
    }

    delete(cardNumber: number){
        return this.http.delete(`${API}/CreditCard/cardnumber?cardnumber=${cardNumber}`);
    }
}