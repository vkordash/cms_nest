import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.sass']
})
export class EditorComponent implements OnInit {

  text: string = 'sfgdsdsgdfg fdg dfg fdg rty 5m';

  constructor() { }

  ngOnInit(): void {
  }

  onTextChange() {
    console.log(this.text);
  }
}
