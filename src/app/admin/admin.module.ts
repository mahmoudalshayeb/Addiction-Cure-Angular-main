import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ReportComponent } from './report/report.component';
import { MainComponent } from './main/main.component';
import { ProfileComponent } from './profile/profile.component';
import { SharedModule } from '../shared/shared.module';
import { AllDoctorsComponent } from './all-doctors/all-doctors.component';
import { TestimonilComponent } from './testimonil/testimonil.component';
import { AllPatientComponent } from './all-patient/all-patient.component';
import { CategoryComponent } from './category/category.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { HomeComponent } from './home/home.component';
import { HomeManamgentComponent } from './home-manamgent/home-manamgent.component';
import { AboutUsMangeComponent } from './about-us-mange/about-us-mange.component';
import {DataTablesModule} from 'angular-datatables';
import { BrowserModule } from '@angular/platform-browser';
import { QuestionsComponent } from './questions/questions.component';


@NgModule({
  declarations: [
    ReportComponent,
    MainComponent,
    ProfileComponent,
    AllDoctorsComponent,
    TestimonilComponent,
    AllPatientComponent,
    CategoryComponent,
    ContactUsComponent,
    AboutUsComponent,
    HomeComponent,
    HomeManamgentComponent,
    AboutUsMangeComponent,
    QuestionsComponent,
    
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    DataTablesModule,
  ]
})
export class AdminModule { }
