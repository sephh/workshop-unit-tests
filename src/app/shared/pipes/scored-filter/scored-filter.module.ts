import {NgModule} from '@angular/core';
import {ScoredFilterPipe} from './scored-filter.pipe';


@NgModule({
  declarations: [ScoredFilterPipe],
  exports: [
    ScoredFilterPipe
  ]
})
export class ScoredFilterModule {
}
