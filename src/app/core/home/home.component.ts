import { Component, OnInit, Input } from '@angular/core';
import { AlgComponent } from 'src/app/alg.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AlgComponent {

  @Input() data: any;
  public pageTitle = 'Welcome';

  constructor() { }

  ngOnInit(): void {
  }

}
