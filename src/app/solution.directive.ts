import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
    selector: '[solutionHost]'
})
export class SolutionDirective {
    constructor(public viewContainerRef: ViewContainerRef) {}
}
