import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IAlgorithm } from 'src/app/algorithms/algorithms';
import { ManagerService } from 'src/app/algorithms/manager.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-remove-dialog',
  templateUrl: './remove-dialog.component.html',
  styleUrls: ['./remove-dialog.component.css']
})
export class RemoveDialogComponent implements OnInit {

  constructor(private managerService: ManagerService,
    public dialogRef: MatDialogRef<AppComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IAlgorithm,
    ) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onAddClick(title: string) {
    this.managerService.removeAlgorithmByTitle(title);
    this.reloadPage();
  }

  reloadPage(){
    window.location.reload();
  }

}
