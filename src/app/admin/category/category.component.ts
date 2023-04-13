import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {


  @ViewChild("CreateForm") Craete: any;
  @ViewChild("UpdateForm") Update: any;
  @ViewChild("DeleteForm") Delete: any;
  @ViewChild("DetailsForm") Details: any;




  constructor(public sharedservice: SharedService, public dialog: MatDialog) {

  }

  CreateCategoryForm = new FormGroup({

    // image : new FormControl("",[Validators.required]),
    categoryname: new FormControl("", [Validators.required]),
    abouttext: new FormControl("", [Validators.required]),


  })

  UpdateCategoryForm = new FormGroup({

    image : new FormControl(""),
    categoryid: new FormControl(""),
    categoryname: new FormControl("", [Validators.required]),
    abouttext: new FormControl("", [Validators.required]),


  })

  ngOnInit() {
    this.sharedservice.GetCategory();
    this.sharedservice.GetDoctorByLogInId(localStorage.getItem("loginid"))

  }



  // Create Category
  OpenCreateDialog() {
    this.dialog.open(this.Craete)
  }

  async CreateCategory() {
    await this.sharedservice.CreateCategoryAC(this.CreateCategoryForm.value);
    this.sharedservice.GetCategory();
  }

  UploadImage(Input:any){

    if (Input.files[0] != 0) {
      let UploadedImage = Input.files[0]; //ImageFile
      let formData = new FormData()   
      formData.append("fileForImage",UploadedImage)
      this.sharedservice.UploadCatgoryImage(formData)
    }
   
  }



  // Update Category
  async OpenUpdateDialog(cat_id: number) {
    await this.sharedservice.GetCategoryById(cat_id)
    this.UpdateCategoryForm.patchValue(this.sharedservice.CatById)
    this.dialog.open(this.Update)
  }

  async UpdateCategory() {

    await this.sharedservice.UpdateCategory(this.UpdateCategoryForm.value);
    this.sharedservice.GetCategory()

  }





  // Delete Category
  selectedCategory = 0;
  OpenDeleteDialog(Category_id: number) {
    this.selectedCategory = Category_id
    this.dialog.open(this.Delete)
  }

  async DeleteCategory() {
    await this.sharedservice.DeleteCategory(this.selectedCategory);
    this.sharedservice.GetCategory()

  }



  //Category Details
  async OpenDetailsDialog(cat_id:number){
    await this.sharedservice.GetCategoryById(cat_id) 
    this.dialog.open(this.Details)
  }












}