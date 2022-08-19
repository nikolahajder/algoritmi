import { Component, OnInit } from '@angular/core';
import { provideRoutes } from '@angular/router';

@Component({
  selector: 'app-swap-value',
  templateUrl: './swap-value.component.html',
  styleUrls: ['./swap-value.component.css']
})
export class SwapValueComponent implements OnInit {

  constructor() { }

  prvaVrednost: number = 0;
  drugaVrednost: number = 0;

  ngOnInit(): void {
    this.prvaVrednost = 0;
    this.drugaVrednost = 0;
  }

  swapValues() {
    this.prvaVrednost = this.prvaVrednost + this.drugaVrednost;
    this.drugaVrednost = this.prvaVrednost - this.drugaVrednost;
    this.prvaVrednost = this.prvaVrednost - this.drugaVrednost;
  }

}
