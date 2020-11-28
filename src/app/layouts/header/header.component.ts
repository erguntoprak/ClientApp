import { Component, OnInit } from '@angular/core';
import { CategoryModel } from '../../shared/models';
import { BaseService } from '../../shared/base.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  categories: CategoryModel[];
  isUser: boolean = false;;
  constructor(private baseService: BaseService, private authService: AuthService) {

  }
  ngOnInit(): void {
    this.baseService.getAll<CategoryModel[]>("Category/GetAllCategoryList").subscribe(categories => {
      this.categories = categories;
    });
    
    if (localStorage.getItem('currentUser')) {
      this.isUser = true;
    }
  }

}
