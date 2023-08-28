import { Component } from '@angular/core';
import { ControlBase } from '../control-base';

@Component({
  selector: 'control-checkbox',
  templateUrl: './control-checkbox.component.html',
  styleUrls: ['./control-checkbox.component.scss'],
})
export class ControlCheckboxComponent extends ControlBase {
  constructor() {
    super();
  }
}
