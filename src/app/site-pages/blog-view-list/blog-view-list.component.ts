import { Component, OnInit } from '@angular/core';
import { BaseService } from '../../shared/base.service';
import { AcdcLoadingService } from 'acdc-loading';
import { ActivatedRoute } from '@angular/router';
import { BlogListModel } from '../../shared/models';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'se-blog-view-list',
  templateUrl: './blog-view-list.component.html'
})
export class BlogViewListComponent implements OnInit {
  
  apiUrl = environment.apiUrl;
  blogListModel: BlogListModel;

  constructor(private baseService: BaseService, private acdcLoadingService: AcdcLoadingService, private route: ActivatedRoute) {

  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.acdcLoadingService.showLoading();
      let userName = params['userName'];
      if (userName != undefined) {
        this.baseService.get<BlogListModel>("Blog/GetAllBlogListByUserName?userName=", userName).subscribe(data => {
          this.blogListModel = data;
          this.acdcLoadingService.hideLoading();
        });
      }
      else {
        this.baseService.getAll<BlogListModel>("Blog/GetAllBlogViewList").subscribe(data => {
          this.blogListModel = data;
          this.acdcLoadingService.hideLoading();
        });
      }
    });
  }
}
