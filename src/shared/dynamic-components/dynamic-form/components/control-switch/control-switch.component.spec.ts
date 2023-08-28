import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlSwitchComponent } from './control-switch.component';

describe('ControlSwitchComponent', () => {
  let component: ControlSwitchComponent;
  let fixture: ComponentFixture<ControlSwitchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ControlSwitchComponent]
    });
    fixture = TestBed.createComponent(ControlSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
