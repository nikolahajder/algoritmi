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

import { AppComponent } from './app.component';
import { SwapValueComponent } from './algorithms/swap-value/swap-value.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { HigherValueComponent } from './algorithms/higher-value/higher-value.component';

@NgModule({
  declarations: [
    AppComponent,
    SwapValueComponent,
    HomeComponent,
    HigherValueComponent
  ],
  imports: [
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
      { path:'swap', component: SwapValueComponent },
      { path: 'home', component: HomeComponent },
      { path: 'higher', component: HigherValueComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', redirectTo: 'home', pathMatch: 'full' }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
