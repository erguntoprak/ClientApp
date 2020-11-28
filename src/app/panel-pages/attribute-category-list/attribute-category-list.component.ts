import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseService } from '../../shared/base.service';
import { AttributeCategoryModel } from '../../shared/models';
import Swal from 'sweetalert2';
import { AcdcLoadingService } from 'acdc-loading';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'se-attribute-category-list',
  templateUrl: './attribute-category-list.component.html'
})
export class AttributeCategoryListComponent implements OnInit {

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  displayedColumns: string[] = ['name','actions'];
  dataSource;

  constructor(private baseService: BaseService, private acdcLoadingService: AcdcLoadingService, private toastr: ToastrService) {

  }
  ngOnInit(): void {
    this.getAllAttributeCategoryList();
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  getAllAttributeCategoryList() {
    this.acdcLoadingService.showLoading();
    this.baseService.getAll<AttributeCategoryModel[]>("AttributeCategory/GetAllAttributeCategoryList").subscribe(attributeCategoryList => {
      this.dataSource = new MatTableDataSource(attributeCategoryList);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.acdcLoadingService.hideLoading();
    });
  }
  

  onDeleteAttributeCategory(attributeCategoryId: number) {
    Swal.fire({
      title: 'Özellik Kategori Silme',
      text: "Özellik Kategori silinecek emin misiniz ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#6754e2',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Evet, sil!',
      cancelButtonText: 'Hayır',
      focusCancel: true
    }).then((result) => {
      if (result.value) {
        this.baseService.post("AttributeCategory/DeleteAttributeCategory",
          attributeCategoryId).subscribe(data => {
            this.toastr.success('Özellik Kategori Silindi.', 'Başarılı!');
            this.getAllAttributeCategoryList();
            this.acdcLoadingService.hideLoading();
          });
      }
    })
  }

}

