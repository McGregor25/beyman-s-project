import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlCheckboxComponent } from './control-checkbox.component';

describe('ControlCheckboxComponent', () => {
  let component: ControlCheckboxComponent;
  let fixture: ComponentFixture<ControlCheckboxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ControlCheckboxComponent]
    });
    fixture = TestBed.createComponent(ControlCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
