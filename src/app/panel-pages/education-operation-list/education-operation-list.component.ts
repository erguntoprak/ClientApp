import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseService } from '../../shared/base.service';
import { EducationListModel } from '../../shared/models';
import Swal from 'sweetalert2';
import { AcdcLoadingService } from 'acdc-loading';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'se-education-operation-list',
  templateUrl: './education-operation-list.component.html'
})
export class EducationOperationListComponent implements OnInit {

  educationList: EducationListModel[];
  errorList = [];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  displayedColumns: string[] = ['name', 'categoryName', 'districtName', 'isActive', 'actions'];
  dataSource;

  constructor(private baseService: BaseService, private acdcLoadingService: AcdcLoadingService, private toastr: ToastrService) {

  }
  ngOnInit(): void {
    this.acdcLoadingService.showLoading();
    this.getAllEducationList();
  }
  
  getAllEducationList() {
    this.baseService.getAll<EducationListModel[]>("Education/GetAllEducationList").subscribe(educationList => {
      this.dataSource = new MatTableDataSource(educationList);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.acdcLoadingService.hideLoading();
    });
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
  deleteEducation(educationId: number) {
    Swal.fire({
      title: 'Silmek istediğinize emin misiniz ?',
      text: "Bu işlemi gerçekleştirdiğinizde geri alınamaz.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#6754e2',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Evet, sil!',
      cancelButtonText: 'Hayır'
    }).then((result) => {
      if (result.value) {
        this.baseService.delete("Education/DeleteEducation?educationId=", educationId).subscribe(data => {
          this.toastr.success('Eğitim Kurumu Silindi', 'Başarılı!');
          this.getAllEducationList();
        })
      }
    })
  }
  onActivateEducation(educationId: number, isActive: boolean) {
    Swal.fire({
      title: isActive ? 'Eğitim Kurumunu Aktif Et' : 'Eğitim Kurumunu Aktif Durumunu Geri Al',
      text: isActive ? "Eğitim Kurumunu aktif edilecek emin misiniz ?" : "Eğitim Kurumunu aktif durumu geri alınacak emin misiniz ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#6754e2',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Evet, onayla!',
      cancelButtonText: 'Hayır',
      focusCancel: true
    }).then((result) => {
      if (result.value) {
        this.baseService.post("Education/UpdateEducationActivate",
          { educationId: educationId, isActive: isActive }).subscribe(data => {
            this.toastr.success(isActive ? 'Eğitim Kurumunu Aktif Edildi.' : 'Eğitim Kurumunu Aktif Durumu Geri Alındı.', 'Başarılı!');
            this.getAllEducationList();
          });
      }
    })
  }
}
