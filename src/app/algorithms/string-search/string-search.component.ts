import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-string-search',
    templateUrl: './string-search.component.html',
    styleUrls: ['./string-search.component.css']
})
export class StringSearchComponent {

    text: string;
    word: string;
    index: number[];
    displayOutput: boolean;

    constructor() {
        this.text = "AABAACAADAABAAABAA";
        this.word = "AABA";
        this.index = [];
        this.displayOutput = false;
    }

    stringSearch() {
        for (let i = 0; i <= this.text.length - this.word.length; i++) {
            for (let j = 0; j < this.word.length; j++) {
                if (this.word[j] !== this.text[i + j]) break;
                if (j === this.word.length-1) this.index.push(i);
            }
        }
        this.displayOutput = true;
    }

    onChange(){
        this.displayOutput = false;
    }
}
