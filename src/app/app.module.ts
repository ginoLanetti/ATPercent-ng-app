import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { AppRoutingModule } from './app-routing.module';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin'
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { InputComponent } from 'src/shared/components/input/input.component';
import { FileLoaderComponent } from 'src/shared/components/file-loader/file-loader.component';
import { MainScreenComponent } from 'src/screens/main-screen/main-screen.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertBoxComponent } from 'src/shared/components/alert-box/alert-box.component';
import { PlotAreaComponent } from 'src/shared/components/plot-area/plot-area.component';
import { PlotsState } from 'src/shared/state/plot.state';
import { PlotsScreenComponent } from 'src/screens/plots-screen/plots-screen.component';
import { HeaderComponent } from 'src/shared/components/header/header.component';
import { HttpClientModule } from '@angular/common/http'
import { AboutComponent } from 'src/screens/about/about.component';



@NgModule({
  declarations: [
    AppComponent,
    InputComponent,
    FileLoaderComponent,
    MainScreenComponent,
    AlertBoxComponent,
    PlotAreaComponent,
    PlotsScreenComponent,
    HeaderComponent,
    AboutComponent
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxsModule.forRoot([
      PlotsState
    ]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }