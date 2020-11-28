import { Component, OnInit, NgZone } from '@angular/core';
import { BaseService } from '../../shared/base.service';
import { AcdcLoadingService } from 'acdc-loading';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from '../../_helpers/must-match.validator';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'se-user-reset-password',
  templateUrl: './user-reset-password.component.html'
})
export class UserResetPasswordComponent implements OnInit {

  userResetPasswordForm: FormGroup;
  submitted = false;
  userResetPasswordFormSuccessMessage = false;
  userResetPasswordFormDiv = true;
  errorList: string[] = [];


  constructor(private baseService: BaseService, private formBuilder: FormBuilder, private acdcLoadingService: AcdcLoadingService, private route: ActivatedRoute, private router: Router) {

  }
  ngOnInit(): void {
    this.userResetPasswordForm = this.formBuilder.group({
      userId: [null, Validators.required],
      password: [null, [Validators.required, Validators.minLength(6)]],
      confirmPassword: [null, [Validators.required, Validators.minLength(6)]],
      token:[null,Validators.required]
    },
      {
        validators: MustMatch('password', 'confirmPassword')
      }
    );
    this.route.queryParams.subscribe(params => {
      let userId = params['userId'];
      let token = params['confirmation-token'];
      this.userResetPasswordForm.get('userId').setValue(userId);
      this.userResetPasswordForm.get('token').setValue(token);
    });
  }
  userResetPasswordFormSubmit() {
    this.acdcLoadingService.showLoading();
    this.submitted = true;
    this.errorList = [];
    if (this.userResetPasswordForm.invalid) {
      this.acdcLoadingService.hideLoading();
      return;
    }
    this.baseService.post("Account/ResetPassword", this.userResetPasswordForm.value).subscribe(data => {
      this.userResetPasswordFormSuccessMessage = true;
      this.userResetPasswordFormDiv = false;
      this.acdcLoadingService.hideLoading();
      setTimeout(() => {
        this.router.navigate(['/giris-yap']);
      }, 5000);
    }
    );

  }
}
