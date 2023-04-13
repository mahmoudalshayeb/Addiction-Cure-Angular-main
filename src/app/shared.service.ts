import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import jwt_decode from 'jwt-decode';
import { PatientService } from './patient.service';
import { AdminService } from './admin.service';
import { DoctorsService } from './doctors.service';
import Swal from 'sweetalert2'
@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private patientService:PatientService,private route:Router,private http:HttpClient,private spinner:NgxSpinnerService , public doctorservice:DoctorsService) { }



id?:number
cat?:number
TestNumber?:number
Resultid?:number
retrive(id:number,cat:number){
this.id=id
this.cat=cat


}

SetTestNumber(testNumber:number,resultid:number){
this.TestNumber=testNumber
this.Resultid=resultid
}


  


Home:any={}
async GetAllHome()
{
  return new Promise<void>((resolve, reject) => {

  this.spinner.show()
  this.http.get("https://localhost:44373/api/home/getallHome").subscribe(
    {
        next:(res)=>{this.Home=res
        this.spinner.hide()
        resolve()
        },
        error:(err)=>{
        this.spinner.hide()
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Something went wrong!',
          showConfirmButton: false,
          timer: 1500
        })
      reject()}
    }
  )
  })
}


async UpdateHome(Home: any) {
  if (this.HomeImage!="") {
    Home.image1 = this.HomeImage
  }
  
  return new Promise<void>((resolve, reject) => {
    this.spinner.show()
    this.http.put("https://localhost:44373/API/home/updateHome", Home).subscribe(
      {
        next: () => {
          this.spinner.hide();
           Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Updated successfully',
          showConfirmButton: false,
          timer: 1500
        })
          resolve()
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
          reject()
        }
      }
    )
  })
}


HomeImage = ""
UploadHomeImage(ImageFile: any) {
  this.http.post("https://localhost:44373/API/home/uploadImage", ImageFile).subscribe({

    next: (res: any) => {
      this.HomeImage = res.image1
    },
    error: () => {}
  })
}
createhome(Home: any) {

  this.spinner.show()
  this.http.post("https://localhost:44373/api/Home/createHome", Home).subscribe(
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

HomeById:any
getHomeById(id:number){
  this.spinner.show()
  this.http.get("https://localhost:44373/api/Home/GetHomeById/"+id).subscribe({
    next:(res)=>{
      this.HomeById=res
      this.spinner.hide()
    },
    error:(err)=>{

      this.spinner.hide()      
    }
  })
}

AboutUs:any 
async GetAllAboutUs()
{
  return new Promise<void>((resolve, reject) => {

  this.spinner.show()
  this.http.get("https://localhost:44373/api/AboutUs/getallAboutUs").subscribe(
    {
        next:(res)=>{this.AboutUs=res
        this.spinner.hide()
        resolve()
        },
        error:(err)=>{
        this.spinner.hide()
         Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Something went wrong!',
          showConfirmButton: false,
          timer: 1500
        })
      reject()}
    }
  )
  })
}

AboutById:any
async GetAboutusByid(aboutid:any){
  return new Promise<void>((resolve, reject) => {
  this.spinner.show()
  this.http.get("https://localhost:44373/api/AboutUs/getAboutUsById/"+aboutid).subscribe(
    {
      next:(res)=>{this.AboutById=res
      localStorage.setItem('AboutById',JSON.stringify(res))
      this.spinner.hide()
      
      resolve()
    },
      error:(err)=>{
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
  )})
}


AboutUsImage = ""
UploadAboutUsImage(ImageFile: any) {
  this.http.post("https://localhost:44373/api/AboutUs/uploadImage", ImageFile).subscribe({

    next: (res: any) => {
      this.AboutUsImage = res.image
    },
    error: () => {}
  })
}

  async UpdateAboutUs(AboutUs: any) {
    if (this.AboutUsImage!="") {
      AboutUs.image = this.AboutUsImage
    }
    return new Promise<void>((resolve, reject) => {
      this.spinner.show()
      this.http.put("https://localhost:44373/api/AboutUs/updateAboutUs", AboutUs).subscribe(
        {
          next: () => {
            this.spinner.hide();
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Updated successfully',
              showConfirmButton: false,
              timer: 1500
            })
            resolve()
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
            reject()
          }
        }
      )
    })
}


