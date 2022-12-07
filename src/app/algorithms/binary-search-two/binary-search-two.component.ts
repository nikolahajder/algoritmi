import { Component } from '@angular/core';

@Component({
    selector: 'app-binary-search-two',
    templateUrl: './binary-search-two.component.html',
    styleUrls: ['./binary-search-two.component.css']
})
export class BinarySearchTwoComponent {

    inputNumbers: string;
    nArray: number[];
    value: number;
    output: number;
    displayOutput: boolean;
    displayError: boolean;

    constructor() {
        this.inputNumbers = "";
        this.value = 0;
        this.displayError = false;
        this.displayOutput = false;
     }

    onChange(): void {
        this.displayError = false;
        this.displayOutput = false;
    }

    checkSorted(){
        this.nArray = this.inputNumbers.split(',').map(Number);
        for (let i = 0; i < this.nArray.length - 1; i++){
            if (this.nArray[i] >= this.nArray[i + 1]){
                this.displayError = true;
                return;
            }
        }
        this.output = this.binarySearch();
        this.displayOutput = true;
    }

    binarySearch() {
        let start = 0;
        let end = this.nArray.length - 1;
        let middle = Math.floor((start + end) / 2);
        while (this.nArray[middle] !== this.value && start <= end) {
            if (this.value < this.nArray[middle]) {
                end = middle -1;
            } else {
                start = middle +1;
            }
            middle = Math.floor((start+end)/2);
        }
        return this.nArray[middle] === this.value ? middle : -1;
    }
}
