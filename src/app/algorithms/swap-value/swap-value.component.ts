import { Component, OnInit } from '@angular/core';
import { AlgorithmsService } from '../algorithms.service';

@Component({
  selector: 'app-swap-value',
  templateUrl: './swap-value.component.html',
  styleUrls: ['./swap-value.component.css']
})
export class SwapValueComponent implements OnInit {

  prvaVrednost: number;
  drugaVrednost: number;
  _filetext: string;
  tsURL: string;

  constructor(private algorithmService: AlgorithmsService) {
    this.prvaVrednost = 0;
    this.drugaVrednost = 0;
    this._filetext = "";
    this.tsURL = '/swap-value/swap-value.component.ts';
  }

  ngOnInit(): void {
    this.algorithmService.showCode(this.tsURL).then((value) => {
      this._filetext = value;
    })
  }

  swapValues() {
    this.prvaVrednost = this.prvaVrednost + this.drugaVrednost;
    this.drugaVrednost = this.prvaVrednost - this.drugaVrednost;
    this.prvaVrednost = this.prvaVrednost - this.drugaVrednost;
  }

}
