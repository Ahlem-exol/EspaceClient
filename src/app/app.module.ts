import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ClientsComponent } from './pages/clients/clients.component';
import { FormsModule } from '@angular/forms';
import { AuthInterceptor } from './services/auth/auth-interceptor';
import { UserPage } from './pages/user/user.page';
import { SocietePage } from './pages/societe/societe.page';
import { HomePage } from './pages/home/home.page';
import { UserPageModule } from './pages/user/user.module';
import { SocietePageModule } from './pages/societe/societe.module';
import { HomePageModule } from './pages/home/home.module';
import { AddSocieteComponent } from './pages/societe/add-societe/add-societe.component';
import { UpdateSocieteComponent } from './pages/societe/update-societe/update-societe.component';
import { DeleteSocieteComponent } from './pages/societe/delete-societe/delete-societe.component';
import { AddUserComponent } from './pages/user/add-user/add-user.component';

@NgModule({
  declarations: [AppComponent, ClientsComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy,
    },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
