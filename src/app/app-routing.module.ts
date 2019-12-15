import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainScreenComponent } from 'src/screens/main-screen/main-screen.component';
import { PlotsScreenComponent } from 'src/screens/plots-screen/plots-screen.component';
import { AboutComponent } from 'src/screens/about/about.component';


const routes: Routes = [
  // {path:'about', component: },
  { path: '', component: AboutComponent },
  { path: 'new-plot', component: MainScreenComponent },
  { path: 'saved', component: PlotsScreenComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
