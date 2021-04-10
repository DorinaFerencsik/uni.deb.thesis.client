import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-categorical-stat',
  templateUrl: './categorical-stat.component.html',
  styleUrls: ['./categorical-stat.component.scss'],
})
export class CategoricalStatComponent implements OnInit {

  @Input() stat: {
    type: string,
    count: number,
    unique: number,
    top: any, // depends on the type of column
    freq: number,
  };
  constructor() { }

  ngOnInit(): void {
  }

}
