import {NgModule} from '@angular/core';
import {SharedModule} from '@shared';

import {LightGalleryRoutingModule} from './light-gallery-routing.module';
import {LightGalleryComponent} from './light-gallery.component';

@NgModule({
  imports: [
    SharedModule,
    LightGalleryRoutingModule
  ],
  declarations: [LightGalleryComponent]
})
export class LightGalleryModule {
}
