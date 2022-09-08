import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IAlgorithm } from 'src/app/algorithms/algorithms';
import { ManagerService } from 'src/app/algorithms/manager.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})
export class AddDialogComponent {
    algorithm: IAlgorithm;

  constructor(
    private managerService: ManagerService,
    public dialogRef: MatDialogRef<AppComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IAlgorithm,
  ) {
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

  onNoClick(): void {
    this.dialogRef.close();
  }

  onAddClick(title: string, description: string, ts: string, html: string, css: string) {
    this.algorithm.id = this.managerService.getLatestId() + 1;
    this.algorithm.title = title;
    this.algorithm.description = description;
    this.algorithm.paths.TypeScript = ts;
    this.algorithm.paths.HTML = html;
    this.algorithm.paths.CSS = css;
    let temp = this.managerService.getLocalAlgorithms();
    temp.push(this.algorithm);
    this.managerService.setAlgorithms(temp);
  }
}