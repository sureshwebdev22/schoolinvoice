import { Component ,inject } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentServices } from '../../services/student-services';
import { ParentSearch } from '../../parent-search/parent-search';
import { ParentService } from '../../services/parent-service';
import { SearchParent } from '../../parent/search-parent/search-parent';
import { Alertservice } from '../../services/alertservice';

@Component({
  selector: 'app-create-student',
  imports: [CommonModule, ReactiveFormsModule , SearchParent],
  templateUrl: './create-student.html',
  styleUrl: './create-student.css',
})
export class CreateStudent {

  

  student: any = {};
  private studentService = inject(StudentServices);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private alertService =inject(Alertservice);
  studentForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.studentForm = this.formBuilder.group({
      'admissionNo': ['', Validators.required],
      'firstName': ['', Validators.required],
      'lastName': ['', Validators.required],
      'gender': ['', Validators.required],
      'className': ['', Validators.required],
      'sectionName': [''],
      'status': [''],
      'parentId': [''],
      'parentName':['']
    });


  /*  const id = Number(this.route.snapshot.paramMap.get('id'));
    this.studentService.getStudentById(id)
      .subscribe({
        next: (data :any) => {
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
            'parentId': this.student.parentId,
            'parentName': this.student.parentName
          });
        },
        error: (err: any) => {
          console.error(err);
        }
      }); */
  }

  createStudent(): void {
    this.studentService
      .createStudent(this.studentForm.value)
      .subscribe({
        next: () => {
       //   alert('Student created successfully');
         this.alertService.success('Student created successfully');
          this.router.navigate(['/students']);
        },
        error: (err: any) => {
          console.error(err);
        }
      });
  }

  ngOnInit(): void {
    
  }

  searchParent(): void {
    const searchTerm = this.studentForm.get('search')?.value;
    this.studentService.getStudents(1, 10, searchTerm).subscribe({
      next: (data: any) => {
        console.log(data);
        // Handle the search results here
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }


onParentSelected(parent: any) {

    console.log("Selected Parent:", parent);


  this.studentForm.patchValue({
    parentId: parent.parentId,
    parentName:parent.fatherName +"," + parent.motherName
  });

}
}
