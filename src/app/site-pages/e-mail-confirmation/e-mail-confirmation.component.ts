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
    this.seoService.updateTitle("E-posta Onay Yeniden Gönder - İzmir Eğitim Kurumları");
    this.seoService.updateCanonicalUrl(environment.baseUrl + '/e-posta-onay-yeniden-gonder');
    
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
