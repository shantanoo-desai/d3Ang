import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestD3ComponentComponent } from './test-d3-component.component';

describe('TestD3ComponentComponent', () => {
  let component: TestD3ComponentComponent;
  let fixture: ComponentFixture<TestD3ComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestD3ComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestD3ComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
