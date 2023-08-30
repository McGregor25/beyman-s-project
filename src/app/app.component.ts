import { AfterViewInit, Component } from '@angular/core';
import { MaterialPaletteGeneratorService } from 'src/shared/dynamic-components/material-palette-generator/services/material-palette-generator.service';
import { appRootActions } from './store/actions';
import { Store } from '@ngrx/store';
import { defaultImage } from './image';
import { BaseControl } from 'src/shared/dynamic-components';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  title = 'beyman-s-project';
  public defaultImage: string = '';

  public baseControls: BaseControl[];
  constructor(
    public materialPaletteGeneratorService: MaterialPaletteGeneratorService,
    private store: Store
  ) {
    this.baseControls = [
      {
        type: 'Switch',
        key: 'switch',
        label: 'Input de prueba xddd', 
        _validator_required: true,
        col: {
          lg: 12,
          md: 12,
          sm: 12,
          xl: 12,
          xs: 12,
          xxl: 12,
        },
      },
    ];
  }

  public ngAfterViewInit(): void {
    this.defaultImage = defaultImage;
    setTimeout(() => {
      this.generatePalette();
      const host: any = document.querySelector(':host');
    }, 2000);
  }

  public setImage(event: any) {
    const imgFile: any = document.getElementById('imageBackground');
    const imgFile1: any = document.getElementById('imageBackground1');

    const files = event.srcElement.files;
    if (imgFile && FileReader && files && files.length) {
      var fr = new FileReader();
      fr.onload = async () => {
        imgFile.src = fr.result;
        imgFile1.src = fr.result;
        this.generatePalette();
      };
      fr.readAsDataURL(files[0]);
    }
  }

  public async generatePalette() {
    this.materialPaletteGeneratorService.getImagePalette();
    // const themes = await this.materialPaletteGeneratorService.getImagePalette();

    // this.store.dispatch(
    //   appRootActions.saveThemes({
    //     themes,
    //   })
    // );
  }

  logev(e: MouseEvent) {
    console.log(e);
  }
}
