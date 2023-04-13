import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Toast } from 'ngx-toastr';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private route: Router) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {




      
    let token = localStorage.getItem("token")
    let user: any = localStorage.getItem("user")
    user = JSON.parse(user)





    if (token) 
    {

      if (state.url.includes("Admin"))
       {

       if (user.Role == 1) 
       {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Welcome on admin Dashboard',
          showConfirmButton: false,
          timer: 1500
        })
        return true;
       }
       else 
       {
         Swal.fire({
           position: 'center',
           icon: 'error',
           title: 'Unauthorized page!',
           showConfirmButton: false,
           timer: 1500
         })
         this.route.navigate([""])
         return false;
       }
      }



      if (state.url.includes("Doctor"))
       {

       if (user.Role == 2) 
       {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Welcome on Doctor Dashboard',
          showConfirmButton: false,
          timer: 1500
        })
        return true;
       }
       else 
       {
         Swal.fire({
           position: 'center',
           icon: 'error',
           title: 'Unauthorized page!',
           showConfirmButton: false,
           timer: 1500
         })
         this.route.navigate([""])
         return false;
       }
      }


      return true;


    }
    else 
    {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Unauthorized page!',
        showConfirmButton: false,
        timer: 1500
      })
      this.route.navigate([""])
      return false;
    }

  }

}
