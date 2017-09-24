import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {StoreModule} from '@ngrx/store';
import {metaReducers, reducer, REDUCER_TOKEN} from './app.reducer';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forRoot(REDUCER_TOKEN, {metaReducers}),
  ],
  providers: [
    {
      provide: REDUCER_TOKEN,
      useValue: reducer,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
