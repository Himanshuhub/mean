import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule }    from '@angular/http';
// import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MyComponentComponent } from './my-component/my-component.component';
import { TaskComponent } from './task/task.component';
import { NoteComponent } from './note/note.component';
import { NoteListComponent } from './note-list/note-list.component';
import { NoteList2Component } from './note/note-list2/note-list2.component';

@NgModule({
  declarations: [
    AppComponent,
    MyComponentComponent,
    TaskComponent,
    NoteComponent,
    NoteListComponent,
    NoteList2Component
  ],
  imports: [
    BrowserModule, 
    FormsModule, 
    HttpModule 
    // AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
