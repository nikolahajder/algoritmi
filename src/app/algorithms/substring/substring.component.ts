import { Component, Input, OnInit } from '@angular/core';
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

    firstString: string;
    secondString: string;
    displayAnswer: boolean;
    substring: string;
    title: string;
    description: string;
    tsCode: string;
    htmlCode: string;
    cssCode: string;
    algorithm: IAlgorithm;

    constructor(private algorithmService: AlgorithmsService) {
        this.firstString = "";
        this.secondString = "";
        this.displayAnswer = false;
        this.substring = "";
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

    printLCSubStr(X, Y) {
        let m = X.length;
        let n = Y.length;
        let LCSuff = new Array(m + 1);

        // To store length of the longest common substring
        let len = 0;

        // To store the index of the cell which contains the
        // maximum value. This cell's index helps in building
        // up the longest common substring from right to left.
        let row = 0, col = 0;

        /* Following steps build LCSuff[m+1][n+1] in bottom
           up fashion. */
        for (let i = 0; i <= m; i++) {
            LCSuff[i] = Array(n + 1);
            for (let j = 0; j <= n; j++) {
                LCSuff[i][j] = 0;
                if (i == 0 || j == 0)
                    LCSuff[i][j] = 0;

                else if (X[i - 1] == Y[j - 1]) {
                    LCSuff[i][j] = LCSuff[i - 1][j - 1] + 1;
                    if (len < LCSuff[i][j]) {
                        len = LCSuff[i][j];
                        row = i;
                        col = j;
                    }
                }
                else
                    LCSuff[i][j] = 0;
            }
        }

        // if true, then no common substring exists
        if (len == 0) {
            this.substring = "No Common Substring";
            this.displayAnswer = true;
            return;
        }

        // allocate space for the longest common substring
        let resultStr = "";

        // traverse up diagonally form the (row, col) cell
        // until LCSuff[row][col] != 0
        while (LCSuff[row][col] != 0) {
            resultStr = X[row - 1] + resultStr; // or Y[col-1]
            --len;

            // move diagonally up to previous cell
            row--;
            col--;
        }

        this.substring = resultStr;
        this.displayAnswer = true;
    }


    onChange(newValue) {
        this.displayAnswer = false;
        this.substring = "";
    }

}
