import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/admin.service';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-treatment-request',
  templateUrl: './treatment-request.component.html',
  styleUrls: ['./treatment-request.component.css']
})
export class TreatmentRequestComponent implements OnInit {
  constructor(public sharedService: SharedService, public adminservice: AdminService) { }


  x: any = localStorage.getItem("loginid")
  async ngOnInit() {
    if (this.x != null) {
      await this.sharedService.GetDoctorByLogInId(this.x)
      await this.sharedService.Getrequst(this.sharedService.DoctorByLoginId.doctodid)
    }
    else {
      this.sharedService.DoctorByLoginId.doctodid = null
    }

  }

  async accept(reqid: number, patid: number, doctodid: number) {
    let req: any = {
      "Reqid": reqid,
      "Status": 1
    }
    let accept: any = {
      Patientid: patid,
      Doctodid: doctodid
    }
    this.sharedService.Updatereq(req)
    await this.sharedService.accepted(accept)
    this.sharedService.Getrequst(this.sharedService.DoctorByLoginId.doctodid)

  }

  async reject(reqid: number) {
    await this.sharedService.DeleteReq(reqid)
    this.sharedService.Getrequst(this.sharedService.DoctorByLoginId.doctodid)
  }

}
