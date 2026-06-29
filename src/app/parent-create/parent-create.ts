import { Component ,inject} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ParentService } from '../services/parent-service';

@Component({
  selector: 'app-parent-create',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './parent-create.html',
  styleUrls: ['./parent-create.css'],
})
export class ParentCreate {

  private parentService = inject(ParentService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  parentForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.parentForm = this.formBuilder.group({
      'fatherName': ['', Validators.required],
      'motherName': ['', Validators.required],
      'address': ['', Validators.required]
    });

}

createParent(): void {this.parentService.createParent(
      this.parentForm.value
    ).subscribe({
      next: (response:any) => {
        alert('tets')

       // alert("response.message");
        this.parentForm.reset();
      },
      
      error: (err) => {
        console.error(err);
      }
    });
}
}
