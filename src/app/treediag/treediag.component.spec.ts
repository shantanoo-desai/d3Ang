import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreediagComponent } from './treediag.component';

describe('TreediagComponent', () => {
  let component: TreediagComponent;
  let fixture: ComponentFixture<TreediagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreediagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreediagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
