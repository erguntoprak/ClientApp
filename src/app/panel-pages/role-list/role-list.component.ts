import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseService } from '../../shared/base.service';
import { AcdcLoadingService } from 'acdc-loading';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { SeoService } from 'src/app/_services/seo.service';
import { RoleModel } from 'src/app/shared/models';

@Component({
  selector: 'se-role-list',
  templateUrl: './role-list.component.html'
})
export class RoleListComponent implements OnInit {

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  displayedColumns: string[] = ['name'];
  dataSource;

  constructor(private baseService: BaseService, private acdcLoadingService: AcdcLoadingService,
    private seoService: SeoService) {

  }
  ngOnInit(): void {
    this.seoService.updateMeta('robots', 'noindex, nofollow');
    this.seoService.updateTitle("Panel - İzmir Eğitim Kurumları");
    this.getAllRoleList();
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }



  getAllRoleList() {
    this.acdcLoadingService.showLoading();
    this.baseService.getAll<RoleModel[]>("Account/GetAllRoleList").subscribe(roleList => {
      this.dataSource = new MatTableDataSource(roleList);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.acdcLoadingService.hideLoading();
    });
  }
}

