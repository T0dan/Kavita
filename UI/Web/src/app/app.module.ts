import { BrowserModule, Title } from '@angular/platform-browser';
import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbCollapseModule, NgbDropdownModule, NgbNavModule, NgbPaginationModule, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { NavHeaderComponent } from './nav-header/nav-header.component';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { UserLoginComponent } from './user-login/user-login.component';
import { ToastrModule } from 'ngx-toastr';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { LibraryComponent } from './library/library.component';
import { SharedModule } from './shared/shared.module';
import { LibraryDetailComponent } from './library-detail/library-detail.component';
import { SeriesDetailComponent } from './series-detail/series-detail.component';
import { NotConnectedComponent } from './not-connected/not-connected.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { ReviewSeriesModalComponent } from './_modals/review-series-modal/review-series-modal.component';
import { CarouselModule } from './carousel/carousel.module';

import { PersonBadgeComponent } from './person-badge/person-badge.component';
import { TypeaheadModule } from './typeahead/typeahead.module';
import { RecentlyAddedComponent } from './recently-added/recently-added.component';
import { InProgressComponent } from './in-progress/in-progress.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CardsModule } from './cards/cards.module';
import { CollectionsModule } from './collections/collections.module';
import { ReadingListModule } from './reading-list/reading-list.module';
import { SAVER, getSaver } from './shared/_providers/saver.provider';

@NgModule({
  declarations: [
    AppComponent,
    NavHeaderComponent,
    UserLoginComponent,
    LibraryComponent, 
    LibraryDetailComponent, 
    SeriesDetailComponent, 
    NotConnectedComponent, // Move into ExtrasModule
    ReviewSeriesModalComponent,
    PersonBadgeComponent,
    RecentlyAddedComponent,
    InProgressComponent,
    DashboardComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule, // EditCollection Modal

    NgbDropdownModule, // Nav
    AutocompleteLibModule, // Nav
    NgbRatingModule, // Series Detail
    NgbNavModule,
    NgbPaginationModule,

    NgbCollapseModule, // Login 

    SharedModule,
    CarouselModule,
    TypeaheadModule,
    CardsModule,
    CollectionsModule,
    ReadingListModule,

    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      timeOut: 6000,
      countDuplicates: true,
      autoDismiss: true
    }),
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    Title,
    {provide: SAVER, useFactory: getSaver},
    { provide: APP_BASE_HREF, useValue: window['_app_base' as keyof Window] || '/' },
  ],
  entryComponents: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
