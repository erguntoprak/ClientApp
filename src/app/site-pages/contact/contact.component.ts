import { Component, OnInit } from '@angular/core';
import { BaseService } from '../../shared/base.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AcdcLoadingService } from 'acdc-loading';
import { SeoService } from 'src/app/_services/seo.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'se-contact',
  templateUrl: './contact.component.html'
})
export class ContactComponent implements OnInit {

  contactForm: FormGroup;
  submitted = false;
  contactFormSuccessMessage = false;
  contactFormDiv = true;


  constructor(private baseService: BaseService, private formBuilder: FormBuilder, 
    private acdcLoadingService: AcdcLoadingService, private seoService: SeoService) {

  }
  ngOnInit(): void {
    this.seoService.updateMeta('robots','index, follow');
    this.seoService.updateTitle("İletişim - İzmir Eğitim Kurumları");
    this.seoService.updateCanonicalUrl(environment.baseUrl + '/iletisim');

    //Facebook Meta Tag
    this.seoService.updateMeta('og:title','İletişim - İzmir Eğitim Kurumları');
    this.seoService.updateMeta('og:type','website');
    this.seoService.updateMeta('og:url',environment.baseUrl + '/iletisim');
    this.seoService.updateMeta('og:image', environment.apiUrl + '/images/izmir-egitim-kurumlari.png');
    this.seoService.updateMeta('og:site_name','İzmir Eğitim Kurumları');
    this.seoService.updateMeta('og:description', "İzmir'de bulunan özel anaokul, okul öncesi eğitim, özel öğretim kursu gibi birçok eğitim kurumunu İzmir Eğitim Kurumları ayrıcalıklarıyla bulabilirsin.");
    this.seoService.updateMeta('og:locale','tr_TR');
    this.seoService.updateMeta('og:image:secure_url',environment.apiUrl + '/images/izmir-egitim-kurumlari.png');

    //Twitter Meta Tag
    this.seoService.updateMeta('twitter:title', 'İletişim - İzmir Eğitim Kurumları');
    this.seoService.updateMeta('twitter:description',"İzmir'de bulunan özel anaokul, okul öncesi eğitim, özel öğretim kursu gibi birçok eğitim kurumunu İzmir Eğitim Kurumları ayrıcalıklarıyla bulabilirsin.");
    this.seoService.updateMeta('twitter:image',environment.apiUrl + '/images/izmir-egitim-kurumlari.png');
    this.seoService.updateMeta('twitter:card','summary_large_image');
    this.seoService.updateMeta('twitter:url',environment.baseUrl + '/iletisim');
    
    this.contactForm = this.formBuilder.group({
      nameSurname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      message : ['',Validators.required],
      createDateTime: [new Date()]
    });
  }
  onContactFormSubmit() {
    this.submitted = true;
    if (this.contactForm.invalid) {
      return;
    }
    this.acdcLoadingService.showLoading();
    this.baseService.post("Common/SendContactForm", this.contactForm.value).subscribe(data => {
      this.contactFormSuccessMessage = true;
      this.contactFormDiv = false;
      this.acdcLoadingService.hideLoading();
    });

  }
}
