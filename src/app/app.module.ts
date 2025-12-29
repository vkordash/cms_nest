import { NgModule, APP_INITIALIZER  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule }  from '@angular/platform-browser/animations'; 
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { TreeModule } from 'primeng/tree'; 
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from "primeng/button";
import { CheckboxModule } from 'primeng/checkbox';
import { FileUploadModule } from 'primeng/fileupload';
import { DataViewModule } from "primeng/dataview"; 
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ContextMenuModule } from 'primeng/contextmenu'; 
import { ToastModule } from 'primeng/toast'; 
import { MessagesModule } from 'primeng/messages'; 
import { RippleModule } from 'primeng/ripple'; 
//import { EditorModule } from 'primeng/editor';
import { FormsModule } from '@angular/forms'; 
import { InputMaskModule } from 'primeng/inputmask'; 
import { ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from "primeng/calendar";
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ChipsModule } from 'primeng/chips';
import { DialogModule } from 'primeng/dialog'; 
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from "primeng/dropdown";
import { CardModule } from 'primeng/card';
import { PasswordModule } from 'primeng/password';
import { AccordionModule } from 'primeng/accordion';
import { TabViewModule } from 'primeng/tabview';
import { EditorModule } from '@tinymce/tinymce-angular';
import { TableModule } from 'primeng/table';


import { AppComponent } from './app.component';
import { TreeComponent } from './components/tree/tree.component';
import { PageComponent } from './components/page/page.component';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';
import { ListDocsComponent } from './components/list-docs/list-docs.component';
import { ListPagesComponent } from './components/list-pages/list-pages.component';
import { ContentsComponent } from './components/contents/contents.component';
import { UrlPageComponent } from './components/url-page/url-page.component';
import { ChipsComponent } from './components/chips/chips.component';
import { CkeditorComponent } from './components/ckeditor/ckeditor.component';
import { PreferenceListpagesComponent } from './components/preference-listpages/preference-listpages.component';
import { TestComponent } from './components/test/test.component';
import { LoginComponent } from './components/login/login.component';
import { SingleUploadFileComponent } from './components/single-upload-file/single-upload-file.component';
import { MultiUploadFileComponent } from './components/multi-upload-file/multi-upload-file.component';
import { PreferenceMenuComponent } from './components/preference-menu/preference-menu.component';
import { PreferenceAccessComponent } from './components/preference-access/preference-access.component';
import { PhotoCollectionComponent } from './components/photo-collection/photo-collection.component';
import { VideoCollectionComponent } from './components/video-collection/video-collection.component';
import { RegisterComponent } from './components/register/register.component';
import { LogoutComponent } from './components/logout/logout.component';
import { ListAnonsComponent } from './components/list-anons/list-anons.component';
import { BannersComponent } from './components/banners/banners.component';
import { SafehtmlPipe } from './pipes/safehtml.pipe';
import { ListVideosComponent } from './components/list-videos/list-videos.component';
import { DatabaseComponent } from './components/database/database.component';
import { SliderBannersComponent } from './components/slider-banners/slider-banners.component';
import { SliderPagesComponent } from './components/slider-pages/slider-pages.component';
import { InfoComponent } from './components/info/info.component';
import { ListPhotosComponent } from './components/list-photos/list-photos.component';
import { TinymceEditorComponent } from './components/tinymce-editor/tinymce-editor.component';
import { TabsComponentComponent } from './components/tabs-component/tabs-component.component';
import { AccordionComponentComponent } from './components/accordion-component/accordion-component.component';
import { SearchComponent } from './components/search/search.component';
import { AccessComponent } from './components/access/access.component';

import { AuthInterceptor } from './services/auth.interceptor';
import { PreferenceUserComponent } from './components/preference-user/preference-user.component';

import { AppConfigService } from './services/app-config.service';


export function initializeApp(appConfig: AppConfigService) {
  console.log('111');
  return () => appConfig.loadConfig();
}

@NgModule({
  declarations: [
    AppComponent,
    TreeComponent,
    CkeditorComponent,
    PageComponent,
    WelcomePageComponent,    
    ListDocsComponent,
    ListPagesComponent,
    ContentsComponent,
    UrlPageComponent,   
    ChipsComponent,
    PreferenceListpagesComponent,
    TestComponent,
    LoginComponent,
    SingleUploadFileComponent,
    MultiUploadFileComponent,
    PreferenceMenuComponent,
    PreferenceAccessComponent,
    PhotoCollectionComponent,
    VideoCollectionComponent,
    RegisterComponent,
    LogoutComponent,
    ListAnonsComponent,
    BannersComponent,
    SafehtmlPipe,
    ListVideosComponent,
    DatabaseComponent,
    SliderBannersComponent,
    SliderPagesComponent,
    InfoComponent,
    ListPhotosComponent,
    TinymceEditorComponent,
    TabsComponentComponent,
    AccordionComponentComponent,
    SearchComponent,
    AccessComponent,
    PreferenceUserComponent    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, 
    AppRoutingModule,
    TreeModule, 
    ContextMenuModule,
    ToastModule,
    RippleModule,
    EditorModule,
    InputMaskModule,
    CKEditorModule,
    FormsModule,
    HttpClientModule,
    InputTextModule,
    ButtonModule,
    CheckboxModule,
    InputSwitchModule,
    MessagesModule,
    FileUploadModule,
    DataViewModule,
    InputTextareaModule,
    CalendarModule,
    DialogModule,
    InputNumberModule,
    ChipsModule,
    DropdownModule,
    ReactiveFormsModule,
    PasswordModule,
    AccordionModule,
    TabViewModule,
    CardModule,
    EditorModule ,
    TableModule     
  ],
  providers: [  
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true // Перехватчик должен работать для всех запросов
    },
    AppConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AppConfigService],
      multi: true
    }
   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

/*
 {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true // Перехватчик должен работать для всех запросов
    }    


*/