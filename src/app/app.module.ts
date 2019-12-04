import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InputComponent } from 'src/shared/components/input/input.component';
import { FileLoaderComponent } from 'src/shared/components/file-loader/file-loader.component';
import { MainScreenComponent } from 'src/screens/main-screen/main-screen.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertBoxComponent } from 'src/shared/components/alert-box/alert-box.component';
import { PlotAreaComponent } from 'src/shared/components/plot-area/plot-area.component';
import { PlotLogicComponent } from 'src/shared/components/plot-logic/plot-logic.component';

@NgModule({
  declarations: [
    AppComponent,
    InputComponent,
    FileLoaderComponent,
    MainScreenComponent,
    AlertBoxComponent,
    PlotAreaComponent,
    PlotLogicComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
