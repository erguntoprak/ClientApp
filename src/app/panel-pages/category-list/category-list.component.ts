import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseService } from '../../shared/base.service';
import { UserListModel, CategoryModel } from '../../shared/models';
import Swal from 'sweetalert2';
import { AcdcLoadingService } from 'acdc-loading';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'se-category-list',
  templateUrl: './category-list.component.html'
})
export class CategoryListComponent implements OnInit {

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  displayedColumns: string[] = ['name','actions'];
  userList: UserListModel[];
  dataSource;

  constructor(private baseService: BaseService, private acdcLoadingService: AcdcLoadingService, private toastr: ToastrService) {

  }
  ngOnInit(): void {
    this.getAllCategoryList();
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  getAllCategoryList() {
    this.acdcLoadingService.showLoading();
    this.baseService.getAll<CategoryModel[]>("Category/GetAllCategoryList").subscribe(categoryList => {
      this.dataSource = new MatTableDataSource(categoryList);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.acdcLoadingService.hideLoading();
    });
  }
  

  onDeleteCategory(categoryId: number) {
    Swal.fire({
      title: 'Kategori Silme',
      text: "Kategori silinecek emin misiniz ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#6754e2',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Evet, sil!',
      cancelButtonText: 'Hayır',
      focusCancel: true
    }).then((result) => {
      if (result.value) {
        this.baseService.post("Category/DeleteCategory",
          categoryId).subscribe(data => {
            this.toastr.success('Kategori Silindi.', 'Başarılı!');
            this.getAllCategoryList();
            this.acdcLoadingService.hideLoading();
          });
      }
    })
  }

}

