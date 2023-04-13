import { Component, ViewChild } from '@angular/core';
import { AdminService } from 'src/app/admin.service';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-all-category',
  templateUrl: './all-category.component.html',
  styleUrls: ['./all-category.component.css']
})
export class AllCategoryComponent {
  @ViewChild("details") Details: any;
  dialog: any;

  constructor(public sharedService: SharedService ,public adminService:AdminService) { }
  
  info = this.sharedService.Category.abouttext
  
  async ngOnInit() {
   await this.sharedService.GetCategory();
   this.showmore();
  }


  async openDetalisDialog(categryid: number) {

    await this.sharedService.GetCategoryById(categryid)
    this.dialog.open(this.Details);
  }

  showmore(){
    $(document).ready(function(){
      var zindex = 10;
      
      $("div.card").click(function(e){
        e.preventDefault();
    
        var isShowing = false;
    
        if ($(this).hasClass("show")) {
          isShowing = true
        }
    
        if ($("div.cards").hasClass("showing")) {
          // a card is already in view
          $("div.card.show")
            .removeClass("show");
    
          if (isShowing) {
            // this card was showing - reset the grid
            $("div.cards")
              .removeClass("showing");
          } else {
            // this card isn't showing - get in with it
            $(this)
              .css({zIndex: zindex})
              .addClass("show");
    
          }
    
          zindex++;
    
        } else {
          // no cards in view
          $("div.cards")
            .addClass("showing");
          $(this)
            .css({zIndex:zindex})
            .addClass("show");
    
          zindex++;
        }
        
      });
    });
  }
}
