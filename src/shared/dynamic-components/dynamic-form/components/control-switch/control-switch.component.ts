import { Component } from '@angular/core';
import { ControlBase } from '../control-base';

@Component({
  selector: 'control-switch',
  templateUrl: './control-switch.component.html',
  styleUrls: ['./control-switch.component.scss'],
})
export class ControlSwitchComponent extends ControlBase {
  constructor() {
    super();
  }
}
