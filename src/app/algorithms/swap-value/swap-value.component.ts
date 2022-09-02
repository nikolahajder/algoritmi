/* import { Component, OnInit, Input } from '@angular/core';
import { AlgComponent } from 'src/app/alg.component';
import { AlgorithmsService } from '../algorithms.service';

@Component({
  selector: 'app-swap-value',
  templateUrl: './swap-value.component.html',
  styleUrls: ['./swap-value.component.css']
})
export class SwapValueComponent implements OnInit, AlgComponent {

  @Input() data: any;

  prvaVrednost: number;
  drugaVrednost: number;
  tsCode: string;
  htmlCode: string;
  cssCode: string;
  tsURL: string;
  htmlURL: string;
  cssURL: string;

  constructor(private algorithmService: AlgorithmsService) {
    this.prvaVrednost = 0;
    this.drugaVrednost = 0;
    this.tsCode = "";
    this.htmlCode = "";
    this.cssCode = "";
    this.tsURL = '/swap-value/swap-value.component.ts';
    this.htmlURL = '/swap-value/swap-value.component.html';
    this.cssURL = '/swap-value/swap-value.component.css'
  }

  ngOnInit(): void {
    this.algorithmService.showCode(this.tsURL).then((value) => {
      this.tsCode = value;
    })

    this.algorithmService.showCode(this.htmlURL).then((value) => {
      this.htmlCode = value;
    })

    this.algorithmService.showCode(this.cssURL).then((value) => {
      this.cssCode = value;
    })
  }

  swapValues() {
    this.prvaVrednost = this.prvaVrednost + this.drugaVrednost;
    this.drugaVrednost = this.prvaVrednost - this.drugaVrednost;
    this.prvaVrednost = this.prvaVrednost - this.drugaVrednost;
  }

}
 */