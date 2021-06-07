import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoryModel } from '../../shared/models';
import { BaseService } from '../../shared/base.service';
import { makeStateKey } from '@angular/platform-browser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {

  categories: CategoryModel[];
  isUser: boolean = false;
  isMobile: boolean = false;
  subscription: any;

  constructor(private baseService: BaseService) {

  }

  ngOnInit(): void {

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
    let $categoryListObservable = this.baseService.getAll<CategoryModel[]>("Category/GetAllCategoryList");
    const getAllCategoryListDataKey = makeStateKey("GetAllCategoryList");

    this.subscription = this.baseService.getCachedObservable<CategoryModel[]>($categoryListObservable, getAllCategoryListDataKey).subscribe(data => {
      this.categories = data;
    });

    if (localStorage.getItem('currentUser')) {
      this.isUser = true;
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
