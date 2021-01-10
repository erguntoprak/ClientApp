import { Component, OnInit } from '@angular/core';
import { CategoryModel } from '../../shared/models';
import { BaseService } from '../../shared/base.service';
import { AuthService } from 'src/app/_services/auth.service';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  categories: CategoryModel[];
  isUser: boolean = false;
  isMobile:boolean = false;
  constructor(private baseService: BaseService, private deviceService: DeviceDetectorService) {

  }
  ngOnInit(): void {
    const isMobile = this.deviceService.isMobile();
    if(isMobile){
      this.isMobile = isMobile;
    }
    this.baseService.getAll<CategoryModel[]>("Category/GetAllCategoryList").subscribe(categories => {
      this.categories = categories;
    });
    
    if (localStorage.getItem('currentUser')) {
      this.isUser = true;
    }
  }

}
