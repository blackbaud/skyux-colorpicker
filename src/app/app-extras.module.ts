import {
  NgModule
} from '@angular/core';

import {
  SkyDocsToolsModule,
  SkyDocsToolsOptions
} from '@skyux/docs-tools';

import {
  SkyAppLinkModule
} from '@skyux/router';

import {
  SkyColorpickerForRootCompatModule
} from './public/modules/shared/colorpicker-for-root-compat.module';

import {
  SkyColorpickerModule
} from './public/public_api';

@NgModule({
  imports: [
    SkyColorpickerForRootCompatModule
  ],
  exports: [
    SkyAppLinkModule,
    SkyColorpickerModule,
    SkyDocsToolsModule
  ],
  providers: [
    {
      provide: SkyDocsToolsOptions,
      useValue: {
        gitRepoUrl: 'https://github.com/blackbaud/skyux-colorpicker',
        packageName: '@skyux/colorpicker'
      }
    }
  ]
})
export class AppExtrasModule { }
