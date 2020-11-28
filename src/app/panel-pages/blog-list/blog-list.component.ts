import { Component, OnInit } from '@angular/core';
import { BaseService } from '../../shared/base.service';
import { BlogListModel } from '../../shared/models';
import Swal from 'sweetalert2';
import * as _ from 'lodash';
import { AcdcLoadingService } from 'acdc-loading';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'se-blog-list',
  templateUrl: './blog-list.component.html'
})
export class BlogListComponent implements OnInit {

  blogList : BlogListModel[];
  errorList = [];
  apiUrl = environment.apiUrl;

  constructor(private baseService: BaseService, private acdcLoadingService: AcdcLoadingService) {

  }
  ngOnInit(): void {
    this.acdcLoadingService.showLoading();
    this.baseService.getAll<BlogListModel[]>("Blog/GetAllBlogListByUserId").subscribe(blogList => {
      this.blogList = blogList;
      this.acdcLoadingService.hideLoading();
    });
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
      cancelButtonText:'Hayır'
    }).then((result) => {
      if (result.value) {
        this.baseService.delete("Blog/DeleteBlog?blogId=", blogId).subscribe(data => {
          Swal.fire(
            'Silindi!',
            '',
            'success'
          );
          _.remove(this.blogList,(blog) => {
            return blog.id == blogId;
          });
        })
       
      }
    })
  }

}
