import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Default.LayoutComponent } from './default.layout.component';

describe('Default.LayoutComponent', () => {
  let component: Default.LayoutComponent;
  let fixture: ComponentFixture<Default.LayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Default.LayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Default.LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
