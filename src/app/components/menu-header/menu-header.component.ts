import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { SiteService } from '../../http.service';

@Component({
  selector: 'app-menu-header',
  templateUrl: './menu-header.component.html',
  styleUrls: ['./menu-header.component.sass']
})
export class MenuHeaderComponent implements OnChanges {

  Menu: any = {};
  @Input() id_menu!: number;
  loading = false;

  constructor(private siteService : SiteService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['id_menu'] && this.id_menu) {
      this.getData();
    }
  }

 private getData() {
    this.loading = true;
    this.siteService.getMenuByid(this.id_menu).subscribe({
      next: data => {
        this.Menu = data[0];
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}
