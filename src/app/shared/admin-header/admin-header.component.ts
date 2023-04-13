import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent {

constructor(private route : Router,private toster:ToastrService){

}


  
logout() {
  localStorage.clear();
  this.route.navigate(['/Auth/SignIn']);
}
Wtostar(){
  this.toster.toastrConfig.positionClass = 'toast-bottom-center';
  this.toster.info("See You Soon Admin")
}
}
