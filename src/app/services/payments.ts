import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class Payments {

   private apiUrl = 'http://localhost:8080/api/payments';

  constructor(private http: HttpClient) { }

  savePayment(payment: any): Observable<any> {
    return this.http.post(this.apiUrl, payment);
  }

  getPaymentHistory(invoiceId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/invoice/${invoiceId}`);
  }

}
