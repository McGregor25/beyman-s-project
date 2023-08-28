import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlFileComponent } from './control-file.component';

describe('ControlFileComponent', () => {
  let component: ControlFileComponent;
  let fixture: ComponentFixture<ControlFileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ControlFileComponent]
    });
    fixture = TestBed.createComponent(ControlFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
