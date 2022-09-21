import { Component, Input, OnInit } from '@angular/core';
import { SolutionComponent } from 'src/app/solution.component';
import { IAlgorithm } from '../algorithms';
import { AlgorithmsService } from '../algorithms.service';

@Component({
  selector: 'app-heap-sort',
  templateUrl: './heap-sort.component.html',
  styleUrls: ['./heap-sort.component.css']
})
export class HeapSortComponent implements OnInit, SolutionComponent {
  @Input() data: any;

  randomArray: number[];
  negativeArray: number[];
  helperArray: number[];
  interval: number;
  title: string;
  description: string;
  tsCode: string;
  htmlCode: string;
  cssCode: string;
  algorithm: IAlgorithm;

  constructor(private algorithmService: AlgorithmsService) {
    this.randomArray = [];
    this.negativeArray = [];
    this.helperArray = [];
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

  randomBarChart() {
    for (let i = 0; i < 40; i++) {
      this.randomArray[i] = Math.floor(Math.random() * 240) * (Math.round(Math.random()) ? 1 : -1);
    }

    for (let i = 0; i < this.randomArray.length; i++) {
      this.helperArray[i] = this.randomArray[i];
    }

    for (let i = 0; i < this.randomArray.length; i++) {
      if (this.randomArray[i] < 0) {
        this.negativeArray[i] = this.randomArray[i] * -1;
        this.randomArray[i] = 0;
      } else {
        this.negativeArray[i] = 0;
      }
    }
  }

  async heapSort() {
    var N = this.helperArray.length;

    // Build heap (rearrange array)
    for (var i = Math.floor(N / 2) - 1; i >= 0; i--)
      this.heapify(this.helperArray, N, i);

    // One by one extract an element from heap
    for (var i = N - 1; i > 0; i--) {
      // Move current root to end
      var temp = this.helperArray[0];
      this.helperArray[0] = this.helperArray[i];
      this.helperArray[i] = temp;

      // call max heapify on the reduced heap
      this.heapify(this.helperArray, i, 0);
      await new Promise<void>((resolve) =>
      setTimeout(() => {
        resolve();
      }, 200)
    );
    this.barChart();
    }
  }

  heapify(arr, N, i) {
    var largest = i; // Initialize largest as root
    var l = 2 * i + 1; // left = 2*i + 1
    var r = 2 * i + 2; // right = 2*i + 2

    // If left child is larger than root
    if (l < N && arr[l] > arr[largest])
      largest = l;

    // If right child is larger than largest so far
    if (r < N && arr[r] > arr[largest])
      largest = r;

    // If largest is not root
    if (largest != i) {
      var swap = arr[i];
      arr[i] = arr[largest];
      arr[largest] = swap;

      // Recursively heapify the affected sub-tree
      this.heapify(arr, N, largest);
    }
  }

  barChart() {
    for (let i = 0; i < this.helperArray.length; i++) {
      this.randomArray[i] = this.helperArray[i];
    }

    for (let i = 0; i < this.randomArray.length; i++) {
      if (this.randomArray[i] < 0) {
        this.negativeArray[i] = this.randomArray[i] * -1;
        this.randomArray[i] = 0;
      } else {
        this.negativeArray[i] = 0;
      }
    }
  }

}
