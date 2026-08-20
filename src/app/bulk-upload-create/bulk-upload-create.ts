import { Component, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bulk-upload-create',
  imports: [CommonModule],
  templateUrl: './bulk-upload-create.html',
  styleUrl: './bulk-upload-create.css',
})
export class BulkUploadCreate {

    constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

progress = 0;
uploading = false;
message = '';

upload(event: any) {

  const file = event.target.files[0];

  const formData = new FormData();

  formData.append('file', file);

  this.uploading = true;

  this.http.post<{jobId:string}>(
      'http://localhost:8080/api/schooladmin/upload/user',
      formData
  ).subscribe(res => {
    console.log('Upload response:', res);
      this.pollProgress(res.jobId);

  });

}

pollProgress(jobId:string){
console.log('Polling progress for jobId:', jobId);
   const timer = setInterval(()=>{

      this.http.get<any>(
          'http://localhost:8080/api/schooladmin/progress/'+jobId
      ).subscribe(progress=>{
        console.log('Progress response:', progress);

          this.progress = progress.percentage;
          this.cdr.detectChanges();

          if(progress.status==='COMPLETED'){

             clearInterval(timer);

             this.uploading=false;

             this.message="Upload Completed";
             this.cdr.detectChanges();
             console.log('Upload completed successfully.');

          }

      });

   },1000);

}
}