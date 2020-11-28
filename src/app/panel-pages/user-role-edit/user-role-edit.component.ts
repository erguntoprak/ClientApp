import { Component, OnInit } from '@angular/core';
import { BaseService } from '../../shared/base.service';
import { RoleModel } from '../../shared/models';
import { AcdcLoadingService } from 'acdc-loading';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'se-user-role-edit',
  templateUrl: './user-role-edit.component.html'
})
export class UserRoleEditComponent implements OnInit {

  roleList: RoleModel[];
  userId: string;
  selectedRoles: string[] = [];

  constructor(private baseService: BaseService, private acdcLoadingService: AcdcLoadingService, private route: ActivatedRoute, private toastr: ToastrService, private router: Router) {

  }
  ngOnInit(): void {
    this.acdcLoadingService.showLoading();
    this.baseService.getAll<RoleModel[]>("Account/GetAllRoleList").subscribe(roleList => {
      this.roleList = roleList;
      this.acdcLoadingService.hideLoading();
    });
    this.route.params.subscribe(params => {
      this.userId = params['userId'];
    });
  }

  onChangeUserRole() {
    this.baseService.post("Account/UpdateUserRole",
      { userId: this.userId, roles: this.selectedRoles }).subscribe(data => {
        this.toastr.success(data.message, 'Başarılı!');
        this.router.navigate(['/panel/kullanici-listesi']);
      });
  }
}

