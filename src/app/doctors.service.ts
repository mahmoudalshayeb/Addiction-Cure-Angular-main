import { Injectable } from '@angular/core';
import {  HttpClient, HttpHeaders } from '@angular/common/http';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2'
@Injectable({
  providedIn: 'root'
})
export class DoctorsService {
  patchValue(ResultTestById: any) {
    throw new Error('Method not implemented.');
  }

  constructor(private http:HttpClient,private spinner:NgxSpinnerService) { }

Quastions:any=[]
GetAllQuastions(id:number)
{
  this.spinner.show()
  this.http.get("https://localhost:44373/API/Quastion/GetQuastions/"+id).subscribe(
    {
      next:(res)=>{this.Quastions=res
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
        })}
    }
  )
}




async CreateQuastion(Quastion: any) {
   return new Promise<void>((resolve,reject)=>{
  this.spinner.show()
  this.http.post("https://localhost:44373/api/Quastion", Quastion).subscribe(
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
  )
})
}


 questionss : any =[]
 async GetAllQuastionss(){
  return new Promise<void>((resolve,reject)=>{
  this.spinner.show()
  this.http.get("https://localhost:44373/api/Quastion/GetAllQuestionss").subscribe({
    next:(result)=>{
     this.questionss=result;
     this.spinner.hide()
     resolve()
    },
    error:(error)=>{
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
  })
})
 }


 TestNumber?:number
 id?:number

 answer(id:number , testNumber:number){
  this.TestNumber=testNumber
  this.id=id;
 }

 async DeleteQuestion(id:number){
  return new Promise<void>((resolve,reject)=>{
    this.http.delete("https://localhost:44373/api/Quastion/delete/"+id).subscribe({
    next:()=>{
      this.spinner.hide(),
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Deleted successfully',
        showConfirmButton: false,
        timer: 1500
      })
      resolve()

    },
    error:(error)=>{

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
  })
})
 }


AllResult:any=[]
GetAllResult()
{
  this.spinner.show()
  this.http.get("https://localhost:44373/API/ResultTest/GetAllResult").subscribe(
    {
        next:(res)=>{this.AllResult=res
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
        })}
    }
  )
}



async CreateResult(result: any) {
  return new Promise<void>((resolve,reject)=>{
 this.spinner.show()
 this.http.post("https://localhost:44373/api/ResultTest", result).subscribe(
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
 )
})
}



ResultTestById:any
async getResultTestById(id:number){
  return new Promise<void>((resolve, reject) =>  {

  this.spinner.show()
  this.http.get("https://localhost:44373/API/ResultTest/byid/"+id).subscribe({
    next:(res)=>{
      this.ResultTestById=res
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


ResultByDocid:any
async getResultByDocid(id:number){
  return new Promise<void>((resolve, reject) =>  {

  this.spinner.show()
  this.http.get("https://localhost:44373/API/ResultTest/Bydocid/"+id).subscribe({
    next:(res)=>{
      this.ResultByDocid=res
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





async UpdateResultTest(ResultTest:any){
  const header = {
    'Content-Type' : 'application/json',
    'Accept' : 'application/json'
  }
  
  const Options ={
    headers: new HttpHeaders(header)
  }
  return new Promise<void>((resolve, reject) =>  {
    this.spinner.show()
    this.http.put("https://localhost:44373/API/ResultTest",ResultTest).subscribe({
      next:()=>{
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

    })

  })
   

}


Search(DateFome:any,Dateto:any)
{
  this.spinner.show()
  this.http.get("https://localhost:44373/api/ResultTest/"+DateFome+"/"+Dateto).subscribe(
    {
        next:(res)=>{this.AllResult=res
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
        })}
    }
  )
}


Test:any=[]
GetAllTest()
{
  this.spinner.show()
  this.http.get("https://localhost:44373/api/Test").subscribe(
    {
        next:(res)=>{this.Test=res
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
        })}
    }
  )
}

answers:any=[]
async Getanswers(id:number , testnumber:number)
{
  return new Promise<void>((resolve, reject) =>  {
  this.spinner.show()
  this.http.get("https://localhost:44373/API/Test/Getanswer/"+id+"/"+testnumber).subscribe(
    {
        next:(res)=>{
        this.answers=res
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
        })}
    }
  )})
}

patientbydoctorid:any=[]
async getpatientbydoctorid(DoctorId:number)
{
  return new Promise<void>((resolve, reject) =>  {
  this.spinner.show()
  this.http.get("https://localhost:44373/api/Patient/getbydoctorid/"+DoctorId).subscribe(
  {
    next:(res :any)=>{
      this.patientbydoctorid = res;
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
    }
  }
  )
})
}

async SendEmail(EmailBody: any) {
 this.http.post("https://localhost:44373/API/DoctorEmail/DoctorEmail", EmailBody).subscribe(
   {
     next: () => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: ' Sent successfully',
        showConfirmButton: false,
        timer: 1500
      })
     },
     error: (error) => {
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

}