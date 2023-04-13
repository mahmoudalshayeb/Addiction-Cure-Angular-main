import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from './admin.service';
import { SharedService } from './shared.service';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http: HttpClient, private spinner: NgxSpinnerService,private tost:ToastrService) {

  }

  Patient: any


  GetAllPatient() {
    this.spinner.show()
    this.http.get("https://localhost:44373/api/Patient/getallPatient").subscribe(
      {
        next: (res) => {
          this.Patient = res
          this.spinner.hide()

        },
        error: (err) => {

          this.spinner.hide()
           Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Something went wrong!',
          showConfirmButton: false,
          timer: 1500
        })
        }
      }
    )
  }


  ResultByPatid:any
  async getResultByPatid(id:number){
    return new Promise<void>((resolve, reject) =>  {
  
    this.spinner.show()
    this.http.get("https://localhost:44373/API/ResultTest/ByPatid/"+id).subscribe({
      next:(res)=>{
        this.ResultByPatid=res
        this.spinner.hide()
        resolve()
      },
      error:(err)=>{

        this.spinner.hide()
        reject()      
      }
    })
  })
  }
  




  createpatient(Patient: any) {

    this.spinner.show()
    this.http.post("https://localhost:44373/api/Patient/createPatient", Patient).subscribe(
      {
        next: () => {
          this.spinner.hide();
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Added successfully',
            showConfirmButton: false,
            timer: 1500
          })
        },
        error: (error) => {
          this.spinner.hide();
           Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Something went wrong!',
          showConfirmButton: false,
          timer: 1500
        })
        }
      }
    )

  }

  PatientBypateinId: any
  async GetPatientBypateinId(patientid: any) {
    return new Promise<void>((resolve, reject) => {
      this.spinner.show()
      this.http.get("https://localhost:44373/api/Patient/getbyid/" + patientid).subscribe(
        {
          next: (res) => {
            this.PatientBypateinId = res
            this.spinner.hide()
            resolve()
          },

          error: (err) => {

            this.spinner.hide()
             Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Something went wrong!',
          showConfirmButton: false,
          timer: 1500
        })
          }
        }
      )
    })
  }

  async DeletePatient(patientid: number) {
    return new Promise<void>((resolve, reject) => {
      this.http.delete("https://localhost:44373/api/Patient/deletePatient/" + patientid).subscribe(
        {
          next: () => {
            this.spinner.hide()
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Deleted successfully',
              showConfirmButton: false,
              timer: 1500
            })
            resolve()
          },
          error: () => {
            this.spinner.hide()
             Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Something went wrong!',
          showConfirmButton: false,
          timer: 1500
        })
            reject()
          }
        }
      )
    })
  }
 
  
imageName = ""
UploadImage(imageFile : any) 
{
  this.http.post("https://localhost:44373/API/login/uploadImage",imageFile).subscribe(
    {
      next:(res:any)=>{this.imageName = res.imagename},
      error:()=>{}
    }
  )
}

  async UpdatePatient(Patient: any) {
    if (this.imageName!="") {
      Patient.imagename=this.imageName
    }
    Patient.roleid=3;
    return new Promise<void>((resolve, reject) => {
      this.spinner.show()
      this.http.put("https://localhost:44373/api/Patient/updatePatient", Patient).subscribe(
        {
          next: () => {
            this.spinner.hide()
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Updated successfully',
              showConfirmButton: false,
              timer: 1500
            })
            resolve()
          },
          error: (err) => {

            this.spinner.hide()
             Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Something went wrong!',
          showConfirmButton: false,
          timer: 1500
        })
          }
        }
      )
    })
  }

  QuastionsByCategoryId: any
  async GetQuastionByCategoryId(quastionID: any) {
    return new Promise<void>((resolve, reject) => {
      this.spinner.show()
      this.http.get("https://localhost:44373/API/Quastion/GetQUASTIONBYID/" + quastionID).subscribe(
        {
          next: (res:any) => {
            this.QuastionsByCategoryId = res
            this.spinner.hide()
            resolve()
          },
          error: (err) => {

            this.spinner.hide()
             Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Something went wrong!',
          showConfirmButton: false,
          timer: 1500
        })
          }
        }
      )
    })
  }


  QuastionsByPatId: any
  QuastionsByTestNumber:any
  async GetQuastionsByPatId(patientid: any , Testnumber:any) {
    return new Promise<void>((resolve, reject) => {
      this.spinner.show()
      this.http.get("https://localhost:44373/API/Test/getByPatID/" + patientid).subscribe(
        {
          next: (res:any) => {
            this.QuastionsByPatId = res
            this.QuastionsByTestNumber=res.filter((x:any)=>x.testNumber==Testnumber)
            this.spinner.hide()
            resolve()
          },
          error: (err) => {
            this.spinner.hide()
             Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Something went wrong!',
          showConfirmButton: false,
          timer: 1500
        })
          }
        }
      )
    })
  }




  PaymentTest: any
  async CreateInvoce(Pay: any) {
    return new Promise<void>((resolve, reject) => {
      this.http.post("https://localhost:44373/API/invoicepayment/pay/", Pay).subscribe({
        next: (res) => {
          if(res == true){
          this.PaymentTest = res 
          console.log(res);
          
          resolve()}
          else{
            this.spinner.hide()
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'The card number is not a valid credit card number!',
              showConfirmButton: false,
              timer: 1500
            })

            resolve()}
        },        
        error: (err) => {          

          reject()
        }
      })
    })
  }


  CreateTest(Test: any) {
    this.http.post("https://localhost:44373/api/Test", Test).subscribe(
      {

        next: () => {

        },
        error: (error) => {
           Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'You should write test number above!',
          showConfirmButton: false,
          timer: 1500
        })


        }
      }
    )

  }


 Createpayment(pay: any) {
    this.spinner.show()
    this.http.post("https://localhost:44373/api/Payment", pay).subscribe(
      {

        next: () => {
          this.spinner.hide();

        },
        error: (error) => {
          this.spinner.hide();
           Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Something went wrong!',
          showConfirmButton: false,
          timer: 1500
        })

        }
      }
    )

  }
  UpdateLevel(id:number,level:string) {
    this.http.get("https://localhost:44373/api/Patient/level/"+id+"/"+level).subscribe({
      next: () => { },
      error: (err) => {  },
    })
  }

  UpdateStatus(id:number,Status:number) {
    this.http.get("https://localhost:44373/api/Test/updateStatus/"+id+"/"+Status).subscribe({
      next: () => { },
      error: (err) => { },
    })
  }

  Afterquiz(id:any,result:number) {
    this.http.get("https://localhost:44373/api/ResultTest/afterquiz/"+id+"/"+result).subscribe({
      next: () => { },
      error: (err) => {  },
    })
    debugger
  }




}
