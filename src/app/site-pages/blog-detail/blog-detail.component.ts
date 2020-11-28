import { Component, OnInit } from '@angular/core';
import { BaseService } from '../../shared/base.service';
import { AcdcLoadingService } from 'acdc-loading';
import { ActivatedRoute } from '@angular/router';
import { BlogDetailModel } from '../../shared/models';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'se-blog-detail',
  templateUrl: './blog-detail.component.html'
})
export class BlogDetailComponent implements OnInit {

  apiUrl = environment.apiUrl;
  blogDetailModel: BlogDetailModel;

  constructor(private baseService: BaseService, private acdcLoadingService: AcdcLoadingService, private route: ActivatedRoute) {

  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.acdcLoadingService.showLoading();
      this.baseService.get<BlogDetailModel>("Blog/GetBlogDetailBySeoUrl?seoUrl=", params['name']).subscribe(data => {
        this.blogDetailModel = data;
        this.acdcLoadingService.hideLoading();
      })
    }); 
  }
}
