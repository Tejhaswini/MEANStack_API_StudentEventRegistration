import { Component, OnInit } from '@angular/core';
import { StudentService } from '../shared/student.service';
import { Student} from '../shared/student.model';
import { NgForm }  from '@angular/forms';
declare var M: any;

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
  providers : [StudentService]
})
export class StudentComponent implements OnInit {

  constructor(public studentService : StudentService) { }

  ngOnInit(): void {
    this.resetForm();
    this.refreshStudentList();
  }

  resetForm(form? : NgForm)
  {
    if(form)
    form.reset();
    this.studentService.selectedStudent = {
      _id : "",
      firstName :  "",
      lastName : "",
      degree : "",
      program : "",
      graduationYear : null,
      emailAddress : ""
    }
  }

  refreshStudentList()
  {
    this.studentService.getStudentList().subscribe((res) => {
    this.studentService.students = res as Student[];
  });
}

  onSubmit(form : NgForm)
  {
    if(form.value._id == "")
    {
      this.studentService.postStudent(form.value).subscribe((res) => {
      this.refreshStudentList();
      window.location.reload();
      this.resetForm(form);
      M.toast({html: 'Saved Student Details Successfully', classes : 'rounded'});
    });
    }
  else
  {
    this.studentService.putStudent(form.value).subscribe((res) => {
      this.refreshStudentList();
      this.resetForm(form);
      M.toast({html: 'Updated Student Details Successfully', classes : 'rounded'});
    });
  }
}
  onEdit(std  : Student)
  {
    this.studentService.selectedStudent = std;
  }

  onDelete(_id : string , form : NgForm)
     {
       if(confirm('Are you sure to delete this record?')== true)
       {
         this.studentService.deleteStudent(_id).subscribe((res) => {
           this.refreshStudentList();
           this.resetForm(form);
           M.toast({html: 'Deleted Successfully', classes : 'rounded'});
         });
       }
     }
}
