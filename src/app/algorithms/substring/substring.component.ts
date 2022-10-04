import { Component, Input, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { SolutionComponent } from 'src/app/solution.component';
import { IAlgorithm } from '../algorithms';
import { AlgorithmsService } from '../algorithms.service';

@Component({
    selector: 'app-substring',
    templateUrl: './substring.component.html',
    styleUrls: ['./substring.component.css']
})
export class SubstringComponent implements OnInit, SolutionComponent {
    @Input() data: any;

    first_idx: number;
    second_idx: number;
    firstString: string;
    secondString: string;
    displayAnswer: boolean;
    subsequence: string;
    tempSubstring: string;
    title: string;
    description: string;
    tsCode: string;
    htmlCode: string;
    cssCode: string;
    algorithm: IAlgorithm;

    constructor(private algorithmService: AlgorithmsService) {
        this.first_idx = 0;
        this.second_idx = 0;
        this.firstString = "";
        this.secondString = "";
        this.displayAnswer = false;
        this.subsequence = "";
        this.tempSubstring = "";
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

    ReverseString(str) {
        return str.split('').reverse().join('')
    }

    max(a, b) {
        if (a > b)
            return a;
        else
            return b;
    }

    lcs(str1, str2) {
        var len1 = str1.length;
        var len2 = str2.length;
        var lcs = new Array(len1 + 1);
        for (var i = 0; i <= len1; i++) {
            lcs[i] = new Array(len2 + 1)
        }
        for (var i = 0; i <= len1; i++) {
            for (var j = 0; j <= len2; j++) {
                if (i == 0 || j == 0) {
                    lcs[i][j] = 0;
                }
                else {
                    if (str1[i - 1] == str2[j - 1]) {
                        lcs[i][j] = 1 + lcs[i - 1][j - 1];
                    }
                    else {
                        lcs[i][j] = this.max(lcs[i][j - 1], lcs[i - 1][j]);
                    }
                }
            }
        }
    
        var str = "";
        var i:number = len1;
        var j:number = len2;
        while (i > 0 && j > 0) {
            if (str1[i - 1] == str2[j - 1]) {
                str += str1[i - 1];
                i--;
                j--;
            }
            else {
                if (lcs[i][j - 1] > lcs[i - 1][j]) {
                    j--;
                }
                else {
                    i--;
                }
            }
        }
        this.subsequence = this.ReverseString(str);
        this.displayAnswer = true;
    }

    onChange(newValue) {
        this.displayAnswer = false;
        this.subsequence = "";
    }

}
