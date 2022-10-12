import { Component, Input, OnInit } from '@angular/core';
import { SolutionComponent } from 'src/app/solution.component';
import { IAlgorithm } from '../algorithms';
import { AlgorithmsService } from '../algorithms.service';

@Component({
  selector: 'app-josephus',
  templateUrl: './josephus.component.html',
  styleUrls: ['./josephus.component.css']
})
export class JosephusComponent implements OnInit, SolutionComponent {
  @Input() data: any;

  personNumber: number;
  personAlive: number;
  displaySolution: boolean;
  displayError: boolean;
  title: string;
  description: string;
  tsCode: string;
  htmlCode: string;
  cssCode: string;
  algorithm: IAlgorithm;

  constructor(private algorithmService: AlgorithmsService) {
      this.displaySolution = false;
      this.displayError = false;
      this.personNumber = 0;
      this.personAlive = 0;
      this.title = "";
      this.description = "";
      this.tsCode = "";
      this.htmlCode = "";
      this.cssCode = "";
      this.algorithm = {
          id: 0,
          title: '',
          description: '',
          paths: {
              TypeScript: '',
              HTML: '',
              CSS: ''
          }
      };
  }

  ngOnInit(): void {
      this.algorithmService.showCode(this.algorithm.paths.TypeScript).then((value) => {
          this.tsCode = value;
      })

      this.algorithmService.showCode(this.algorithm.paths.HTML).then((value) => {
          this.htmlCode = value;
      })

      this.algorithmService.showCode(this.algorithm.paths.CSS).then((value) => {
          this.cssCode = value;
      })
  }

  lastManStanding(){
      let a = 1, l = 0;
      while (Math.pow(2, a) <= this.personNumber) a++;
      a = a - 1;
      l = this.personNumber - Math.pow(2, a);
      this.personAlive = 2 * l + 1;
      this.displaySolution = true;
  }

  onChange(newValue) {
      this.personNumber = newValue;
      this.displaySolution = false;
  }

}
