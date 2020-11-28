import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/shared/base.service';
import { AuthService } from 'src/app/_services/auth.service';
import { UserLoginModel, DashboardDataModel } from 'src/app/shared/models';

@Component({
  selector: 'se-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashBoardComponent implements OnInit {
  userModel: UserLoginModel;
  dashboardDataModel: DashboardDataModel;

  constructor(private baseService: BaseService, private authService: AuthService) {

  }

  ngOnInit(): void {
    this.userModel = this.authService.currentUser.value;
    this.baseService.get<DashboardDataModel>("Common/GetDashboardData?UserId=", this.userModel.userId).subscribe(dashboardDataModel => {
      this.dashboardDataModel = dashboardDataModel;
    });
  }
}
