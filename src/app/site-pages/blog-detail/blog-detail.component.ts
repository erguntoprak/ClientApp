import { Component, OnInit } from '@angular/core';
import { BaseService } from '../../shared/base.service';
import { AcdcLoadingService } from 'acdc-loading';
import { ActivatedRoute } from '@angular/router';
import { BlogDetailModel } from '../../shared/models';
import { environment } from 'src/environments/environment';
import { SeoService } from 'src/app/_services/seo.service';

@Component({
  selector: 'se-blog-detail',
  templateUrl: './blog-detail.component.html'
})
export class BlogDetailComponent implements OnInit {

  apiUrl = environment.apiUrl;
  blogDetailModel: BlogDetailModel;

  constructor(private baseService: BaseService, private acdcLoadingService: AcdcLoadingService,
    private route: ActivatedRoute, private seoService: SeoService) {

  }
  ngOnInit(): void {
    this.seoService.updateMeta('robots', 'index, follow');
    this.route.params.subscribe(params => {
      this.acdcLoadingService.showLoading();
      this.baseService.get<BlogDetailModel>("Blog/GetBlogDetailBySeoUrl?seoUrl=", params['name']).subscribe(data => {
        this.blogDetailModel = data;
        this.seoService.updateTitle(this.blogDetailModel.title + ' - İzmir Eğitim Kurumları');
        this.seoService.updateCanonicalUrl(environment.baseUrl + '/blog/' + params['name']);
        this.seoService.updateMeta('keywords', 'uzaktan eğitim, izmir, eğitim, özel, ders, anaokul, eğitim kursu, kurs, milli eğitim, güncel eğitim, online eğitim, özel eğitim');
        this.seoService.updateMeta('description', this.blogDetailModel.title + ' - İzmir Eğitim Kurumları');

        //Facebook Meta Tag
        this.seoService.updateMeta('og:title', this.blogDetailModel.title + ' - İzmir Eğitim Kurumları');
        this.seoService.updateMeta('og:type', 'website');
        this.seoService.updateMeta('og:url', environment.baseUrl + '/blog/' + params['name']);
        this.seoService.updateMeta('og:image', `${environment.apiUrl}/images/blog/${this.blogDetailModel.firstVisibleImageName}_300x180.jpg`);
        this.seoService.updateMeta('og:site_name', 'İzmir Eğitim Kurumları');
        this.seoService.updateMeta('og:description', "İzmir'de bulunan özel anaokul, okul öncesi eğitim, özel öğretim kursu gibi birçok eğitim kurumunu İzmir Eğitim Kurumları ayrıcalıklarıyla bulabilirsin.");
        this.seoService.updateMeta('og:locale', 'tr_TR');
        this.seoService.updateMeta('og:image:secure_url',  `${environment.apiUrl}/images/${this.blogDetailModel.blogItems[0].imageName}_1000x600.jpg`);

        //Twitter Meta Tag
        this.seoService.updateMeta('twitter:title', this.blogDetailModel.title + ' - İzmir Eğitim Kurumları');
        this.seoService.updateMeta('twitter:description', "İzmir'de bulunan özel anaokul, okul öncesi eğitim, özel öğretim kursu gibi birçok eğitim kurumunu İzmir Eğitim Kurumları ayrıcalıklarıyla bulabilirsin.");
        this.seoService.updateMeta('twitter:image',  `${environment.apiUrl}/images/${this.blogDetailModel.blogItems[0].imageName}_1000x600.jpg`);
        this.seoService.updateMeta('twitter:card', 'summary_large_image');
        this.seoService.updateMeta('twitter:url', environment.baseUrl + '/blog/' + params['name']);

        this.acdcLoadingService.hideLoading();
      })
    });
  }
}
