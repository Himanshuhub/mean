import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteList2Component } from './note-list2.component';

describe('NoteList2Component', () => {
  let component: NoteList2Component;
  let fixture: ComponentFixture<NoteList2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoteList2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteList2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
