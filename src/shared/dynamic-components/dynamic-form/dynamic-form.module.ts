import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { MaterialModule } from 'src/app/material.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRippleModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ControlTextComponent } from './components/control-text/control-text.component';
import { ControlSelectComponent } from './components/control-select/control-select.component';
import { ControlSwitchComponent } from './components/control-switch/control-switch.component';
import { ControlCheckboxComponent } from './components/control-checkbox/control-checkbox.component';
import { ControlSliderComponent } from './components/control-slider/control-slider.component';
import { ControlFileComponent } from './components/control-file/control-file.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [
    DynamicFormComponent,
    ControlTextComponent,
    ControlSelectComponent,
    ControlSwitchComponent,
    ControlCheckboxComponent,
    ControlSliderComponent,
    ControlFileComponent,
  ],
  exports: [
    DynamicFormComponent,
    ControlTextComponent,
    ControlSelectComponent,
    ControlSwitchComponent,
    ControlCheckboxComponent,
    ControlSliderComponent,
    ControlFileComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatIconModule,
    MatInputModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    ScrollingModule,
    MatTooltipModule,
    MatSlideToggleModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DynamicFormModule {}
