import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminService } from 'src/app/admin.service';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-category-home',
  templateUrl: './category-home.component.html',
  styleUrls: ['./category-home.component.css']
})
export class CategoryHomeComponent {
  constructor(private spinner: NgxSpinnerService,public shaerdService:SharedService) {}
  
  name:any = new FormControl('');
  
  ngOnInit() {
    this.shaerdService.GetCategory();
  }
}
