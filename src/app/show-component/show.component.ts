import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { AlgComponent } from '../alg.component';
import { AlgItem } from '../alg.item';
import { AlgorithmsService } from '../algorithms/algorithms.service';
import { ManagerService } from '../algorithms/manager.service';
import { SolutionComponent } from '../solution.component';
import { SolutionDirective } from '../solution.directive';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit, AlgComponent {
  @Input() data: any;
  @Input() algs: AlgItem[] = [];

  @ViewChild(SolutionDirective, { static: true }) solutionHost!: SolutionDirective;

  tsCode: string;
  htmlCode: string;
  cssCode: string;

  constructor(private algorithmService: AlgorithmsService,
    private managerService: ManagerService) {

    this.tsCode = "";
    this.htmlCode = "";
    this.cssCode = "";
  }

  ngOnInit(): void {
    this.algorithmService.showCode(this.data.paths.TypeScript).then((value) => {
      this.tsCode = value;
    })

    this.algorithmService.showCode(this.data.paths.HTML).then((value) => {
      this.htmlCode = value;
    })

    this.algorithmService.showCode(this.data.paths.CSS).then((value) => {
      this.cssCode = value;
    })
    this.algs = this.managerService.getSolutions();
  }

  loadComponent(id: any) {
    const algItem = (this.algs[id - 1]);

    const viewContainerRef = this.solutionHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent<SolutionComponent>(algItem.component);
    componentRef.instance.data = algItem.data;
  }

}
