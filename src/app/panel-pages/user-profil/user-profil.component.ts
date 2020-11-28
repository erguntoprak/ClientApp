import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/shared/base.service';
import { AcdcLoadingService } from 'acdc-loading';
import { ToastrService } from 'ngx-toastr';
import { UserModel } from 'src/app/shared/models';
import { AuthService } from 'src/app/_services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from 'src/app/_helpers/input-error-state-matcher';

@Component({
  selector: 'se-user-profil',
  templateUrl: './user-profil.component.html'
})
export class UserProfilComponent implements OnInit {
  
  userUpdateForm: FormGroup;
  errorList = [];
  matcher = new MyErrorStateMatcher();

  constructor(private formBuilder: FormBuilder, private baseService: BaseService,private authService: AuthService, private acdcLoadingService: AcdcLoadingService, private toastr: ToastrService) { }

  ngOnInit() {
    this.userUpdateForm = this.formBuilder.group({
      userId: [null,  Validators.required],
      userName: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      phoneNumber: [null, Validators.required],
      name: [null, Validators.required],
      surname: [null, Validators.required]
    });
    this.getUserDetail();
  }
  getUserDetail() {
    this.acdcLoadingService.showLoading();
    this.baseService.get<UserModel>("Account/GetUserByEmail?email=",this.authService.currentUser.value.email).subscribe(userModel => {
      this.userUpdateForm.patchValue(userModel);
      this.userUpdateForm.get('userId').setValue(userModel.id);
      this.acdcLoadingService.hideLoading();
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
        this.acdcLoadingService.hideLoading();
      });
  }

}
