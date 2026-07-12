import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Invoice {
 // private apiUrl = '/api/invoices';
    private apiUrl = 'http://localhost:8080/api/schooladmin/invoices';


  constructor(private http: HttpClient) {}

  createInvoice(invoice: Invoice): Observable<Invoice> {
    return this.http.post<Invoice>(
      this.apiUrl,
      invoice
    );
  }

  getNextInvoiceNumber(): Observable<{ nextInvoiceNumber: string }> {
    return this.http.get<{ nextInvoiceNumber: string }>(`${this.apiUrl}/next-number`);
  }
}
