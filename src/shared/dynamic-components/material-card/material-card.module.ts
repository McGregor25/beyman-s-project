import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialCardComponent } from './material-card/material-card.component';

@NgModule({
  declarations: [MaterialCardComponent],
  exports: [MaterialCardComponent],
  imports: [CommonModule],
})
export class MaterialCardModule {}
