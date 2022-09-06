import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AlgItem } from './alg.item';
import { ManagerService } from './algorithms/manager.service';
import { AlgDirective } from './alg.directive';
import { AlgComponent } from './alg.component';
import { HomeComponent } from './core/home/home.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'algoritmi';

  @Input() algs: AlgItem[] = [];
  homeComponent = HomeComponent;

  currentAlgIndex = -1;

  @ViewChild(AlgDirective, { static: true }) algHost!: AlgDirective;

  constructor(private managerService : ManagerService) {

  }

  ngOnInit(): void {
    this.algs = this.managerService.getAlgorithms();
    this.loadComponent(1);
    this.getAlgs(1);
  }

  loadComponent(id: any) {
    console.log(id);
    const algItem = this.algs[id-1];

    const viewContainerRef = this.algHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent<AlgComponent>(algItem.component);
    componentRef.instance.data = algItem.data;
  }

  getAlgs(id: any) {
    this.loadComponent(id);
  }
}
