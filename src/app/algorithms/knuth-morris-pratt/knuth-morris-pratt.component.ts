import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-knuth-morris-pratt',
    templateUrl: './knuth-morris-pratt.component.html',
    styleUrls: ['./knuth-morris-pratt.component.css']
})
export class KnuthMorrisPrattComponent {

    pat: string;
    txt: string;
    lps: number[];
    indexes: number[];
    displayOutput: boolean;
    displayError: boolean;

    constructor() {
        this.pat = "AABA";
        this.txt = "AABAACAADAABAAABAA";
        this.displayOutput = false;
        this.indexes = [];
        this.lps = [];
        this.displayError = false;
    }

    onChange(): void {
        this.displayOutput = false;
        this.displayError = false;
    }

    computeLPSArray() {

        let len = 0;
        let i = 1;
        this.lps.push(0);

        while (i < this.pat.length) {
            if (this.pat[len] === this.pat[i]) {
                len++;
                this.lps.push(len);
                i++;
            } else {
                if (len != 0) {
                    len = this.lps[len - 1];
                } else {
                    this.lps.push(len);
                    i++;
                }
            }
        }
    }

    KMPSearch() {

        let M = this.pat.length;
        let N = this.txt.length;

        let j = 0;

        this.computeLPSArray();

        this.indexes = [];
        let i = 0;
        while ((N - i) >= (M - j)) {
            if (this.pat[j] === this.txt[i]) {
                j++;
                i++;
            }

            if (j === M) {
                this.indexes.push(i - j);
                j = this.lps[j - 1];
            } else if (i < N && this.pat[j] != this.txt[i]) {
                if (j != 0) {
                    j = this.lps[j - 1];
                } else {
                    i = i + 1;
                }
            }
        }

        if (this.indexes.length === 0) {
            this.displayError = true;
        }
        this.displayOutput = true;
    }

}
