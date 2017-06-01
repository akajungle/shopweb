import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app.module';
import { CookieService } from 'angular2-cookie/services/cookies.service';

platformBrowserDynamic().bootstrapModule(AppModule, [CookieService]);