import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsMangeComponent } from './about-us-mange/about-us-mange.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { AllDoctorsComponent } from './all-doctors/all-doctors.component';
import { AllPatientComponent } from './all-patient/all-patient.component';
import { CategoryComponent } from './category/category.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { HomeManamgentComponent } from './home-manamgent/home-manamgent.component';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './main/main.component';
import { ProfileComponent } from './profile/profile.component';
import { QuestionsComponent } from './questions/questions.component';
import { ReportComponent } from './report/report.component';
import { TestimonilComponent } from './testimonil/testimonil.component';

const routes: Routes = [
  {
    path: "Report",
    component: ReportComponent
  },
  {
    path: "Main",
    component: MainComponent
  },
  {
    path: "Profile",
    component: ProfileComponent
  },
  {
    path: "AllDoctors",
    component: AllDoctorsComponent
  },
  {
    path: "AllPatient",
    component: AllPatientComponent
  },
  {
    path: "Testimonial",
    component: TestimonilComponent
  },
  {
    path: "Category",
    component: CategoryComponent
  },
  {
    path: "ContactUs",
    component: ContactUsComponent
  },
  {
    path: "AboutUs",
    component: AboutUsComponent
  },
  {
    path: "Home",
    component: HomeComponent
  },
  {
    path: "HomeManagment",
    component: HomeManamgentComponent
  },
  {
    path: "AboutUsMange",
    component: AboutUsMangeComponent
  },
  {
    path: "Questions",
    component: QuestionsComponent
  },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
