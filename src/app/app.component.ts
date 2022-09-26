import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AlgItem } from './alg.item';
import { ManagerService } from './algorithms/manager.service';
import { AlgDirective } from './alg.directive';
import { AlgComponent } from './alg.component';
import { MatDialog } from '@angular/material/dialog';
import { AddDialogComponent } from './dialogs/add-dialog/add-dialog.component';
import { IAlgorithm } from './algorithms/algorithms';
import { RemoveDialogComponent } from './dialogs/remove-dialog/remove-dialog.component';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  menuTopLeftPosition = { x: '0', y: '0' }
  algorithm: IAlgorithm;
  selectedIndex: number;
  buttonHelper: number;

  @Input() algs: AlgItem[] = [];
  home: AlgItem[] = [];

  currentAlgIndex = -1;

  @ViewChild(MatMenuTrigger, { static: true }) matMenuTrigger: MatMenuTrigger;
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
    const algItem = this.home[15];

    const viewContainerRef = this.algHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent<AlgComponent>(algItem.component);
    componentRef.instance.data = algItem.data;
  }

  loadComponent(id: any) {
    let i: number;
    for (i = id - 1; i >= 0;) {
      if (this.algs[i] != null) {break;}
      else i--;
    }

    const algItem = this.algs[i];

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

  removeDialog(name: string): void {
    this.dialog.open(RemoveDialogComponent, {
      width: '250px',
      data: { title: name },
    });
  }
}