async DeleteAbout(About_id: number) {

  return new Promise<void>((resolve, reject) => {
    this.spinner.show
    this.http.delete("https://localhost:44373/api/AboutUs/deleteAboutUs/"+About_id).subscribe({

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


Category:any=[]
GetCategory(){
  return new Promise<void>((resolve, reject) => {

  this.spinner.show()
  this.http.get("https://localhost:44373/api/Category/GetCategory").subscribe(
    {
      next:(res)=>{this.Category=res
      this.spinner.hide()
      resolve()
      },
      error:(err)=>{
      this.spinner.hide()
       Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Something went wrong!',
          showConfirmButton: false,
          timer: 1500
        })
        reject()}
    }
  )})
}


async CreateCategoryAC(Category: any) {
  Category.image = this.CategoryImage;
  return new Promise<void>((resolve, reject) => {
  this.spinner.show()
  this.http.post("https://localhost:44373/api/Category/Create", Category).subscribe(
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
        resolve()
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
        reject()
      }
    }
  )})

}

  CategoryImage = ""
  UploadCatgoryImage(ImageFile: any) {
    this.http.post("https://localhost:44373/api/Category/uploadImage", ImageFile).subscribe({

      next: (res: any) => {
        this.CategoryImage = res.image
      },
      error: () => {}
    })
  }

async UpdateCategory(Category: any) {
  if (this.CategoryImage!="") {
    Category.image = this.CategoryImage
  }
  
   
  return new Promise<void>((resolve, reject) => {

    this.spinner.show();
    this.http.put("https://localhost:44373/api/Category/Update", Category).subscribe({
      next: () => {
        this.spinner.hide();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Updated successfully',
          showConfirmButton: false,
          timer: 1500
        })
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

async DeleteCategory(Category_id: number) {

  return new Promise<void>((resolve, reject) => {
    this.spinner.show
    this.http.delete("https://localhost:44373/api/Category/DeleteById/"+Category_id).subscribe({

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


CatById:any
async GetCategoryById(catid:any){
  return new Promise<void>((resolve, reject) => {
  this.spinner.show()
  this.http.get("https://localhost:44373/API/Category/GetById/"+catid).subscribe(
    {
      next:(res)=>{this.CatById=res
      this.spinner.hide()
      resolve()
    },
      error:(err)=>{
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
  )})
}

Testemonial:any=[]
async GetAllTestemonial(){
    return new Promise<void>((resolve, reject) => {
      this.spinner.show()
      this.http.get("https://localhost:44373/API/Testimonials/GetAllTestemonial").subscribe(
        {
          next: (res) => {
            this.Testemonial = res
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

CreateTestimonialAC(Testimonial: any) {
  Testimonial.patientid=this.PatientById.patientid
  Testimonial.status="unPublish"
  this.spinner.show()
  this.http.post("https://localhost:44373/api/Testimonials/Create", Testimonial).subscribe(
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


Testimonialbyid:any
GetTestimonialByPatienId(TestimonialId:any){
 
  this.http.get("https://localhost:44373/API/Testimonials/GetTestimonialByPatienId/"+TestimonialId).subscribe(
    {
      next:(res)=>{this.Testimonialbyid=res
      this.spinner.hide()
      },
      error:(err)=>{
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



async DeleteTestemoiall(id: number) {

  return new Promise<void>((resolve, reject) => {
    this.spinner.show
    this.http.delete("https://localhost:44373/api/Testimonials/Delete/"+id).subscribe({

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







publish(TestimonialId:any){
  return new Promise<void>((resolve, reject) => {
  this.http.get("https://localhost:44373/API/Testimonials/publish/"+TestimonialId).subscribe(
    {
      next:()=>{
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Published successfully',
          showConfirmButton: false,
          timer: 1500
        })
      resolve()
      },
      error:(err)=>{
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
  )})
}



unpublish(TestimonialId:any){
  return new Promise<void>((resolve, reject) => {
  this.http.get("https://localhost:44373/API/Testimonials/unpublish/"+TestimonialId).subscribe(
    {
      next:()=>{
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Hide successfully',
          showConfirmButton: false,
          timer: 1500
        })
      resolve()},
      error:(err)=>{
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
  )})
}

async RegisterPatient(Register:any){
  Register.imagename="th (2).png"
  Register.roleid=2
  Register.doctorid=null
  Register.level1=null
  
  const header = {
    'Content-Type' : 'application/json',
    'Accept' : 'application/json'
  }
  
  const Options ={
    headers: new HttpHeaders(header)
  }
  return new Promise<void>((resolve, reject) => {

  this.spinner.show()
  this.http.post("https://localhost:44373/API/login/register",Register,Options).subscribe(
    {
      next:(res)=>{
        if(res==true){
        this.spinner.hide()
        resolve();
      }
      else
      {
        this.spinner.hide()
        Swal.fire({
           position: 'center',
           icon: 'error',
           title: 'Your Email or Username is ALredy Uesd !!',
           showConfirmButton: false,
           timer: 2500
         })
        }
     },
     error:(err)=>{

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


Login(user :any) 
{
const header = {
  'Content-Type' : 'application/json',
  'Accept' : 'application/json'
}
const Options ={
  headers: new HttpHeaders(header)
}
this.spinner.show()
this.http.post("https://localhost:44373/API/Login/login", user , Options).subscribe(
{
  next:(res:any)=>{

  let data : any = jwt_decode(res)

    localStorage.setItem('token' , res)
    localStorage.setItem('user' ,JSON.stringify(data))
    localStorage.setItem("loginid",data.loginid)
    var loginid = localStorage.getItem("loginid")?.toString()

    this.spinner.hide()
    if (data.Role == 3)
    {
      this.GetPatientById(data.loginid);
      this.route.navigate([""])
    }
    else if (data.Role == 2)
    {
     this.GetDoctorByLogInId(data.loginid)
     this.doctorservice.getResultByDocid(this.DoctorByLoginId.doctodid)
      this.route.navigate(["Doctor/Patient"])
    }
    else
    {
      localStorage.setItem('Role',data.Role)
      this.GetDoctorByLogInId(data.loginid)
      this.doctorservice.GetAllQuastionss();
      this.route.navigate(["Admin/Main"])
    }
    },  
    error:(err)=>{
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
)}

PatientById: any
  async GetPatientById(x?: string) {
    return new Promise<void>((resolve, reject) => {
      this.spinner.show()
      this.http.get("https://localhost:44373/api/Patient/loginid/" + x).subscribe(
        {
          next: (res:any) => {
            this.PatientById = res
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




DoctorByLoginId: any
  async GetDoctorByLogInId(Loginid: any) {
    return new Promise<void>((resolve, reject) => {
      this.spinner.show()
      this.http.get("https://localhost:44373/API/Doctor/getbyLoginID/" + Loginid).subscribe(
        {
          next: (res) => {

            this.DoctorByLoginId = res
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
createRequest(request:any){
  return new Promise<void>((resolve, reject) => {

    this.spinner.show()
    this.http.post("https://localhost:44373/API/Req",request).subscribe(
      {
        next:()=>{
          this.spinner.hide()
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Your request sent successfully , please wait till doctor accept your request',
            showConfirmButton: false,
            timer: 3000
          })
          resolve();
       },
       error:(err)=>{

        
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

request: any=[]
async Getrequst(doctorid: any) {
  return new Promise<void>((resolve, reject) => {
  this.spinner.show()
  this.http.get("https://localhost:44373/api/Req/doctor/" + doctorid).subscribe(
    {
      next: (res:any) => {     
        this.request = res.filter((d:any) => d.status == 0)
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


requestBypat:any
async GetrequstBypatid(patientid: any) {
  return new Promise<void>((resolve, reject) => {
  this.spinner.show()
  this.http.get("https://localhost:44373/api/Req/patient/" + patientid).subscribe(
    {
      next: (res:any) => {     
        this.requestBypat = res
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

 async Updatereq(req:any) {
  return new Promise<void>((resolve, reject) => {
    this.spinner.show()
    this.http.put("https://localhost:44373/API/req", req).subscribe(
      {
        next: () => {
          this.spinner.hide();
          resolve()
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
          reject()
        }
      }
    )
  })
}


async DeleteReq(id: number) {

  return new Promise<void>((resolve, reject) => {
    this.spinner.show
    this.http.delete("https://localhost:44373/api/Req/"+id).subscribe({

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


async accepted(req:any) {
  return new Promise<void>((resolve, reject) => {
    this.spinner.show()
    this.http.put("https://localhost:44373/API/req/accept", req).subscribe(
      {
        next: () => {
          this.spinner.hide();
          resolve()
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
          reject()
        }
      }
    )
  })
}




}