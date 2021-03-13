import { Component, OnInit } from '@angular/core';
import { SeoService } from 'src/app/_services/seo.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cookie-consent',
  templateUrl: './cookie-consent.component.html'
})
export class CookieConsentComponent implements OnInit {

  constructor(private seoService: SeoService) { }

  ngOnInit() {
    this.seoService.updateMeta('robots', 'noindex, follow');
    this.seoService.updateTitle("Çerez Politikası - İzmir Eğitim Kurumları");
    this.seoService.updateCanonicalUrl(environment.baseUrl + '/cerez-politikasi');

    this.seoService.updateMeta('description', "İzmir Eğitim Kurumları - Çerez Politikası");

    //Facebook Meta Tag
    this.seoService.updateMeta('og:title','Çerez Politikası - İzmir Eğitim Kurumları');
    this.seoService.updateMeta('og:type','website');
    this.seoService.updateMeta('og:url',environment.baseUrl + '/cerez-politikasi');
    this.seoService.updateMeta('og:image', environment.apiUrl + '/images/izmir-egitim-kurumlari.jpg');
    this.seoService.updateMeta('og:site_name','İzmir Eğitim Kurumları');
    this.seoService.updateMeta('og:description', "İzmir Eğitim Kurumları - Çerez Politikası");
    this.seoService.updateMeta('og:locale','tr_TR');
    this.seoService.updateMeta('og:image:secure_url',environment.apiUrl + '/images/izmir-egitim-kurumlari.jpg');

    //Twitter Meta Tag
    this.seoService.updateMeta('twitter:title', 'Çerez Politikası - İzmir Eğitim Kurumları');
    this.seoService.updateMeta('twitter:description',"İzmir Eğitim Kurumları - Çerez Politikası");
    this.seoService.updateMeta('twitter:image',environment.apiUrl + '/images/izmir-egitim-kurumlari.jpg');
    this.seoService.updateMeta('twitter:card','summary_large_image');
    this.seoService.updateMeta('twitter:url',environment.baseUrl + '/cerez-politikasi');
  }

}
