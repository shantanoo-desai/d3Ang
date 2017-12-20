import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FdlayoutComponent } from './fdlayout.component';

describe('FdlayoutComponent', () => {
  let component: FdlayoutComponent;
  let fixture: ComponentFixture<FdlayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FdlayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FdlayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
