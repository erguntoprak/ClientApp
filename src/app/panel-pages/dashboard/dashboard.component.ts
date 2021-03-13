import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/shared/base.service';
import { AuthService } from 'src/app/_services/auth.service';
import { UserLoginModel, DashboardDataModel } from 'src/app/shared/models';
import { SeoService } from 'src/app/_services/seo.service';

@Component({
  selector: 'se-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashBoardComponent implements OnInit {
  userModel: UserLoginModel;
  dashboardDataModel: DashboardDataModel;

  constructor(private baseService: BaseService, private authService: AuthService, private seoService: SeoService) {

  }

  ngOnInit(): void {
    this.seoService.updateMeta('robots', 'noindex, nofollow');
    this.seoService.updateTitle("Panel - İzmir Eğitim Kurumları");
    this.userModel = this.authService.currentUser.value;
    this.baseService.getAll<DashboardDataModel>("Common/GetDashboardData").subscribe(dashboardDataModel => {
      this.dashboardDataModel = dashboardDataModel;
    });
  }
}
