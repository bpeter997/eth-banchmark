import { firebaseConfig } from './../environments/firebase.config';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { InfoComponent } from './components/info/info.component';
import { UserdataComponent } from './components/info/userdata/userdata.component';
import { NetworkdetailsComponent } from './components/info/networkdetails/networkdetails.component';
import { AuthComponent } from './components/auth/auth.component';
import { HttpClientModule } from '@angular/common/http';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { FibogeneratorComponent } from './components/info/fibogenerator/fibogenerator.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ResultpanelComponent } from './components/info/resultpanel/resultpanel.component';

@NgModule({
  declarations: [
    AppComponent,
    InfoComponent,
    UserdataComponent,
    NetworkdetailsComponent,
    AuthComponent,
    FibogeneratorComponent,
    ResultpanelComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    HttpClientModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
