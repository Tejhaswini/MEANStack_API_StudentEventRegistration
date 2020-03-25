import { Injectable } from '@angular/core';
import { HttpClient } from'@angular/common/http';
import { Student } from './student.model';


@Injectable({
  providedIn: 'root'
})
export class StudentService {

  selectedStudent : Student;
  selectedStudentPatch : Student;
  students : Student[];
  readonly baseURL = 'http://167.172.244.188:3000/students/';

  constructor(public http : HttpClient) { }

  postStudent(std : Student)
  {
     return this.http.post(this.baseURL,std);
  }
  getStudentList()
  {
    return this.http.get(this.baseURL);
  }

  putStudent(std : Student)
  {
    return this.http.put(this.baseURL + `${std._id}`, std);
  }

  deleteStudent(_id : string)
  {
    return this.http.delete(this.baseURL + `${_id}`);
  }

  patchStudent(std : Student)
  {
    return this.http.patch(this.baseURL +  `${std._id}`, std);
  }
}
