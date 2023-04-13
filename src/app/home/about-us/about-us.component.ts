import { Component } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent {

  constructor(public shaerdService:SharedService){}

  async ngOnInit() {
   await this.shaerdService.GetAboutusByid(66)
  }
}
