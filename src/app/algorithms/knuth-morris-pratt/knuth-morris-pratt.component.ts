import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-knuth-morris-pratt',
    templateUrl: './knuth-morris-pratt.component.html',
    styleUrls: ['./knuth-morris-pratt.component.css']
})
export class KnuthMorrisPrattComponent {

    pat: string;
    txt: string;
    indexes: number[];
    displayOutput: boolean;

    constructor() {
        this.pat = "AABA";
        this.txt = "AABAACAADAABAAABAA";
        this.displayOutput = false;
    }

    onChange(): void {
        this.displayOutput = false;
    }

    computeLPSArray(pat: string, M: number, lps: number[]) {

        let len = 0;
        let i = 1;
        lps[0] = 0;

        while (i < M) {
            if (pat[len] === pat[i]) {
                len++;
                lps[i] = len;
                i++;
            } else {
                if (len != 0) {
                    len = lps[len - 1];
                } else {
                    lps[i] = len;
                    i++;
                }
            }
        }
    }

    KMPSearch() {

        let M = this.pat.length;
        let N = this.txt.length;

        let lps = [];
        let j = 0;

        this.computeLPSArray(this.pat, M, lps);

        this.indexes = [];
        let i = 0;
        while ((N - i) >= (M - j)) {
            if (this.pat[j] === this.txt[i]) {
                j++;
                i++;
            }

            if (j === M) {
                this.indexes.push(i - j);
                j = lps[j - 1];
            } else if (i < N && this.pat[j] != this.txt[i]) {
                if (j != 0) {
                    j = lps[j - 1];
                } else {
                    i = i + 1;
                }
            }
        }

        this.displayOutput = true;

    }

}
