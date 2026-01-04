import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router, NavigationStart, NavigationEnd, NavigationError, Event } from '@angular/router';
//import { RouterModule, Routes } from '@angular/router';
import { PageComponent } from './components/page/page.component';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';
import { ListDocsComponent } from './components/list-docs/list-docs.component';
import { ListPagesComponent } from './components/list-pages/list-pages.component';
import { ContentsComponent } from './components/contents/contents.component';
import { UrlPageComponent } from './components/url-page/url-page.component';
import { ListPhotosComponent } from './components/list-photos/list-photos.component';
import { ListAnonsComponent } from './components/list-anons/list-anons.component';
import { BannersComponent } from './components/banners/banners.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginGuard } from './guards/login.guard';
import { AuthGuard } from './guards/auth.guard';
import { ListVideosComponent } from './components/list-videos/list-videos.component';
import { SliderBannersComponent } from './components/slider-banners/slider-banners.component';
import { SliderPagesComponent } from './components/slider-pages/slider-pages.component';
import { AccordionComponentComponent } from './components/accordion-component/accordion-component.component';
import { TabsComponentComponent } from './components/tabs-component/tabs-component.component';
import { DatabaseComponent } from './components/database/database.component';

const routes: Routes = [
  /*{ path: 'page', component: PageComponent, canActivate: [LoginGuard] },
  { path: 'list-pages', component: ListPagesComponent , canActivate: [LoginGuard]},
  { path: 'list-docs', component: ListDocsComponent, canActivate: [LoginGuard] },
  { path: 'contents', component: ContentsComponent, canActivate: [LoginGuard]},
  { path: 'url-page', component: UrlPageComponent, canActivate: [LoginGuard]},
  { path: 'list-videos', component: ListVideosComponent, canActivate: [LoginGuard]},
  { path: 'list-anons', component: ListAnonsComponent, canActivate: [LoginGuard]},
  { path: 'banners', component: BannersComponent, canActivate: [LoginGuard]},*/
  
  { path: 'page', component: PageComponent,canActivate: [AuthGuard] },
  { path: 'list-pages', component: ListPagesComponent,canActivate: [AuthGuard] },
  { path: 'list-docs', component: ListDocsComponent,canActivate: [AuthGuard] },
  { path: 'contents', component: ContentsComponent,canActivate: [AuthGuard] },
  { path: 'url-page', component: UrlPageComponent,canActivate: [AuthGuard] },
  { path: 'list-videos', component: ListVideosComponent,canActivate: [AuthGuard] },
  { path: 'list-photos', component: ListPhotosComponent,canActivate: [AuthGuard] },
  { path: 'list-anons', component: ListAnonsComponent,canActivate: [AuthGuard] },
  { path: 'banners', component: BannersComponent,canActivate: [AuthGuard] },
  { path: 'slider-pages', component: SliderPagesComponent,canActivate: [AuthGuard] },
  { path: 'slider-banners', component: SliderBannersComponent,canActivate: [AuthGuard] },
  { path: 'tabs', component: TabsComponentComponent,canActivate: [AuthGuard] },
  { path: 'accordion', component: AccordionComponentComponent,canActivate: [AuthGuard] },

  { path: 'login', component: LoginComponent},
 // { path: 'register', component: RegisterComponent},
  { path: 'welcome', component: WelcomePageComponent,canActivate: [AuthGuard] },
  { path: 'database', component: DatabaseComponent,canActivate: [AuthGuard] },
  { path: 'logout', component: LogoutComponent,canActivate: [AuthGuard]},
  //{ path: '', redirectTo: 'login', pathMatch: 'full'}
  // { path: 'search', component: SearchComponent },
 // { path: 'gallery', component: GalleryComponent },
 // { path: 'carousel', component: CarouselComponent },
 // { path: 'form', component: FormComponent },
  //{ path: 'index.php', component: PageComponent },
  //{ path: 'card', component: CardDocComponent },
  
  //{ path: '**', component: NotFoundComponent }
 // { path: '', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        console.log('➡️ Навигация начата:', event.url);
      }

      if (event instanceof NavigationEnd) {
        console.log('✅ Навигация завершена:', event.url);
      }

      if (event instanceof NavigationError) {
        console.error('❌ Ошибка навигации:', event.error);
      }
    });
  }

}