import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InputComponent } from 'src/shared/components/input/input.component';
import { FileLoader } from 'src/shared/components/file-loader/file-loader.component';
import { MainScreenComponent } from 'src/screens/main-screen/main-screen.component';

@NgModule({
  declarations: [
    AppComponent,
    InputComponent,
    FileLoader,
    MainScreenComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
