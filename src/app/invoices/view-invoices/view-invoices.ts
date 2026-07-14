import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Invoice } from '../../services/invoice';
import { Alertservice } from '../../services/alertservice';
import { timer } from 'rxjs/internal/observable/timer';

@Component({
  selector: 'app-view-invoices',
  imports: [ReactiveFormsModule , CommonModule],
  templateUrl: './view-invoices.html',
  styleUrl: './view-invoices.css',
})
export class ViewInvoices {

  invoices: any[] = [];

  ngOnInit(): void {

    }


  private router = inject(Router);
  private invoiceService = inject(Invoice);
  private alertService = inject(Alertservice);
  private cdr = inject(ChangeDetectorRef);
  invoiceSearchForm: FormGroup;
  hoverInvoice: any = null;

  constructor(private fb: FormBuilder) {

    this.invoiceSearchForm = this.fb.group({
      searchText: ['']
    });
  }


  searchText: string = '';

  page = 0;

  size = 10;

  totalPages = 0;

  totalElements = 0;

  loading = false;

  loadInvoices() {
    this.loading = true;
    timer(500).subscribe(() => {
      this.invoiceService
        .getInvoices(
          this.invoiceSearchForm.value.searchText
        )
        .subscribe((res: any) => {
          if (res && typeof res === 'object') {
            //     this.cdr.detectChanges();
            this.loading = false;
            this.invoices = [];
            this.invoices = (res as any).content;
            console.log('Invoices:', this.invoices);
            this.cdr.detectChanges();
            this.totalPages = (res as any).totalPages;
            this.totalElements = (res as any).totalElements;
            console.log('Invoices:', this.invoices.length);
             /* if (this.invoices.length === 0) {
                         

              this.alertService.warning('No invoices found');
            } */
          }
        });
    });
  }

  searchInvoices() {
    // this.invoices = [];
    this.page = 0;
    this.loadInvoices();
  }

  createInvoice() {
    this.router.navigateByUrl('/invoice/create');
  }

  nextPage() {
    if (this.page < this.totalPages - 1) {
      this.page++;
      this.loadInvoices();
    }
  }

  previousPage() {
    if (this.page > 0) {
      this.page--;
      this.loadInvoices();
    }
  }

  editInvoice(invoiceId: any) {
    this.router.navigate(['/edit-invoice', invoiceId]);
  }

  deleteInvoice(invoiceId: any) {
    
    this.invoiceService.deleteInvoice(invoiceId).subscribe({
      next: (response: any) => {
        this.cdr.detectChanges();
        this.loadInvoices();
      },
      error: (err) => {
        console.error(err);
        alert('Failed to delete invoice');
      }
    });
  }

  viewInvoice(invoiceId: any) {
    this.router.navigate(['/view-invoice/', invoiceId]);
  }





}
