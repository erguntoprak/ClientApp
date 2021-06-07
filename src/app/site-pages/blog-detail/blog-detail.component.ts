import { Component, OnDestroy, OnInit } from '@angular/core';
import { BaseService } from '../../shared/base.service';
import { ActivatedRoute } from '@angular/router';
import { BlogDetailModel, BlogListModel, EducationListModel } from '../../shared/models';
import { environment } from 'src/environments/environment';
import { SeoService } from 'src/app/_services/seo.service';
import { makeStateKey } from '@angular/platform-browser';

@Component({
  selector: 'se-blog-detail',
  templateUrl: './blog-detail.component.html'
})
export class BlogDetailComponent implements OnInit, OnDestroy {

  apiUrl = environment.apiUrl;
  blogDetailModel: BlogDetailModel;
  subscription: any;
  educationList: EducationListModel[];
  blogListModel: BlogListModel[];



  constructor(private baseService: BaseService,
    private route: ActivatedRoute, private seoService: SeoService) {

  }
  ngOnInit(): void {
    this.seoService.updateMeta('robots', 'index, follow');
    this.subscription = this.route.params.subscribe(params => {
      const dataKey = makeStateKey(params['name']);
      const getAllEducationListByRandomCategoryIdDataKey = makeStateKey("GetAllEducationListByRandomCategoryIdCount5");
      const $dataSource = this.baseService.get("Blog/GetBlogDetailBySeoUrl?seoUrl=", params['name']);
      let $educationListObservable = this.baseService.getAll<EducationListModel[]>("Education/GetAllEducationListByRandomCategoryId?count=5");

      this.baseService.getCachedObservable<EducationListModel[]>($educationListObservable,getAllEducationListByRandomCategoryIdDataKey).subscribe(data=>{
        this.educationList = data;
      });

      const blogViewListDataKey = makeStateKey("blogviewlistcount5");
      const $blogViewListObservable = this.baseService.getAll<BlogListModel[]>("Blog/GetAllBlogViewList?count=5");
      this.baseService.getCachedObservable($blogViewListObservable,blogViewListDataKey).subscribe(data => {
        this.blogListModel = data;
      });

      this.baseService.getCachedObservable<any>($dataSource, dataKey).subscribe(data => {
        this.blogDetailModel = data;
        this.seoService.updateTitle(this.blogDetailModel.metaTitle);
        this.seoService.updateCanonicalUrl(environment.baseUrl + '/blog/' + params['name']);
        this.seoService.updateMeta('description', this.blogDetailModel.metaDescription);

        //Facebook Meta Tag
        this.seoService.updateMeta('og:title', this.blogDetailModel.metaTitle);
        this.seoService.updateMeta('og:type', 'website');
        this.seoService.updateMeta('og:url', environment.baseUrl + '/blog/' + params['name']);
        this.seoService.updateMeta('og:image', `${environment.apiUrl}/images/blog/${this.blogDetailModel.firstVisibleImageName}_300x180.jpg`);
        this.seoService.updateMeta('og:site_name', 'İzmir Eğitim Kurumları');
        this.seoService.updateMeta('og:description', this.blogDetailModel.metaDescription);
        this.seoService.updateMeta('og:locale', 'tr_TR');
        this.seoService.updateMeta('og:image:secure_url', `${environment.apiUrl}/images/blog/${this.blogDetailModel.firstVisibleImageName}_300x180.jpg`);

        //Twitter Meta Tag
        this.seoService.updateMeta('twitter:title', this.blogDetailModel.metaTitle);
        this.seoService.updateMeta('twitter:description', this.blogDetailModel.metaDescription);
        this.seoService.updateMeta('twitter:image',  `${environment.apiUrl}/images/blog/${this.blogDetailModel.firstVisibleImageName}_300x180.jpg`);
        this.seoService.updateMeta('twitter:card', 'summary_large_image');
        this.seoService.updateMeta('twitter:url', environment.baseUrl + '/blog/' + params['name']);
      })
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
