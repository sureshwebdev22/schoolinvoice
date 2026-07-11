import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentServices } from '../../services/student-services';

@Component({
  selector: 'app-view-student',
  imports: [ReactiveFormsModule],
  templateUrl: './view-student.html',
  styleUrl: './view-student.css',
})
export class ViewStudent {

 studentForm: FormGroup;
 
  student: any = {};
  private studentService = inject(StudentServices);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  constructor(private formBuilder: FormBuilder) {
    this.studentForm = this.formBuilder.group({
      'admissionNo': ['', Validators.required],
      'firstName': ['', Validators.required],
      'lastName': ['', Validators.required],
      'gender': ['', Validators.required],
      'className': ['', Validators.required],
      'sectionName': [''],
      'fullName': [''],
    //  'parentId': [''],
      // 'parentName': [''],
      'status': ['']
    });

    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.studentService.getStudentById(id)
      .subscribe({
        next: (data: any) => {
          this.student = data;
          console.log(this.student);
          this.studentForm.setValue({
            'admissionNo': this.student.admissionNo,
            'firstName': this.student.firstName,
            'lastName': this.student.lastName,
            'gender': this.student.gender,
            'className': this.student.className,
            'sectionName': this.student.sectionName,
            'status': this.student.status,
       //     'parentId': this.student.parentId,
             'fullName': this.student.fullName,
          });
        },
        error: (err: any) => {
          console.error(err);
        }
      });
  }

  addInvoice():void {
    const studentId = this.student.id;
    this.router.navigate(['/invoices/create'], { queryParams: { studentId } });
  }

}
