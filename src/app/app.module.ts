import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { AngularSplitModule } from "angular-split";
import { MatTreeModule } from '@angular/material/tree';
import { HttpClientModule } from '@angular/common/http';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

import { AppComponent } from './app.component';
import { SwapValueComponent } from './algorithms/swap-value/swap-value.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { HigherValueComponent } from './algorithms/higher-value/higher-value.component';
import { AlgDirective } from './alg.directive';
import { ShowComponent } from './show-component/show.component';
import { SolutionDirective } from './solution.directive';
import {MatMenuModule, MatMenuTrigger} from '@angular/material/menu';
import { AddDialogComponent } from './dialogs/add-dialog/add-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { RemoveDialogComponent } from './dialogs/remove-dialog/remove-dialog.component';
import { FibonacciComponent } from './algorithms/fibonacci/fibonacci.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BarChartComponent } from './algorithms/bar-chart/bar-chart.component';
import { NgChartsModule } from 'ng2-charts';
import { SwapBarsComponent } from './algorithms/swap-bars/swap-bars.component';
import { SortBarsComponent } from './algorithms/sort-bars/sort-bars.component';
import { BubbleSortComponent } from './algorithms/bubble-sort/bubble-sort.component';
import { SelectionSortComponent } from './algorithms/selection-sort/selection-sort.component';
import { HeapSortComponent } from './algorithms/heap-sort/heap-sort.component';
import { QuickSortComponent } from './algorithms/quick-sort/quick-sort.component';
import { BinaryDigitsComponent } from './algorithms/binary-digits/binary-digits.component';


@NgModule({
  declarations: [
    AppComponent,
    SwapValueComponent,
    HomeComponent,
    HigherValueComponent,
    AlgDirective,
    ShowComponent,
    SolutionDirective,
    AddDialogComponent,
    RemoveDialogComponent,
    FibonacciComponent,
    BarChartComponent,
    SwapBarsComponent,
    SortBarsComponent,
    BubbleSortComponent,
    SelectionSortComponent,
    HeapSortComponent,
    QuickSortComponent,
    BinaryDigitsComponent
  ],
  imports: [
    NgChartsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatMenuModule,
    MatButtonToggleModule,
    HttpClientModule,
    MatTreeModule,
    AngularSplitModule,
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatExpansionModule,
    MatTabsModule,
    MatInputModule,
    RouterModule.forRoot([
      //{ path:'swap', component: SwapValueComponent },
      { path: 'home', component: HomeComponent },
      //{ path: 'higher', component: HigherValueComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', redirectTo: 'home', pathMatch: 'full' }
    ]),
    NgChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
