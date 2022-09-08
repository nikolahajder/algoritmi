import { Injectable } from "@angular/core";
import { IAlgorithm } from "./algorithms";
import algoritmi from "../../assets/algorithms.json"
import { AlgItem } from "../alg.item";
import { ShowComponent } from "../show-component/show.component";
import { SwapValueComponent } from "./swap-value/swap-value.component";
import { HigherValueComponent } from "./higher-value/higher-value.component";
import { HomeComponent } from "../core/home/home.component";

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

        //if (localStorage.getItem("algorithms") === null) {
        //    this.setAlgorithms(algoritmi.algos);
       // }
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
                HomeComponent,
                {id: 2}
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