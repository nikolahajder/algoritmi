import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[algHost]',
})
export class AlgDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}