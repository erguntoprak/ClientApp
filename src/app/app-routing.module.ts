import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { PanelLayoutComponent } from './layouts/panel-layout/panel-layout.component';
import { SiteLayoutComponent } from './layouts/site-layout/site-layout.component';
import { AuthGuard } from './_services/auth-guard.service';
import { Roles } from './shared/enums';
// const routerOptions: ExtraOptions = {
//   scrollPositionRestoration: 'disabled',
//   anchorScrolling: 'enabled',
//   scrollOffset: [0, 64],
// };
const routes: Routes = [
  {
    path: 'panel',
    component: PanelLayoutComponent,
    canLoad: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./panel-pages/dashboard/dashboard.module').then(m => m.DashBoardModule),
        canLoad: [AuthGuard],
        data: {roles:[Roles.Admin,Roles.User]}
      },
      {
        path: 'egitim-ekle',
        loadChildren: () => import('./panel-pages/education-create/education-create.module').then(m => m.EducationCreateModule),
        canLoad: [AuthGuard],
        data: {roles:[Roles.Admin,Roles.User]}
      },
      {
        path: 'egitim-duzenle/:name',
        loadChildren: () => import('./panel-pages/education-edit/education-edit.module').then(m => m.EducationEditModule),
        canLoad: [AuthGuard],
        data: {roles:[Roles.Admin,Roles.User]}
      },
      {
        path: 'egitimler',
        loadChildren: () => import('./panel-pages/education-list/education-list.module').then(m => m.EducationListModule),
        canLoad: [AuthGuard],
        data: {roles:[Roles.Admin,Roles.User]}
      },
      {
        path: 'egitim-iletisim-formlari/:name',
        loadChildren: () => import('./panel-pages/education-contact-from-list/education-contact-from-list.module').then(m => m.EducationContactFormListModule),
        canLoad: [AuthGuard],
        data: {roles:[Roles.Admin,Roles.User]}
      },
      {
        path: 'blog-ekle',
        loadChildren: () => import('./panel-pages/blog-create/blog-create.module').then(m => m.BlogCreateModule),
        canLoad: [AuthGuard],
        data: {roles:[Roles.Admin,Roles.User]}
      },
      {
        path: 'blog-listesi',
        loadChildren: () => import('./panel-pages/blog-list/blog-list.module').then(m => m.BlogListModule),
        canLoad: [AuthGuard],
        data: {roles:[Roles.Admin,Roles.User]}
      },
      {
        path: 'blog-duzenle/:name',
        loadChildren: () => import('./panel-pages/blog-edit/blog-edit.module').then(m => m.BlogEditModule),
        canLoad: [AuthGuard],
        data: {roles:[Roles.Admin,Roles.User]}
      },
      {
        path: 'kullanici-listesi',
        loadChildren: () => import('./panel-pages/user-list/user-list.module').then(m => m.UserListModule),
        canLoad: [AuthGuard],
        data: {roles:[Roles.Admin]}
      },
      {
        path: 'kullanici-profil',
        loadChildren: () => import('./panel-pages/user-profil/user-profil.module').then(m => m.UserProfilModule),
        canLoad: [AuthGuard],
        data: {roles:[Roles.Admin,Roles.User]}
      },
      {
        path: 'kullanici-rolu-duzenle/:userId',
        loadChildren: () => import('./panel-pages/user-role-edit/user-role-edit.module').then(m => m.UserRoleEditModule),
        canLoad: [AuthGuard],
        data: {roles:[Roles.Admin]}
      },
      {
        path: 'kullanici-sifre-duzenle/:userId',
        loadChildren: () => import('./panel-pages/user-password-edit/user-password-edit.module').then(m => m.UserPasswordEditModule),
        canLoad: [AuthGuard],
        data: {roles:[Roles.Admin]}
      },
      {
        path: 'kullanici-duzenle/:userId',
        loadChildren: () => import('./panel-pages/user-edit/user-edit.module').then(m => m.UserEditModule),
        canLoad: [AuthGuard],
        data: {roles:[Roles.Admin]}
      },
      {
        path: 'kategori-listesi',
        loadChildren: () => import('./panel-pages/category-list/category-list.module').then(m => m.CategoryListModule),
        canLoad: [AuthGuard],
        data: {roles:[Roles.Admin]}
      },
      {
        path: 'kategori-ekle',
        loadChildren: () => import('./panel-pages/category-create/category-create.module').then(m => m.CategoryCreateModule),
        canLoad: [AuthGuard],
        data: {roles:[Roles.Admin]}
      },
      {
        path: 'kategori-duzenle/:categoryId',
        loadChildren: () => import('./panel-pages/category-edit/category-edit.module').then(m => m.CategoryEditModule),
        canLoad: [AuthGuard],
        data: {roles:[Roles.Admin]}
      },
      {
        path: 'kategori-ozellik-kategori-duzenle/:categoryId',
        loadChildren: () => import('./panel-pages/category-attribute-category-create/category-attribute-category-create.module').then(m => m.CategoryAttributeCategoriCreateModule),
        canLoad: [AuthGuard],
        data: {roles:[Roles.Admin]}
      },
      {
        path: 'ozellik-kategori-listesi',
        loadChildren: () => import('./panel-pages/attribute-category-list/attribute-category-list.module').then(m => m.AttributeCategoryListModule),
        canLoad: [AuthGuard],
        data: {roles:[Roles.Admin]}
      },
      {
        path: 'ozellik-kategori-ekle',
        loadChildren: () => import('./panel-pages/attribute-category-create/attribute-category-create.module').then(m => m.AttributeCategoryCreateModule),
        canLoad: [AuthGuard],
        data: {roles:[Roles.Admin]}
      },
      {
        path: 'ozellik-kategori-duzenle/:attributeCategoryId',
        loadChildren: () => import('./panel-pages/attribute-category-edit/attribute-category-edit.module').then(m => m.AttributeCategoryEditModule),
        canLoad: [AuthGuard],
        data: {roles:[Roles.Admin]}
      },
      {
        path: 'ozellik-listesi',
        loadChildren: () => import('./panel-pages/attribute-list/attribute-list.module').then(m => m.AttributeListModule),
        canLoad: [AuthGuard],
        data: {roles:[Roles.Admin]}
      },
      {
        path: 'ozellik-ekle',
        loadChildren: () => import('./panel-pages/attribute-create/attribute-create.module').then(m => m.AttributeCreateModule),
        canLoad: [AuthGuard],
        data: {roles:[Roles.Admin]}
      },
      {
        path: 'ozellik-duzenle/:attributeId',
        loadChildren: () => import('./panel-pages/attribute-edit/attribute-edit.module').then(m => m.AttributeEditModule),
        canLoad: [AuthGuard],
        data: {roles:[Roles.Admin]}
      },
      {
        path: 'egitim-islemleri',
        loadChildren: () => import('./panel-pages/education-operation-list/education-operation-list.module').then(m => m.EducationOperationListModule),
        canLoad: [AuthGuard],
        data: {roles:[Roles.Admin]}
      },
      {
        path: 'blog-islemleri',
        loadChildren: () => import('./panel-pages/blog-operation-list/blog-operation-list.module').then(m => m.BlogOperationListModule),
        canLoad: [AuthGuard],
        data: {roles:[Roles.Admin]}
      }
    ]
  },
  {
    path: '',
    component: SiteLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./site-pages/home/home.module').then(m => m.HomeModule),
        data: { breadcrumb: 'Home' }
      },
      {
        path: 'giris-yap',
        loadChildren: () => import('./site-pages/login/login.module').then(m => m.LoginModule),
        data: { breadcrumb: 'Home' }
      },
      {
        path: 'kayit-ol',
        loadChildren: () => import('./site-pages/register/register.module').then(m => m.RegisterModule),
        data: { breadcrumb: 'Home' }
      },
      {
        path: 'iletisim',
        loadChildren: () => import('./site-pages/contact/contact.module').then(m => m.ContactModule),
        data: { breadcrumb: 'Home' }
      },
      {
        path: 'e-posta-onay-yeniden-gonder',
        loadChildren: () => import('./site-pages/e-mail-confirmation/e-mail-confirmation.module').then(m => m.EmailConfirmationModule),
        data: { breadcrumb: 'Home' }
      },
      {
        path: 'e-posta-onay',
        loadChildren: () => import('./site-pages/e-mail-confirmation-message/e-mail-confirmation-message.module').then(m => m.EmailConfirmationMessageModule),
        data: { breadcrumb: 'Home' }
      },
      {
        path: 'sifreyi-unuttum',
        loadChildren: () => import('./site-pages/user-forgot-password/user-forgot-password.module').then(m => m.UserForgotPasswordModule),
        data: { breadcrumb: 'Home' }
      },
      {
        path: 'sifre-sifirla',
        loadChildren: () => import('./site-pages/user-reset-password/user-reset-password.module').then(m => m.UserResetPasswordModule),
        data: { breadcrumb: 'Home' }
      },
      {
        path: ':district/:category/:name',
        loadChildren: () => import('./site-pages/education-detail/education-detail.module').then(m => m.EducationDetailModule)
      },
      {
        path: 'blog/:name',
        loadChildren: () => import('./site-pages/blog-detail/blog-detail.module').then(m => m.BlogDetailModule),
        data: { breadcrumb: 'Home' }
      },
      {
        path: 'bloglar/:userName',
        loadChildren: () => import('./site-pages/blog-view-list/blog-view-list.module').then(m => m.BlogViewListModule),
        data: { breadcrumb: 'Home' }
      },
      {
        path: 'bloglar',
        loadChildren: () => import('./site-pages/blog-view-list/blog-view-list.module').then(m => m.BlogViewListModule),
        data: { breadcrumb: 'Home' }
      },
      {
        path: ':district/:category',
        loadChildren: () => import('./site-pages/education-view-list/education-view-list.module').then(m => m.EducationViewListModule),
        data: { breadcrumb: 'Home' }
      },
      {
        path: 'cerez-politikasi',
        loadChildren: () => import('./site-pages/cookie-consent/cookie-consent.module').then(m => m.CookieConsentModule),
        data: { breadcrumb: 'Home' }
      },
      {
        path: 'kisisel-verilerin-korunmasi-kanunu',
        loadChildren: () => import('./site-pages/kvkk/kvkk.module').then(m => m.KvkkModule),
        data: { breadcrumb: 'Home' }
      },
      {
        path: 'kullanici-sozlesmesi',
        loadChildren: () => import('./site-pages/user-agreement/user-agreement.module').then(m => m.UserAgreementModule),
        data: { breadcrumb: 'Home' }
      },
      {
        path: 'ki̇si̇sel-veri̇leri̇n-islenmesi̇ne-ili̇ski̇n-aydınlatma-metni̇',
        loadChildren: () => import('./site-pages/disclosure-text/disclosure-text.module').then(m => m.DisclosureTextModule),
        data: { breadcrumb: 'Home' }
      },
      {
        path: 'sayfa-bulunamadi',
        loadChildren: () => import('./site-pages/not-found/not-found.module').then(m => m.NotFoundModule),
        data: { breadcrumb: 'Sayfa Bulunamadı' }
      },
      {
        path: "**",
        loadChildren: () => import('./site-pages/not-found/not-found.module').then(m => m.NotFoundModule)
      }
    ]
  },

  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      enableTracing: false,
      scrollPositionRestoration: 'enabled',
      initialNavigation: 'enabled'
    },
  ),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
