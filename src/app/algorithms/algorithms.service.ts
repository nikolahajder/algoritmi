import { Injectable, OnInit, resolveForwardRef } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class AlgorithmsService {
    private Url: string;
    filetext: string;

    constructor(){
        this.Url = 'http://127.0.0.1:8887';
        this.filetext = "";
    }
    
    showFile(newUrl: string): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            let rawFile = new XMLHttpRequest();
            rawFile.open("GET", this.Url + newUrl, false);
            rawFile.onreadystatechange = async () => {
                if (rawFile.readyState === 4) {
                    if (rawFile.status === 200 || rawFile.status == 0) {
                        let allText = rawFile.responseText;
                        resolve(allText);
                    } else {
                        reject("There is an Error!")
                    }
                }
            }
            rawFile.send(null);
        });
        return promise;
    }

    async showCode(newUrl: string): Promise<any>{
        this.filetext = await this.showFile(newUrl);
        return this.filetext;
    }
}