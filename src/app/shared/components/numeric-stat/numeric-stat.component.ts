import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-numeric-stat',
  templateUrl: './numeric-stat.component.html',
  styleUrls: ['./numeric-stat.component.scss'],
})
export class NumericStatComponent implements OnInit {

  @Input() stat: {
    count: number,
    mean: number,
    std: number,
    min: number,
    '25%': number,
    '50%': number,
    '75%': number,
    max: number
  };

  constructor() { }

  ngOnInit(): void {
  }

}
