import { Injectable } from "@angular/core";
import { IAlgorithm } from "./algorithms";
import Algoritmi from "../../assets/algorithms.json"
import { AlgItem } from "../alg.item";
import { ShowComponent } from "../show-component/show.component";

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
        this.setAlgorithms();
    }

    setAlgorithms(): void {
        if (localStorage.getItem("algorithms") === null) {
            let index = Algoritmi.algos.length - 1;
            for (let i = 0; i <= index; i++) {
                this.arrayAlgorithms[i] = {

                    id: Algoritmi.algos[i].id,
                    title: Algoritmi.algos[i].title,
                    description: Algoritmi.algos[i].description,
                    paths: {
                        TypeScript: Algoritmi.algos[i].paths.TypeScript,
                        HTML: Algoritmi.algos[i].paths.HTML,
                        CSS: Algoritmi.algos[i].paths.CSS
                    }
                };
            }
            localStorage.setItem('algorithms', JSON.stringify(this.arrayAlgorithms));
        } else {
            return;
        }
    }

    getAlgorithms() {
        let storage = JSON.parse(localStorage.getItem('algorithms') || '{}');
        let index = Algoritmi.algos.length - 1;
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