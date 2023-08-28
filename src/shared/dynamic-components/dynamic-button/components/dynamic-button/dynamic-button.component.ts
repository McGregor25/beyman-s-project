import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TooltipPosition } from '@angular/material/tooltip';
import { Variant } from '@material/web/fab/fab';
import { ControlBase } from 'src/shared/dynamic-components/dynamic-form/components/control-base';

export type ButtonType =
  | 'md-elevated-button'
  | 'md-filled-button'
  | 'md-tonal-button'
  | 'md-outlined-button'
  | 'md-text-button'
  | 'md-standard-icon-button'
  | 'md-outlined-icon-button'
  | 'md-filled-icon-button'
  | 'md-filled-tonal-icon-button'
  | 'md-fab';

@Component({
  selector: 'dynamic-button',
  templateUrl: './dynamic-button.component.html',
  styleUrls: ['./dynamic-button.component.scss'],
})
export class DynamicButtonComponent extends ControlBase {
  @Input() public type: ButtonType;

  @Input() public iconPosition: 'leading-icon' | 'trailing-icon';

  @Input() public variant: Variant;

  @Input() public size: 'small' | 'large' | 'extended';

  @Input() href?: string;

  @Input() target?: '_blank' | '_self' | '_parent' | '_top';

  @Output()
  public btClick = new EventEmitter<MouseEvent>();

  constructor() {
    super()
    this.type = 'md-filled-button';
    this.iconPosition = 'trailing-icon';
    this.variant = 'primary';
    this.size = 'extended';
    this.label = '';
    this.tooltipPosition = 'below';
  }

  public click(event: MouseEvent): void {
    this.btClick.emit(event);
  }
}
