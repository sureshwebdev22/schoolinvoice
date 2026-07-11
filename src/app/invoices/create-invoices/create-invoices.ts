import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Invoice } from '../../services/invoice';

@Component({
  selector: 'app-create-invoices',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-invoices.html',
  styleUrl: './create-invoices.css',
})
export class CreateInvoices implements OnInit {

  

  invoiceForm!: FormGroup;

  feeTypes = [
    'Tuition Fee',
    'Bus Fee',
    'Books',
    'Exam Fee',
    'Sports Fee'
  ];

  // Use a loose type here to avoid missing import for the invoice service
  constructor(private fb: FormBuilder, private invoiceService: Invoice) {}

  ngOnInit(): void {

    this.invoiceForm = this.fb.group({

      invoiceNumber: [{value:'INV-2026-000001', disabled:true}],
      invoiceDate: [new Date().toISOString().substring(0,10)],
      dueDate: ['', Validators.required],

      studentId: ['1'],
      admissionNo: [''],
      studentName: [''],
      className: [''],
      parentName: [''],

      invoiceItems: this.fb.array([]),

      remarks: ['']
    });

    this.addFeeItem();
  }

  get invoiceItems(): FormArray {
    return this.invoiceForm.get('invoiceItems') as FormArray;
  }

  addFeeItem() {

    this.invoiceItems.push(
      this.fb.group({
        feeType: ['', Validators.required],
        amount: [0],
        discount: [0],
        total: [{value:0, disabled:true}]
      })
    );
  }

  removeFeeItem(index:number){
    this.invoiceItems.removeAt(index);
    this.calculateTotal();
  }

  calculateTotal(){

    this.invoiceItems.controls.forEach(control=>{

      const amount = Number(control.get('amount')?.value);
      const discount = Number(control.get('discount')?.value);

      control.get('total')?.setValue(amount-discount,{emitEvent:false});

    });

  }

  get grandTotal():number{

    let total=0;

    this.invoiceItems.controls.forEach(control=>{

      total += Number(control.get('total')?.value);

    });

    return total;
  }

  saveInvoice(){

    console.log('input '+JSON.stringify(this.invoiceForm.getRawValue()));
    this.invoiceService.createInvoice(this.invoiceForm.getRawValue()).subscribe({
      next: (response:any) => {
        console.log('Invoice created successfully:', response);
      },
      error: (error:any) => {
        console.error('Error creating invoice:', error);
      }
    });

  }
}
