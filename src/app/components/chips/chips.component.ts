import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { SiteService } from '../../http.service';

@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.sass']
})
export class ChipsComponent implements OnInit {

  @Input() component_id: number =0;
  
  @Input() chips_id: number=0;
 

  Chips: string[] = [];
  constructor(private siteService : SiteService) { }

  ngOnInit() {     
    this.getDataChips();                     
  }
  
 ngOnChanges(): void {
      this.getDataChips();    
  }


  getDataChips(): void {
    let s = this.siteService.getTags(this.chips_id, this.component_id).subscribe(dataChips => { 
        this.Chips = [...dataChips];
        s.unsubscribe(); 
    }); 
  }

  chipDelete(event:any,id:number,component_id:number){
    var name = event.value.trim().toUpperCase();
    let s = this.siteService.delLinkTag(this.chips_id, component_id, name).subscribe(dataChips => { 
      this.Chips = [...dataChips];
      s.unsubscribe(); 
    }); 
  }

  chipAdd(event:any,id:number,component_id:number){
    var name = event.value.trim().toUpperCase();
    let s = this.siteService.addLinkTag(id, component_id, name).subscribe(dataChips => { 
      this.Chips = [...dataChips];
      s.unsubscribe(); 
    });     
  }
}
