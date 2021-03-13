import { Component, OnInit } from '@angular/core';
import { SeoService } from 'src/app/_services/seo.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-disclosure-text',
  templateUrl: './disclosure-text.component.html'
})
export class DisclosureTextComponent implements OnInit {

  constructor(private seoService: SeoService) { }

  ngOnInit() {
    this.seoService.updateMeta('robots', 'noindex, follow');
    this.seoService.updateTitle("Ki̇şi̇sel Veri̇leri̇n İşlenmesi̇ne İli̇şki̇n Aydınlatma Metni̇ - İzmir Eğitim Kurumları");
    this.seoService.updateCanonicalUrl(environment.baseUrl + '/ki̇si̇sel-veri̇leri̇n-islenmesi̇ne-ili̇ski̇n-aydınlatma-metni̇');
    
    this.seoService.updateMeta('description', "İzmir Eğitim Kurumları - Ki̇şi̇sel Veri̇leri̇n İşlenmesi̇ne İli̇şki̇n Aydınlatma Metni̇");

    //Facebook Meta Tag
    this.seoService.updateMeta('og:title','Ki̇şi̇sel Veri̇leri̇n İşlenmesi̇ne İli̇şki̇n Aydınlatma Metni̇ - İzmir Eğitim Kurumları');
    this.seoService.updateMeta('og:type','website');
    this.seoService.updateMeta('og:url', environment.baseUrl + '/ki̇si̇sel-veri̇leri̇n-islenmesi̇ne-ili̇ski̇n-aydınlatma-metni̇');
    this.seoService.updateMeta('og:image', environment.apiUrl + '/images/izmir-egitim-kurumlari.jpg');
    this.seoService.updateMeta('og:site_name','İzmir Eğitim Kurumları');
    this.seoService.updateMeta('og:description', "İzmir Eğitim Kurumları - Ki̇şi̇sel Veri̇leri̇n İşlenmesi̇ne İli̇şki̇n Aydınlatma Metni̇");
    this.seoService.updateMeta('og:locale','tr_TR');
    this.seoService.updateMeta('og:image:secure_url',environment.apiUrl + '/images/izmir-egitim-kurumlari.jpg');

    //Twitter Meta Tag
    this.seoService.updateMeta('twitter:title', 'Ki̇şi̇sel Veri̇leri̇n İşlenmesi̇ne İli̇şki̇n Aydınlatma Metni̇ - İzmir Eğitim Kurumları');
    this.seoService.updateMeta('twitter:description',"İzmir Eğitim Kurumları - Ki̇şi̇sel Veri̇leri̇n İşlenmesi̇ne İli̇şki̇n Aydınlatma Metni̇");
    this.seoService.updateMeta('twitter:image',environment.apiUrl + '/images/izmir-egitim-kurumlari.jpg');
    this.seoService.updateMeta('twitter:card','summary_large_image');
    this.seoService.updateMeta('twitter:url', environment.baseUrl + '/ki̇si̇sel-veri̇leri̇n-islenmesi̇ne-ili̇ski̇n-aydınlatma-metni̇');
  }

}
