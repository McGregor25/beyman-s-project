import { AfterViewInit, Component } from '@angular/core';
import { MaterialPaletteGeneratorService } from 'src/shared/dynamic-components/material-palette-generator/services/material-palette-generator.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  title = 'beyman-s-project';

  constructor(
    public materialPaletteGeneratorService: MaterialPaletteGeneratorService
  ) {}

  public ngAfterViewInit(): void {
    setTimeout(() => {
      this.materialPaletteGeneratorService.getImagePalette();
    }, 2000);
  }

  public setImage(event: any) {
    const imgFile: any = document.getElementById('imageBackground');

    const files = event.srcElement.files;
    if (imgFile && FileReader && files && files.length) {
      var fr = new FileReader();
      fr.onload = () => {
        imgFile.src = fr.result;
        setTimeout(() => {
          this.materialPaletteGeneratorService.getImagePalette();
        }, 2000);
      };
      fr.readAsDataURL(files[0]);
    }
  }
}
