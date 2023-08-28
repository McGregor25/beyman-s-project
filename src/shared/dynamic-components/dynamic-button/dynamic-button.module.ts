import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicButtonComponent } from './components/dynamic-button/dynamic-button.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [DynamicButtonComponent],
  exports: [DynamicButtonComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule, MatTooltipModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DynamicButtonModule {}
