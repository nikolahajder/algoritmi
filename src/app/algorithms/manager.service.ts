import { Injectable } from "@angular/core";
import { IAlgorithm } from "./algorithms";
import algoritmi from "../../assets/algorithms.json"
import { AlgItem } from "../alg.item";
import { ShowComponent } from "../show-component/show.component";
import { SwapValueComponent } from "./swap-value/swap-value.component";
import { HigherValueComponent } from "./higher-value/higher-value.component";

@Injectable({
    providedIn: 'root'
})
export class ManagerService {
    arrayAlgorithms: IAlgorithm[];
    algorithm: IAlgorithm;
    algorithms: AlgItem[];

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

        if (localStorage.getItem("algorithms") === null) {
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

    getSolutions() {
        return [
            new AlgItem(
                SwapValueComponent,
                {id: 0}
            ),
            new AlgItem(
                HigherValueComponent,
                {id: 1}
            )
        ];
    }

    /*getAlgorithmById(index: number) {
       for (let i = 0; i <= index;) {
           if (i == index) {
               this.algorithm.id = Algoritmi.algos[index].id;
               this.algorithm.title = Algoritmi.algos[index].title;
               this.algorithm.description = Algoritmi.algos[index].description;
               this.algorithm.paths.TypeScript = Algoritmi.algos[index].paths.TypeScript;
               this.algorithm.paths.HTML = Algoritmi.algos[index].paths.HTML;
               this.algorithm.paths.CSS = Algoritmi.algos[index].paths.CSS;
               break;
           } else {
               i++;
           }
       }
       return this.algorithm;
   }*/
}