import { Component, OnInit } from '@angular/core';
import { NavigationModel } from 'src/app/shared/models';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-panel-aside',
  templateUrl: './panel-aside.component.html'
})

export class PanelAsideComponent implements OnInit {

  navigationModelList: NavigationModel[];
  isUser:boolean;
  isAdmin:boolean;
  constructor(private authService:AuthService) {

  }

  ngOnInit(): void {
    this.isUser = this.authService.currentUser.value.roles.includes("User");
    this.isAdmin = this.authService.currentUser.value.roles.includes("Admin");
    this.navigationModelList = [
      {
        title: 'GENEL',
        key:'general',
        isVisible:this.isUser || this.isAdmin,
        navigationItems: [{ name: 'Panel', routeUrl: '/panel', icon: 'bx bx-home-circle', key: 'panel', isVisible: this.isUser || this.isAdmin }]
      },
      {
        title: 'EĞİTİM',
        key:'education',
        isVisible:this.isUser || this.isAdmin,
        navigationItems: [{ name: 'Eğitim Kurumları', routeUrl: '/panel/egitimler', icon: 'bx bx-list-check', key: 'education-list', isVisible: this.isUser || this.isAdmin },
        { name: 'Eğitim Ekle', routeUrl: '/panel/egitim-ekle', icon: 'bx bx-list-plus', key: 'education-add', isVisible: this.isUser || this.isAdmin }]
      },
      {
        title: 'BLOG',
        key:'blog',
        isVisible:this.isUser || this.isAdmin,
        navigationItems: [{ name: 'Blog Listesi', routeUrl: '/panel/blog-listesi', icon: 'bx bx-grid-horizontal', key: 'blog-list', isVisible: this.isUser || this.isAdmin },
        { name: 'Blog Ekle', routeUrl: '/panel/blog-ekle', icon: 'bx bx-list-plus', key: 'blog-add', isVisible: this.isUser || this.isAdmin }]
      },
      {
        title: 'ADMIN İŞLEMLERİ',
        key:'admin',
        isVisible:this.isAdmin,
        navigationItems: [{ name: 'Kullanıcı İşlemleri', routeUrl: '/panel/kullanici-listesi', icon: 'bx bx-grid-alt', key: 'user-list', isVisible: this.isAdmin },
        { name: 'Kategori İşlemleri', routeUrl: '/panel/kategori-listesi', icon: 'bx bx-grid-alt', key: 'category-list', isVisible: this.isAdmin },
        { name: 'Özellik Kategori İşlemleri', routeUrl: '/panel/ozellik-kategori-listesi', icon: 'bx bx-grid-alt', key: 'category-list', isVisible: this.isAdmin },
        { name: 'Özellik İşlemleri', routeUrl: '/panel/ozellik-listesi', icon: 'bx bx-grid-alt', key: 'attribute-list', isVisible: this.isAdmin },
        { name: 'Eğitim Kurumu İşlemleri', routeUrl: '/panel/egitim-islemleri', icon: 'bx bx-grid-alt', key: 'education-operation-list', isVisible: this.isAdmin },
        { name: 'Blog İşlemleri', routeUrl: '/panel/blog-islemleri', icon: 'bx bx-grid-alt', key: 'blog-operation-list', isVisible: this.isAdmin }
      ]
      }
    ]
  }

}
