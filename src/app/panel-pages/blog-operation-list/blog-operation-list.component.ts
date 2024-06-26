import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseService } from '../../shared/base.service';
import { BlogListModel } from '../../shared/models';
import Swal from 'sweetalert2';
import { AcdcLoadingService } from 'acdc-loading';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { SeoService } from 'src/app/_services/seo.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'se-blog-operation-list',
  templateUrl: './blog-operation-list.component.html'
})
export class BlogOperationListComponent implements OnInit {

  blogList : BlogListModel[];
  isAdmin:boolean;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  displayedColumns: string[] = ['title', 'createTime', 'isActive', 'actions'];
  dataSource;

  constructor(private baseService: BaseService, private acdcLoadingService: AcdcLoadingService, 
    private toastr: ToastrService, private seoService: SeoService, private authService:AuthService) {

  }
  ngOnInit(): void {
    this.isAdmin = this.authService.currentUser.value.roles.includes("Admin");
    this.seoService.updateMeta('robots', 'noindex, nofollow');
    this.seoService.updateTitle("Panel - İzmir Eğitim Kurumları");
    this.acdcLoadingService.showLoading();
    this.getAllBlogList();
  }
  getAllBlogList() {
    this.baseService.getAll<BlogListModel[]>("Blog/GetAllBlogList").subscribe(blogList => {
      this.dataSource = new MatTableDataSource(blogList);
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
  deleteBlog(blogId: number) {
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
        this.baseService.delete("Blog/DeleteBlog?blogId=", blogId).subscribe(data => {
          this.toastr.success('Eğitim Kurumu Silindi', 'Başarılı!');
          this.getAllBlogList();
        })
      }
    })
  }
  onActivateBlog(blogId: number, isActive: boolean) {
    Swal.fire({
      title: isActive ? 'Blog Aktif Et' : 'Blog Aktif Durumunu Geri Al',
      text: isActive ? "Blog aktif edilecek emin misiniz ?" : "Blog aktif durumu geri alınacak emin misiniz ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#6754e2',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Evet, onayla!',
      cancelButtonText: 'Hayır',
      focusCancel: true
    }).then((result) => {
      if (result.value) {
        this.baseService.post("Blog/UpdateBlogActivate",
          { blogId: blogId, isActive: isActive }).subscribe(data => {
            this.toastr.success(isActive ? 'Blog Aktif Edildi.' : 'Blog Aktif Durumu Geri Alındı.', 'Başarılı!');
            this.getAllBlogList();
          });
      }
    })
  }
}
