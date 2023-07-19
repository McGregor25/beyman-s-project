import { Component, Input } from '@angular/core';

export type MaterialCardType = 'elevated' | 'filled' | 'outlined';
@Component({
  selector: 'material-card',
  templateUrl: './material-card.component.html',
  styleUrls: ['./material-card.component.scss'],
})
export class MaterialCardComponent {
  @Input() public title?: string;
  @Input() public type?: MaterialCardType;
  @Input() public subtitle?: string;
}
