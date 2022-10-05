import { Injectable } from "@angular/core";
import { IAlgorithm } from "./algorithms";
import algoritmi from "../../assets/algorithms.json"
import { AlgItem } from "../alg.item";
import { ShowComponent } from "../show-component/show.component";
import { SwapValueComponent } from "./swap-value/swap-value.component";
import { HigherValueComponent } from "./higher-value/higher-value.component";
import { HomeComponent } from "../core/home/home.component";
import { FibonacciComponent } from "./fibonacci/fibonacci.component";
import { BarChartComponent } from "./bar-chart/bar-chart.component";
import { SwapBarsComponent } from "./swap-bars/swap-bars.component";
import { SortBarsComponent } from "./sort-bars/sort-bars.component";
import { BubbleSortComponent } from "./bubble-sort/bubble-sort.component";
import { SelectionSortComponent } from "./selection-sort/selection-sort.component";
import { HeapSortComponent } from "./heap-sort/heap-sort.component";
import { QuickSortComponent } from "./quick-sort/quick-sort.component";
import { BinaryDigitsComponent } from "./binary-digits/binary-digits.component";
import { BinarySearchComponent } from "./binary-search/binary-search.component";
import { PrimeCheckComponent } from "./prime-check/prime-check.component";
import { PrimeFindComponent } from "./prime-find/prime-find.component";
import { PrimeDisplayComponent } from "./prime-display/prime-display.component";
import { PrimeNumberFindComponent } from "./prime-number-find/prime-number-find.component";
import { StringContainerComponent } from "./string-container/string-container.component";
import { SubstringComponent } from "./substring/substring.component";
import { MassMurderComponent } from "./mass-murder/mass-murder.component";
import { SubsequenceComponent } from "./subsequence/subsequence.component";

@Injectable({
    providedIn: 'root'
})
export class ManagerService {
    arrayAlgorithms: IAlgorithm[];
    algorithm: IAlgorithm;
    algorithms: AlgItem[];
    idArray: number[];

    constructor() {
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
        this.arrayAlgorithms = [];
        this.algorithms = [];
        this.idArray = [];

        if(localStorage.getItem("algorithms") === null) {
          this.setAlgorithms(algoritmi.algos);
       }
    }

    setAlgorithms(alg: any): void {

        localStorage.setItem('algorithms', JSON.stringify(alg));
 
    }
 
    getAlgorithms() {
        let storage = JSON.parse(localStorage.getItem('algorithms') || '{}');
        let index = storage.length - 1;
        for (let i = 0; i <= index; i++) {
            let algorithm: IAlgorithm;
            algorithm = {


                id: storage[i].id,
                title: storage[i].title,
                description: storage[i].description,
                paths: {
                    TypeScript: storage[i].paths.TypeScript,
                    HTML: storage[i].paths.HTML,
                    CSS: storage[i].paths.CSS
                }
            };
            this.algorithms.push(new AlgItem(ShowComponent, algorithm));
        }
        return this.algorithms;
    }

    getLocalAlgorithms() {
        let storage = JSON.parse(localStorage.getItem('algorithms') || '{}');
        let index = storage.length - 1;
        for (let i = 0; i <= index; i++) {
            let algorithm: IAlgorithm;
            algorithm = {


                id: storage[i].id,
                title: storage[i].title,
                description: storage[i].description,
                paths: {
                    TypeScript: storage[i].paths.TypeScript,
                    HTML: storage[i].paths.HTML,
                    CSS: storage[i].paths.CSS
                }
            };
            this.arrayAlgorithms.push(algorithm);
        }
        return this.arrayAlgorithms;
    }

    getLatestId() {
        let storage = JSON.parse(localStorage.getItem('algorithms') || '{}');
        let index = storage.length - 1;
        for (let i = 0; i <= index; i++) {
            this.idArray.push(storage[i].id);
            }
        return Math.max(...this.idArray);
    }

    getSolutions() {
        return [
            new AlgItem(
                SwapValueComponent,
                {id: 0}
            ),
            new AlgItem(
                HigherValueComponent,
                {id: 1}
            ),
            new AlgItem(
                FibonacciComponent,
                {id: 2}
            ),
            new AlgItem(
                BarChartComponent,
                {id: 3}
            ),
            new AlgItem(
                SwapBarsComponent,
                {id: 4}
            ),
            new AlgItem(
                SortBarsComponent,
                {id: 5}
            ),
            new AlgItem(
                BubbleSortComponent,
                {id: 6}
            ),
            new AlgItem(
                SelectionSortComponent,
                {id: 7}
            ),
            new AlgItem(
                HeapSortComponent,
                {id: 8}
            ),
            new AlgItem(
                QuickSortComponent,
                {id: 9}
            ),
            new AlgItem(
                BinaryDigitsComponent,
                {id: 10}
            ),
            new AlgItem(
                BinarySearchComponent,
                {id: 11}
            ),
            new AlgItem(
                PrimeCheckComponent,
                {id: 12}
            ),
            new AlgItem(
                PrimeFindComponent,
                {id: 13}
            ),
            new AlgItem(
                PrimeDisplayComponent,
                {id: 14}
            ),
            new AlgItem(
                PrimeNumberFindComponent,
                {id: 15}
            ),
            new AlgItem(
                StringContainerComponent,
                {id: 16}
            ),
            new AlgItem(
                SubstringComponent,
                {id: 17}
            ),
            new AlgItem(
                SubsequenceComponent,
                {id: 18}
            ),
            new AlgItem(
                MassMurderComponent,
                {id: 19}
            ),
            new AlgItem(
                HomeComponent,
                {id: 20}
            )
        ];
    }

    removeAlgorithmByTitle (title: string) {
        let temp = this.getLocalAlgorithms();
        localStorage.removeItem("algorithms");
        temp = temp.filter(temp => temp.title != title);
        this.setAlgorithms(temp);
    }
}