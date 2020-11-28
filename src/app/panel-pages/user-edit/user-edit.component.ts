import { Component, OnInit } from '@angular/core';
import { BaseService } from '../../shared/base.service';
import { AcdcLoadingService } from 'acdc-loading';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '../../_helpers/input-error-state-matcher';
import { UserModel } from 'src/app/shared/models';


@Component({
  selector: 'se-user-edit',
  templateUrl: './user-edit.component.html'
})
export class UserEditComponent implements OnInit {

  userUpdateForm: FormGroup;
  errorList = [];
  matcher = new MyErrorStateMatcher();

  constructor(private formBuilder: FormBuilder, private baseService: BaseService, private acdcLoadingService: AcdcLoadingService, private route: ActivatedRoute, private toastr: ToastrService, private router: Router) {

  }
  ngOnInit(): void {
    this.acdcLoadingService.showLoading();
    this.userUpdateForm = this.formBuilder.group({
      userId: [null, Validators.required],
      userName: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      phoneNumber: [null, Validators.required],
      name: [null, Validators.required],
      surname: [null, Validators.required]
    });
    this.route.params.subscribe(params => {
      let userId = params['userId'];
      this.userUpdateForm.get('userId').setValue(userId);
      this.baseService.get<UserModel>("Account/GetUserById?userId=", userId).subscribe(userModel => {
        this.userUpdateForm.patchValue(userModel);
        this.acdcLoadingService.hideLoading();
      });
    });
  }
  onSubmit() {
    this.acdcLoadingService.showLoading();
    if (this.userUpdateForm.invalid) {
      this.acdcLoadingService.hideLoading();
      return;
    }
    this.baseService.post("Account/UpdateUser",
      this.userUpdateForm.value).subscribe(data => {
        this.toastr.success('Güncelleme işlemi gerçekleşti.', 'Başarılı!');
        this.router.navigate(['/panel/kullanici-listesi']);
        this.acdcLoadingService.hideLoading();
      });
  }
}

