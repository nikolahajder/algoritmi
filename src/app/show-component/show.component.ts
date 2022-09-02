import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { AlgComponent } from '../alg.component';
import { AlgItem } from '../alg.item';
import { AlgorithmsService } from '../algorithms/algorithms.service';
import { ManagerService } from '../algorithms/manager.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit, AlgComponent {
  @Input() data: any;

  algorithms: AlgItem[];
  tsCode: string;
  htmlCode: string;
  cssCode: string;
  valueA: number;
  valueB: number;

  constructor(elementRef: ElementRef,
    private algorithmService: AlgorithmsService) {
      
    this.algorithms = [];
    this.tsCode = "";
    this.htmlCode = "";
    this.cssCode = "";
    this.valueA = 0;
    this.valueB = 0;
  }

  ngOnInit(): void {
    this.algorithmService.showCode(this.data.paths.TypeScript).then((value) => {
      this.tsCode = value;
  })

  this.algorithmService.showCode(this.data.paths.HTML).then((value) => {
      this.htmlCode = value;
  })

  this.algorithmService.showCode(this.data.paths.CSS).then((value) => {
      this.cssCode = value;
  })
  }

  algorithm(id: any){
  }
}
