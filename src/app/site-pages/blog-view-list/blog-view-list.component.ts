import { Component, OnInit } from '@angular/core';
import { BaseService } from '../../shared/base.service';
import { AcdcLoadingService } from 'acdc-loading';
import { ActivatedRoute } from '@angular/router';
import { BlogListModel } from '../../shared/models';
import { environment } from 'src/environments/environment';
import { SeoService } from 'src/app/_services/seo.service';

@Component({
  selector: 'se-blog-view-list',
  templateUrl: './blog-view-list.component.html'
})
export class BlogViewListComponent implements OnInit {

  apiUrl = environment.apiUrl;
  blogListModel: BlogListModel;

  constructor(private baseService: BaseService, private acdcLoadingService: AcdcLoadingService,
    private route: ActivatedRoute, private seoService: SeoService) {

  }
  ngOnInit(): void {
    this.seoService.updateTitle('Eğitim Yazıları ve Blogları - İzmir Eğitim Kurumları');
    this.seoService.updateCanonicalUrl(environment.baseUrl + '/bloglar');

    this.seoService.updateMeta('robots', 'index, follow');
    this.seoService.updateMeta('keywords', 'uzaktan eğitim, izmir, eğitim, özel, ders, anaokul, eğitim kursu, kurs, milli eğitim, güncel eğitim, online eğitim, özel eğitim');
    this.seoService.updateMeta('description', "İzmir'de bulunan özel anaokul, okul öncesi eğitim, özel öğretim kursu gibi birçok eğitim kurumunu İzmir Eğitim Kurumları ayrıcalıklarıyla bulabilirsin.");

    //Facebook Meta Tag
    this.seoService.updateMeta('og:title', 'Eğitim Yazıları ve Blogları - İzmir Eğitim Kurumları');
    this.seoService.updateMeta('og:type', 'website');
    this.seoService.updateMeta('og:url', environment.baseUrl + '/bloglar');
    this.seoService.updateMeta('og:image', environment.apiUrl + '/images/izmir-egitim-kurumlari.png');
    this.seoService.updateMeta('og:site_name', 'İzmir Eğitim Kurumları');
    this.seoService.updateMeta('og:description', "İzmir'de bulunan özel anaokul, okul öncesi eğitim, özel öğretim kursu gibi birçok eğitim kurumunu İzmir Eğitim Kurumları ayrıcalıklarıyla bulabilirsin.");
    this.seoService.updateMeta('og:locale', 'tr_TR');
    this.seoService.updateMeta('og:image:secure_url', environment.apiUrl + '/images/izmir-egitim-kurumlari.png');

    //Twitter Meta Tag
    this.seoService.updateMeta('twitter:title', 'Eğitim Yazıları ve Blogları - İzmir Eğitim Kurumları');
    this.seoService.updateMeta('twitter:description', "İzmir'de bulunan özel anaokul, okul öncesi eğitim, özel öğretim kursu gibi birçok eğitim kurumunu İzmir Eğitim Kurumları ayrıcalıklarıyla bulabilirsin.");
    this.seoService.updateMeta('twitter:image', environment.apiUrl + '/images/izmir-egitim-kurumlari.png');
    this.seoService.updateMeta('twitter:card', 'summary_large_image');
    this.seoService.updateMeta('twitter:url', environment.baseUrl + '/bloglar');


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
