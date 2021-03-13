import { Component, OnInit } from '@angular/core';
import { BaseService } from '../../shared/base.service';
import { AcdcLoadingService } from 'acdc-loading';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SeoService } from 'src/app/_services/seo.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'se-e-mail-confirmation',
  templateUrl: './e-mail-confirmation.component.html'
})
export class EmailConfirmationComponent implements OnInit {

  emailConfirmationForm: FormGroup;
  submitted = false;
  emailConfirmationFormSuccessMessage = false;
  emailConfirmationFormDiv = true;

  constructor(private baseService: BaseService, private formBuilder: FormBuilder,
     private acdcLoadingService: AcdcLoadingService, private seoService: SeoService) {

  }
  ngOnInit(): void {
    this.seoService.updateMeta('robots', 'noindex, follow');
    this.seoService.updateTitle("E-posta Onay Yeniden Gönder - İzmir Eğitim Kurumları");
    this.seoService.updateCanonicalUrl(environment.baseUrl + '/e-posta-onay-yeniden-gonder');

    this.seoService.updateMeta('description', "İzmir Eğitim Kurumları - E-posta Onay Yeniden Gönder");

    //Facebook Meta Tag
    this.seoService.updateMeta('og:title','E-posta Onay Yeniden Gönder - İzmir Eğitim Kurumları');
    this.seoService.updateMeta('og:type','website');
    this.seoService.updateMeta('og:url',environment.baseUrl + '/e-posta-onay-yeniden-gonder');
    this.seoService.updateMeta('og:image', environment.apiUrl + '/images/izmir-egitim-kurumlari.jpg');
    this.seoService.updateMeta('og:site_name','İzmir Eğitim Kurumları');
    this.seoService.updateMeta('og:description', "İzmir Eğitim Kurumları - E-posta Onay Yeniden Gönder");
    this.seoService.updateMeta('og:locale','tr_TR');
    this.seoService.updateMeta('og:image:secure_url',environment.apiUrl + '/images/izmir-egitim-kurumlari.jpg');

    //Twitter Meta Tag
    this.seoService.updateMeta('twitter:title', 'E-posta Onay Yeniden Gönder - İzmir Eğitim Kurumları');
    this.seoService.updateMeta('twitter:description',"İzmir Eğitim Kurumları - E-posta Onay Yeniden Gönder");
    this.seoService.updateMeta('twitter:image',environment.apiUrl + '/images/izmir-egitim-kurumlari.jpg');
    this.seoService.updateMeta('twitter:card','summary_large_image');
    this.seoService.updateMeta('twitter:url',environment.baseUrl + '/e-posta-onay-yeniden-gonder');
    
    this.emailConfirmationForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }
  onEmailConfirmationFormSubmit() {
    this.acdcLoadingService.showLoading();
    this.submitted = true;
    if (this.emailConfirmationForm.invalid) {
      this.acdcLoadingService.hideLoading();
      return;
    }
    this.baseService.post("Account/ResendEmailConfirmation", this.emailConfirmationForm.get('email').value).subscribe(data => {
      this.emailConfirmationFormSuccessMessage = true;
      this.emailConfirmationFormDiv = false;
      this.acdcLoadingService.hideLoading();
    }
    );

  }
}
