import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {LightGalleryComponent} from './light-gallery.component';

const routes: Routes = [
  {
    path: '',
    component: LightGalleryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LightGalleryRoutingModule {
}
