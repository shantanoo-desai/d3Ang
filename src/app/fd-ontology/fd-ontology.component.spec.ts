import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FdOntologyComponent } from './fd-ontology.component';

describe('FdOntologyComponent', () => {
  let component: FdOntologyComponent;
  let fixture: ComponentFixture<FdOntologyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FdOntologyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FdOntologyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
