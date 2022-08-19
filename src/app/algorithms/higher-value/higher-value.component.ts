import { Component, OnInit } from '@angular/core';
import { RangeValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-higher-value',
  templateUrl: './higher-value.component.html',
  styleUrls: ['./higher-value.component.css']
})
export class HigherValueComponent implements OnInit {

  constructor() { }

   valueA = 0;
   valueB = 0;


  ngOnInit(): void {
  }

  outputA () {
    this.valueA = (this.valueA + this.valueB)/ 2;
    console.log(this.valueA);
    this.valueB =  this.valueA - Math.abs(this.valueA - this.valueB);
    console.log(this.valueB);
    this.valueA = this.valueB - 2*(this.valueB - this.valueA);
    console.log(this.valueA);
  }

}
