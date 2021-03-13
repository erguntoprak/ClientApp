import { Component, OnDestroy, OnInit } from '@angular/core';
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
export class BlogViewListComponent implements OnInit, OnDestroy {

  apiUrl = environment.apiUrl;
  blogListModel: BlogListModel;
  targetValue:string = "_blank";
  subscription: any;

  constructor(private baseService: BaseService,
    private route: ActivatedRoute, private seoService: SeoService) {

  }
  ngOnInit(): void {
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
      this.targetValue = "_self";
    }
    this.seoService.updateTitle('Eğitimle İlgili Bloglar - İzmir Eğitim Kurumları');
    this.seoService.updateCanonicalUrl(environment.baseUrl + '/bloglar');

    this.seoService.updateMeta('robots', 'index, follow');
    this.seoService.updateMeta('description', "İzmir buca, bornova, karşıyaka, konak, bayraklı, çiğli, balçova, gaziemir, kreş, anaokulu, özel öğretim kursu, ilkokul, ortaokul, lise, yabancı dil kursları");

    //Facebook Meta Tag
    this.seoService.updateMeta('og:title', 'Eğitimle İlgili Bloglar - İzmir Eğitim Kurumları');
    this.seoService.updateMeta('og:type', 'website');
    this.seoService.updateMeta('og:url', environment.baseUrl + '/bloglar');
    this.seoService.updateMeta('og:image', environment.apiUrl + '/images/izmir-egitim-kurumlari.jpg');
    this.seoService.updateMeta('og:site_name', 'İzmir Eğitim Kurumları');
    this.seoService.updateMeta('og:description', "İzmir buca, bornova, karşıyaka, konak, bayraklı, çiğli, balçova, gaziemir, kreş, anaokulu, özel öğretim kursu, ilkokul, ortaokul, lise, yabancı dil kursları");
    this.seoService.updateMeta('og:locale', 'tr_TR');
    this.seoService.updateMeta('og:image:secure_url', environment.apiUrl + '/images/izmir-egitim-kurumlari.jpg');

    //Twitter Meta Tag
    this.seoService.updateMeta('twitter:title', 'Eğitimle İlgili Bloglar - İzmir Eğitim Kurumları');
    this.seoService.updateMeta('twitter:description', "İzmir buca, bornova, karşıyaka, konak, bayraklı, çiğli, balçova, gaziemir, kreş, anaokulu, özel öğretim kursu, ilkokul, ortaokul, lise, yabancı dil kursları");
    this.seoService.updateMeta('twitter:image', environment.apiUrl + '/images/izmir-egitim-kurumlari.jpg');
    this.seoService.updateMeta('twitter:card', 'summary_large_image');
    this.seoService.updateMeta('twitter:url', environment.baseUrl + '/bloglar');


    this.subscription = this.route.params.subscribe(params => {
      let userName = params['userName'];
      if (userName != undefined) {
        this.baseService.get<BlogListModel>("Blog/GetAllBlogListByUserName?userName=", userName).subscribe(data => {
          this.blogListModel = data;
        });
      }
      else {
        this.baseService.getAll<BlogListModel>("Blog/GetAllBlogViewList").subscribe(data => {
          this.blogListModel = data;
        });
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
