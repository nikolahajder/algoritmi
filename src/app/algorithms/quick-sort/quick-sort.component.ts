import { Component, Input, OnInit } from '@angular/core';
import { SolutionComponent } from 'src/app/solution.component';
import { IAlgorithm } from '../algorithms';
import { AlgorithmsService } from '../algorithms.service';

@Component({
    selector: 'app-quick-sort',
    templateUrl: './quick-sort.component.html',
    styleUrls: ['./quick-sort.component.css']
})
export class QuickSortComponent implements OnInit, SolutionComponent {
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

    swap(arr, i, j) {
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    async partition(arr, low, high) {
        // pivot
        let pivot = arr[high];

        // Index of smaller element and
        // indicates the right position
        // of pivot found so far
        let i = (low - 1);

        for (let j = low; j <= high - 1; j++) {
            await new Promise<void>((resolve) =>
                setTimeout(() => {
                    resolve();
                }, 150)
            );
            this.barChart();
            // If current element is smaller
            // than the pivot
            if (arr[j] < pivot) {

                // Increment index of
                // smaller element
                i++;
                this.swap(arr, i, j);
            }

        }
        this.swap(arr, i + 1, high);
        await new Promise<void>((resolve) =>
                setTimeout(() => {
                    resolve();
                }, 150)
            );
            this.barChart();
        return (i + 1);
    }

    /* The main function that implements QuickSort
              arr[] --> Array to be sorted,
              low --> Starting index,
              high --> Ending index
     */
    async quickSort(arr, low, high) {


        if (low < high) {

            // pi is partitioning index, arr[p]
            // is now at right place
            let pi = await this.partition(arr, low, high);

            // Separately sort elements before
            // partition and after partition
            await this.quickSort(arr, low, pi - 1);
            await this.quickSort(arr, pi + 1, high);
        }
    }

    sort() {
        this.quickSort(this.helperArray, 0, this.helperArray.length - 1);
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

