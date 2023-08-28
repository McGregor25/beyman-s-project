import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import '@material/web/checkbox/checkbox';
import '@material/web/button/outlined-button';
import '@material/web/button/filled-button';
import '@material/web/button/elevated-button';
import '@material/web/button/outlined-button';
import '@material/web/button/text-button';
import '@material/web/button/tonal-button';
import '@material/web/select/outlined-select';
import '@material/web/select/filled-select';
import '@material/web/select/select-option';
import '@material/web/switch/switch';
import '@material/web/slider/slider';
import '@material/web/icon/icon';
import '@material/web/iconbutton/filled-icon-button';
import '@material/web/iconbutton/filled-tonal-icon-button';
import '@material/web/iconbutton/outlined-icon-button';
import '@material/web/iconbutton/standard-icon-button';
import '@material/web/fab/fab';
import '@material/web/fab/branded-fab';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
