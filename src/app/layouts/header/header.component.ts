import { Component, OnInit } from '@angular/core';
import { CategoryModel } from '../../shared/models';
import { BaseService } from '../../shared/base.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  categories: CategoryModel[];
  isUser: boolean = false;
  isMobile:boolean = false;
  constructor(private baseService: BaseService) {

  }
  ngOnInit(): void {

    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
      this.isMobile = true;
    }else{
      this.isMobile = false;
    }
    
    this.baseService.getAll<CategoryModel[]>("Category/GetAllCategoryList").subscribe(categories => {
      this.categories = categories;
    });
    
    if (localStorage.getItem('currentUser')) {
      this.isUser = true;
    }
  }

}
