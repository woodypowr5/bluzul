import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BluzulComponent } from './bluzul.component';

describe('BluzulComponent', () => {
  let component: BluzulComponent;
  let fixture: ComponentFixture<BluzulComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BluzulComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BluzulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
