import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { StudentServices } from '../services/student-services';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs/operators';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Alertservice } from '../services/alertservice';
import { timer } from 'rxjs';




@Component({
  selector: 'app-students',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './students.html',
  styleUrl: './students.css',
})
export class Students implements OnInit {

  students: any[] = [];

  ngOnInit(): void {

    }


  private router = inject(Router);
  private studentService = inject(StudentServices);
  private alertService = inject(Alertservice);
  private cdr = inject(ChangeDetectorRef);
  studentSearchForm: FormGroup;

  constructor(private fb: FormBuilder) {

    this.studentSearchForm = this.fb.group({
      searchText: ['']
    });
  }


  searchText: string = '';

  page = 0;

  size = 10;

  totalPages = 0;

  totalElements = 0;

  loading = false;

  loadStudents() {
    this.loading = true;
    timer(500).subscribe(() => {
      this.studentService
        .getStudents(
          this.page,
          this.size,
          this.studentSearchForm.value.searchText
        )
        .subscribe((res: any) => {
          if (res && typeof res === 'object') {
            //     this.cdr.detectChanges();
            this.loading = false;
            this.students = [];
            this.students = (res as any).content;
            this.cdr.detectChanges();
            this.totalPages = (res as any).totalPages;
            this.totalElements = (res as any).totalElements;
          }
        });
    });
  }

  searchStudents() {
    // this.students = [];
    this.page = 0;
    this.loadStudents();
  }

  studentcreate() {
    this.router.navigateByUrl('/student/create');
  }

  nextPage() {
    if (this.page < this.totalPages - 1) {
      this.page++;
      this.loadStudents();
    }
  }

  previousPage() {
    if (this.page > 0) {
      this.page--;
      this.loadStudents();
    }
  }

  editStudent(studentId: any) {
    this.router.navigate(['/edit-student', studentId]);
  }

  deleteStudent(studentId: any) {
    /*
    this.studentService.deleteStudent(studentId).subscribe(() => {
  //this.loadStudents();
      
         //   alert('Student created successfully');
          this.alertService.success('Student Deleted successfully');
           this.router.navigate(['/students']);
  
        
    }); */
    this.studentService.deleteStudent(studentId).subscribe({
      next: (response: any) => {
        //  alert(response.message);
        this.cdr.detectChanges();
    //  this.alertService.warning('Student Deleted successfully');
      //this.router.navigate(['/students']);
        // Refresh the student list
            this.loadStudents();
      },
      error: (err) => {
        console.error(err);
        alert('Failed to delete student');
      }
    });
  }



}
