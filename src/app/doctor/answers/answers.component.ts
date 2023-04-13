import { Component } from '@angular/core';
import { DoctorsService } from 'src/app/doctors.service';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.css']
})
export class AnswersComponent {
constructor(public doctorService:DoctorsService){}

id:any = this.doctorService.id
testnumber:any=this.doctorService.TestNumber

async ngOnInit(){
await this.doctorService.Getanswers(this.id,this.testnumber)
}


}
