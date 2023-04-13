import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { SharedService } from './shared.service';
import Swal from 'sweetalert2'
@Injectable({
  providedIn: 'root'
})

export class AdminService {

  constructor(private http: HttpClient, private spinner: NgxSpinnerService, public sharedservice: SharedService) { }

  Doctors: any = []
  GetAllDoctors() {
    return new Promise<void>((resolve, reject) => {
      this.spinner.show()
      this.http.get("https://localhost:44373/API/Doctor/getalldoctor").subscribe(
        {
          next: (res: any) => {
            this.Doctors = res.filter((x: any) => x.doctodid != 21)
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



  DoctorsLevel: any = []
  GetAllDoctorsBylevel(level: number, catid: number) {
    return new Promise<void>((resolve, reject) => {
      this.spinner.show()
      this.http.get("https://localhost:44373/API/Doctor/getalldoctor").subscribe(
        {
          next: (res: any) => {
            this.DoctorsLevel = res.filter((d: any) => parseInt(d.level1) >= level && d.categoryid == catid)
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


  GetDocByName(name: string) {

    this.spinner.show()
    this.http.get("https://localhost:44373/API/Doctor/SearchByName/" + name).subscribe({

      next: (result) => {

        this.Doctors = result
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
    })
  }

  async createdoctor(Doctor: any) {

    Doctor.imagename = this.sharedservice.imageName;
    Doctor.Roleid = 2
    return new Promise<void>((resolve, reject) => {

      this.spinner.show()
      this.http.post("https://localhost:44373/api/Login/DoctorRegister", Doctor).subscribe(
        {
          next: (res) => {
            if (res == true) {
              this.spinner.hide();
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Added successfully',
                showConfirmButton: false,
                timer: 1500
              });
              resolve();
            }
            else {
              this.spinner.hide()
              Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Your Email or Username is ALredy Uesd !!',
                showConfirmButton: false,
                timer: 1500
              })
            }
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
            reject();
          }
        }
      )
    })
  }




  async UpdateDoctor(Doctor: any) {
    Doctor.roleid = 2
    if (this.sharedservice.imageName != "") {
      Doctor.imagename = this.sharedservice.imageName;
    }


    return new Promise<void>((resolve, reject) => {

      this.spinner.show();
      this.http.put("https://localhost:44373/API/Doctor/updatedoctor", Doctor).subscribe({
        next: () => {
          this.spinner.hide();
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Updated successfully',
            showConfirmButton: false,
            timer: 1500
          });
          resolve();

        },
        error: () => {
          this.spinner.hide();
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Something went wrong!',
            showConfirmButton: false,
            timer: 1500
          })
          reject();
        }

      })
    })
  }


  async UpdateAdminDoctor(Doctor: any) {
    if (this.sharedservice.imageName != "") {
      Doctor.imagename = this.sharedservice.imageName;
    }

    Doctor.categoryid = 4;
    Doctor.loginid = 101;
    Doctor.roleid = 1;

    return new Promise<void>((resolve, reject) => {

      this.spinner.show();
      this.http.put("https://localhost:44373/API/Doctor/updatedoctor", Doctor).subscribe({
        next: () => {
          this.spinner.hide();
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Updated successfully',
            showConfirmButton: false,
            timer: 1500
          });
          resolve();

        },
        error: () => {
          this.spinner.hide();
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Something went wrong!',
            showConfirmButton: false,
            timer: 1500
          })
          reject();
        }

      })
    })
  }


  async Deletedoctor(Doctor_id: number) {

    return new Promise<void>((resolve, reject) => {
      this.spinner.show
      this.http.delete("https://localhost:44373/api/Doctor/deletedoctor/" + Doctor_id).subscribe({

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





  DoctorBydocId: any
  async GetDoctorBydocId(doctorid: any) {
    return new Promise<void>((resolve, reject) => {
      this.spinner.show()
      this.http.get("https://localhost:44373/api/Doctor/getbyid/" + doctorid).subscribe(
        {
          next: (res) => {
            this.DoctorBydocId = res
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
            reject()
          }
        }
      )
    })
  }




  ContactUs: any = []
  getallContactUs() {
    this.spinner.show()
    this.http.get("https://localhost:44373/API/ContactUs/getallContactUs").subscribe(
      {
        next: (res) => {
          this.ContactUs = res
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



  createContactUs(ContactUs: any) {

    this.spinner.show()
    this.http.post("https://localhost:44373/api/ContactUs/createContactUs", ContactUs).subscribe(
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

  DeleteContactUs(Contact_id: number) {

    return new Promise<void>((resolve, reject) => {
      this.spinner.show()
      this.http.delete("https://localhost:44373/api/ContactUs/deleteContactUs/" + Contact_id).subscribe({
        next: () => {
          this.spinner.hide()
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Deleted successfully',
            showConfirmButton: false,
            timer: 1500
          })
          resolve();
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
          reject();
        }
      }
      )
    })
  }

  Payments: any = []
  GetAllPayment() {

    this.spinner.show()
    this.http.get("https://localhost:44373/api/Payment").subscribe(
      {

        next: (Result) => {
          this.Payments = Result;
          this.spinner.hide()
        },
        error: (Error) => {

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


  PaymentsbyPatid:any
  GetPaymentsbyPatid(id:number) {
    return new Promise<void>((resolve, reject) => {
    this.spinner.show()
    this.http.get("https://localhost:44373/api/payment/payment/"+id).subscribe(
      {

        next: (Result:any) => {
          this.PaymentsbyPatid = Result;
          this.spinner.hide()
          console.log(this.PaymentsbyPatid);
          
          resolve()
        },
        error: (Error) => {

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
    )})
  }





  CreatePayment(Payment: any) {

    this.spinner.show()
    this.http.post("https://localhost:44373/api/ContactUs/createContactUs", Payment).subscribe(
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


  Search(DateFome: any, Dateto: any) {

    this.spinner.show()
    this.http.get("https://localhost:44373/api/ResultTest/" + DateFome + "/" + Dateto).subscribe(
      {
        next: (res) => {
          this.reports = res
          this.spinner.hide()
          this.total = this.reports.reduce((sum: any, obj: any) => sum + obj.amount, 0)
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


  total: any
  reports: any = []
  getReport() {


    this.http.get("https://localhost:44373/api/payment/Report").subscribe({
      next: (res) => {
        this.reports = res
        this.spinner.hide()
        this.total = this.reports.reduce((sum: any, obj: any) => sum + obj.amount, 0)
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
    })
  }

}
