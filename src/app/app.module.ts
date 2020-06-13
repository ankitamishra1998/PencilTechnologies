import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TextEditorComponent } from './text-editor/text-editor.component';
import { UserService } from 'src/services/user.service';
import { UserResolver } from './text-editor/user.resolver';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HighContrastModeDetector } from '@angular/cdk/a11y';
import { Platform } from '@angular/cdk/platform';
import { FormsModule } from '@angular/forms';
import { AutofillMonitor } from '@angular/cdk/text-field';
import { ContentObserver } from '@angular/cdk/observers';
import { TextEditorService } from 'src/services/text-editor.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    TextEditorComponent
  ],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    AngularFireDatabaseModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // needed for database features
    AngularFireAuthModule, BrowserAnimationsModule, // needed for auth features
  ],
  providers: [
    UserService,
    TextEditorService,
    UserResolver,
    HighContrastModeDetector,
    Platform,
    AutofillMonitor,
    ContentObserver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
