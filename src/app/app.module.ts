import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { TestD3ComponentComponent } from './test-d3-component/test-d3-component.component';
import { FdlayoutComponent } from './fdlayout/fdlayout.component';
import { FdOntologyComponent } from './fd-ontology/fd-ontology.component';
import { TreediagComponent } from './treediag/treediag.component';

@NgModule({
  declarations: [
    AppComponent,
    TestD3ComponentComponent,
    FdlayoutComponent,
    FdOntologyComponent,
    TreediagComponent
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
