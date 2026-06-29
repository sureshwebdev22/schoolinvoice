import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class StudentServices {
  private apiUrl = 'http://localhost:8080/api/students';

  constructor(private http: HttpClient) { }

  getStudents(
    page: number,
    size: number,
    search: string
  ) {

    return this.http.get<any>(
      `${this.apiUrl}?page=${page}&size=${size}&search=${search}`
    );
  }

  getStudentById(id: number) {
  return this.http.get<any>(
    `http://localhost:8080/api/students/${id}`
  );
}

updateStudent(id: number, student: any) {
  return this.http.put(
    `http://localhost:8080/api/students/${id}`,
    student
  );  

}
createStudent(student: any) {
  return this.http.post(
    `http://localhost:8080/api/students`,
    student
  );
}
deleteStudent(id: number) {
  return this.http.delete(
    `http://localhost:8080/api/students/${id}`
  );
}
}
