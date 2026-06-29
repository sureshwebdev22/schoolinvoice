import { Component, EventEmitter, Output, ChangeDetectorRef, inject } from '@angular/core';
import { ParentService } from '../services/parent-service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-parent-search',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './parent-search.html',
  styleUrls: ['./parent-search.css'],
})
export class ParentSearch {



  private parentService = inject(ParentService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  parentSearchForm: FormGroup;
  parents: any[] = [];
  page = 0;
  size = 10;
  totalPages = 0;

  private cdr = inject(ChangeDetectorRef);


  @Output()
  parentSelected = new EventEmitter<any>();


  constructor(private formBuilder: FormBuilder) {
    this.parentSearchForm = this.formBuilder.group({
      'fatherName': ['', Validators.required],
      'motherName': ['', Validators.required],
      'address': ['', Validators.required]
    });

  }

  searchParents() {
    this.parentService
    .searchParents(this.parentSearchForm.value, this.page, this.size)
    .subscribe(response => {
      this.parents = response.content;
      this.cdr.detectChanges();
      this.totalPages = response.totalPages;
      console.log(response);
    });
  }

  nextPage() {
    this.page++;
    this.searchParents();
  }

  previousPage() {
    if (this.page > 0) {
      this.page--;
      this.searchParents();
    }
  }


}
