import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseService } from '../../shared/base.service';
import { AttributeListModel } from '../../shared/models';
import Swal from 'sweetalert2';
import { AcdcLoadingService } from 'acdc-loading';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'se-attribute-list',
  templateUrl: './attribute-list.component.html'
})
export class AttributeListComponent implements OnInit {

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  displayedColumns: string[] = ['name','attributeCategoryName','actions'];
  dataSource;

  constructor(private baseService: BaseService, private acdcLoadingService: AcdcLoadingService, private toastr: ToastrService) {

  }
  ngOnInit(): void {
    this.getAllAttributeList();
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  getAllAttributeList() {
    this.acdcLoadingService.showLoading();
    this.baseService.getAll<AttributeListModel[]>("Attribute/GetAllAttributeList").subscribe(attributeList => {
      this.dataSource = new MatTableDataSource(attributeList);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.acdcLoadingService.hideLoading();
    });
  }
  

  onDeleteAttribute(attributeId: number) {
    Swal.fire({
      title: 'Özellik Silme',
      text: "Özellik silinecek emin misiniz ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#6754e2',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Evet, sil!',
      cancelButtonText: 'Hayır',
      focusCancel: true
    }).then((result) => {
      if (result.value) {
        this.baseService.post("Attribute/DeleteAttribute",
          attributeId).subscribe(data => {
            this.toastr.success('Özellik Silindi.', 'Başarılı!');
            this.getAllAttributeList();
            this.acdcLoadingService.hideLoading();
          });
      }
    })
  }

}

