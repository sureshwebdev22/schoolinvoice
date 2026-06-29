import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Parent } from './../models/parent';

@Injectable({
  providedIn: 'root'
})
export class ParentService {

   private headers = new HttpHeaders({

    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzY2hvb2xhZG1pbkBleGFtcGxlLmNvbSIsImlhdCI6MTc4MjcxOTgzNywiZXhwIjoxNzgyNzIwNzM3fQ.UsjO8x7-PZopLQzHVbXQNffnoBhuvXZLYihjK8yuvOE'

  });

  private apiUrl = 'http://localhost:8080/api/schooladmin/parents';

  constructor(private http: HttpClient) {}

  createParent(parent: Parent): Observable<any> {
    return this.http.post(this.apiUrl, parent, { headers: this.headers });
  }
 /* searchParent(parent: Parent): Observable<any> {
    return this.http.post(`${this.apiUrl}/search`, parent);
  } */
  searchParents(parent: Parent, page: number, size: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/search`, { ...parent, page, size },{headers : this.headers});
  }
}