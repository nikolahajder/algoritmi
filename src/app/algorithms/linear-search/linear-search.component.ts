import { Component } from '@angular/core';

@Component({
    selector: 'app-linear-search',
    templateUrl: './linear-search.component.html',
    styleUrls: ['./linear-search.component.css']
})
export class LinearSearchComponent {

    inputStrings: string;
    value: string;
    stringsValues: string[];
    output: number;
    displayOutput: boolean;

    constructor() {
        this.inputStrings = "";
        this.value = "";
        this.displayOutput = false;
    }

    onChange() {
        this.displayOutput = false;
    }

    lsc() {
        this.stringsValues = this.inputStrings.split(',').map(String);
        this.output = this.linearSearch();
        this.displayOutput = true;
    }

    linearSearch() {
        for (let i = 0; i < this.stringsValues.length; i++) {
            if (this.stringsValues[i] === this.value) return i;
        }
        return -1;
    }
}
