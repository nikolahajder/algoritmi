import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AlgItem } from './alg.item';
import { ManagerService } from './algorithms/manager.service';
import { AlgDirective } from './alg.directive';
import { AlgComponent } from './alg.component';
import { MatDialog } from '@angular/material/dialog';
import { AddDialogComponent } from './dialogs/add-dialog/add-dialog.component';
import { IAlgorithm } from './algorithms/algorithms';
import { RemoveDialogComponent } from './dialogs/remove-dialog/remove-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  //title = 'algoritmi';
  algorithm: IAlgorithm;

  @Input() algs: AlgItem[] = [];
  home: AlgItem[] = [];

  currentAlgIndex = -1;

  @ViewChild(AlgDirective, { static: true }) algHost!: AlgDirective;

  constructor(private managerService: ManagerService,
    public dialog: MatDialog) {
    this.algorithm = {
      id: 55,
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
    this.algs = this.managerService.getAlgorithms();
    this.home = this.managerService.getSolutions();
    this.loadHome();
  }

  loadHome() {
    const algItem = this.home[2];

    const viewContainerRef = this.algHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent<AlgComponent>(algItem.component);
    componentRef.instance.data = algItem.data;
  }

  loadComponent(id: any) {
    const algItem = this.algs[id - 1];

    const viewContainerRef = this.algHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent<AlgComponent>(algItem.component);
    componentRef.instance.data = algItem.data;
  }

  getAlgs(id: any) {
    this.loadComponent(id);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      width: '250px',
      data: {
          id: 0, 
          title: '',
          description: '',
          paths: {
              TypeScript: '',
              HTML: '',
              CSS: ''
          }
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  removeDialog(): void {
    this.dialog.open(RemoveDialogComponent, {
      width: '250px',
      data: { title: '' },
    });
  }
}

