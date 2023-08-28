import { Component, Input } from '@angular/core';
import { TooltipPosition } from '@angular/material/tooltip';

@Component({
  selector: 'control-base',
  template: '',
  styles: [''],
})
export class ControlBase {
  @Input() public icon!: string;

  @Input() public label!: string;

  @Input() public tooltip!: string;

  @Input() public tooltipPosition: TooltipPosition = 'below';

  @Input() public tooltipClass!: string;

  @Input() public disabled?: boolean;

  constructor() {}
}
