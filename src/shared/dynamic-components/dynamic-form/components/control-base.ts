import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TooltipPosition } from '@angular/material/tooltip';
import { BaseControl } from '../models/dynamic-form.model';

@Component({
  selector: 'control-base',
  template: '',
  styles: [''],
})
export class ControlBase {
  @Input() public baseControl!: BaseControl;

  @Input() public icon!: string;

  @Input() public label!: string;

  @Input() public tooltip!: string;

  @Input() public tooltipPosition: TooltipPosition = 'below';

  @Input() public tooltipClass!: string;

  @Input() public disabled!: boolean;

  @Input() public _formControl!: FormControl;

  constructor() {}
}
