import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { TestD3ComponentComponent } from './test-d3-component/test-d3-component.component';
import { FdlayoutComponent } from './fdlayout/fdlayout.component';

@NgModule({
  declarations: [
    AppComponent,
    TestD3ComponentComponent,
    FdlayoutComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
