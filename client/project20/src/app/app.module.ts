import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ShoppinglistComponent } from './shoppinglist/shoppinglist.component';
import { ShoppinglistItemComponent } from './shoppinglist-item/shoppinglist-item.component';
import { ShoppinglistDetailsComponent } from './shoppinglist-details/shoppinglist-details.component';
import { ShoppinglistWebshopService } from "./shared/shoppinglist-webshop.service";
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from "./app-routing.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { ShoppinglistFormComponent } from './shoppinglist-form/shoppinglist-form.component';
import { ReactiveFormsModule} from "@angular/forms";

import { registerLocaleData } from "@angular/common";
import localeDe  from "@angular/common/locales/de";
import { LOCALE_ID } from "@angular/core";
import { LoginComponent } from './login/login.component';
import {AuthService} from "./shared/authentication.service";
import {TokenInterceptorService} from "./shared/token-interceptor.service";
import {JwtInterceptorService} from "./shared/jwt-interceptor.service";

registerLocaleData(localeDe);


@NgModule({
  declarations: [
    AppComponent,
    ShoppinglistComponent,
    ShoppinglistItemComponent,
    ShoppinglistDetailsComponent,
    HomeComponent,
    ShoppinglistFormComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule, AppRoutingModule, HttpClientModule, ReactiveFormsModule
  ],
  providers: [ShoppinglistWebshopService, AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true
    }],

  bootstrap: [AppComponent]

})
export class AppModule { }
