import { Component, OnDestroy, OnInit } from '@angular/core';
import { BaseService } from '../../shared/base.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SeoService } from 'src/app/_services/seo.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'se-e-mail-confirmation-message',
  templateUrl: './e-mail-confirmation-message.component.html'
})
export class EmailConfirmationMessageComponent implements OnInit, OnDestroy {

  isEmailConfirmationSuccessMessage = false;
  emailConfirmationSuccessMessage : string;
  subscription: any;

  constructor(private baseService: BaseService, private route: ActivatedRoute, private router:Router,
     private seoService: SeoService) {

  }
  ngOnInit(): void {
    
    this.seoService.updateMeta('robots', 'noindex, follow');
    this.seoService.updateTitle("E-posta Onay - İzmir Eğitim Kurumları");
    this.seoService.updateCanonicalUrl(environment.baseUrl + '/e-posta-onay');

    this.seoService.updateMeta('description', "İzmir Eğitim Kurumları - E-posta Onay");

    //Facebook Meta Tag
    this.seoService.updateMeta('og:title','E-posta Onay - İzmir Eğitim Kurumları');
    this.seoService.updateMeta('og:type','website');
    this.seoService.updateMeta('og:url',environment.baseUrl + '/e-posta-onay');
    this.seoService.updateMeta('og:image', environment.apiUrl + '/images/izmir-egitim-kurumlari.jpg');
    this.seoService.updateMeta('og:site_name','İzmir Eğitim Kurumları');
    this.seoService.updateMeta('og:description', "İzmir Eğitim Kurumları - E-posta Onay");
    this.seoService.updateMeta('og:locale','tr_TR');
    this.seoService.updateMeta('og:image:secure_url',environment.apiUrl + '/images/izmir-egitim-kurumlari.jpg');

    //Twitter Meta Tag
    this.seoService.updateMeta('twitter:title', 'E-posta Onay - İzmir Eğitim Kurumları');
    this.seoService.updateMeta('twitter:description',"İzmir Eğitim Kurumları - E-posta Onay");
    this.seoService.updateMeta('twitter:image',environment.apiUrl + '/images/izmir-egitim-kurumlari.jpg');
    this.seoService.updateMeta('twitter:card','summary_large_image');
    this.seoService.updateMeta('twitter:url',environment.baseUrl + '/e-posta-onay');

    this.subscription = this.route.queryParams.subscribe(params => {
      if (params['userId'] && params['confirmation-token']) {
        this.baseService.post("Account/EmailConfirmation", { userId: params['userId'], confirmationToken: params['confirmation-token'] }).subscribe(response => {
          this.isEmailConfirmationSuccessMessage = true;
          this.emailConfirmationSuccessMessage = response.message;
          setTimeout(() => {
            this.router.navigate(['/giris-yap']);
          }, 5000);
        }
        );
      }
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
