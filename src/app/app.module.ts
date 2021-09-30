import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ActivityReducer } from './store/activity.reducer';
import { ActivityEffects } from './store/activity.effects';
// Components
import { AppComponent } from './app.component';
import { SearchPageComponent } from './components/search-page/search-page.component';
// Material imports
import { MatSliderModule } from '@angular/material/slider';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    declarations: [AppComponent, SearchPageComponent],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,

        StoreModule.forRoot({}, {}),
        EffectsModule.forRoot([]),

        StoreModule.forFeature('activity', ActivityReducer),
        EffectsModule.forFeature([ActivityEffects]),
        StoreDevtoolsModule.instrument({
            maxAge: 25,
            logOnly: !environment.production,
        }),
        !environment.production ? StoreDevtoolsModule.instrument() : [],

        MatSliderModule,
        MatRadioModule,
        MatButtonModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
