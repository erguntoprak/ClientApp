import { Component, OnInit } from '@angular/core';
import { BaseService } from '../../shared/base.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'se-contact',
  templateUrl: './contact.component.html'
})
export class ContactComponent implements OnInit {

  contactForm: FormGroup;
  submitted = false;
  contactFormSuccessMessage = false;
  contactFormDiv = true;


  constructor(private baseService: BaseService, private formBuilder: FormBuilder) {

  }
  ngOnInit(): void {
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
    this.baseService.post("Common/SendContactForm", this.contactForm.value).subscribe(data => {
      this.contactFormSuccessMessage = true;
      this.contactFormDiv = false;
    });

  }
}
