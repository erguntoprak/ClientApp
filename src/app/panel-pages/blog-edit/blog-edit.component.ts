import { Component, OnInit } from '@angular/core';
import { BaseService } from '../../shared/base.service';
import { AcdcLoadingService } from 'acdc-loading';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogUpdateModel, BlogItemModel } from '../../shared/models';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'se-blog-edit',
  templateUrl: './blog-edit.component.html'
})
export class BlogEditComponent implements OnInit {

  blogUpdateModel: BlogUpdateModel;
  errorList = [];
  blogUpdateForm: FormGroup;
  submitted = false;
  firstVisibleImageName: string;
  blogItemList = [];



  constructor(private baseService: BaseService, private acdcLoadingService: AcdcLoadingService, private route: ActivatedRoute, private formBuilder: FormBuilder, private router: Router, private toastr: ToastrService) {

  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.acdcLoadingService.showLoading();
      this.baseService.get<BlogUpdateModel>("Blog/GetBlogUpdateBySeoUrl?seoUrl=", params['name']).subscribe(blogUpdateModel => {
        this.blogUpdateForm.patchValue(blogUpdateModel);
        
        this.firstVisibleImageName = `${environment.apiUrl}/images/blog/${blogUpdateModel.firstVisibleImageName}_300x180.jpg`
        blogUpdateModel.blogItems.forEach(blogItem => {
          this.addExistingBlogItem(blogItem);
          this.blogItemList.push(`${environment.apiUrl}/images/blog/${blogItem.imageName}_1000x600.jpg`)
        });
        this.acdcLoadingService.hideLoading();
      })
    });

    this.blogUpdateForm = this.formBuilder.group({
      id:[-1,Validators.required],
      title: ['', Validators.required],
      firstVisibleImageName: ['', Validators.required],
      blogItems: this.formBuilder.array([])
    });
  }
  onUpdateBlogSubmit() {
    this.submitted = true;
    if (this.blogUpdateForm.invalid) {
      return;
    }
    this.acdcLoadingService.showLoading();
    this.baseService.post("Blog/UpdateBlog", this.blogUpdateForm.value).subscribe(data => {
      this.router.navigate(['/panel/blog-listesi']);
      this.toastr.success('Güncelleme işlemi başarılı şekilde gerçekleşti.', 'Başarılı!');
      this.acdcLoadingService.hideLoading();
    });
  }
  getBlogItemControl() {
    let blogItems = this.blogUpdateForm.get('blogItems') as FormArray;
    return blogItems.controls;
  }
  createBlogItem() {
    return this.formBuilder.group({
      imageName: [''],
      description: ['']
    });
  }
  addBlogItem(): void {
    (this.blogUpdateForm.get('blogItems') as FormArray).push(this.createBlogItem());
  }
  addExistingBlogItem(blogItem:BlogItemModel) {
    (this.blogUpdateForm.get('blogItems') as FormArray).push(this.formBuilder.group({
      imageName: blogItem.imageName,
      description: blogItem.description
    }));;
  }
  //select image
  onFirstVisibleImageSelectFile(event) {
    if (event.target.files && event.target.files.length > 0) {
      var reader = new FileReader();
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = (event: any) => {
        this.blogUpdateForm.get('firstVisibleImageName').setValue(reader.result);
        this.firstVisibleImageName = reader.result.toString();
      }
    }
  }
  onSelectFile(event, i) {
    if (event.target.files && event.target.files.length > 0) {
      var reader = new FileReader();
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = (event: any) => {
        (<FormGroup>(<FormArray>this.blogUpdateForm.controls.blogItems).controls[i]).patchValue({
          imageName: reader.result.toString()
        });
        this.blogItemList[i]=reader.result.toString();
      }
    }
  }
  removeImage(i) {
    (<FormGroup>(<FormArray>this.blogUpdateForm.controls.blogItems).controls[i]).patchValue({
      imageName: ''
    });
  }
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'no',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Buraya metin giriniz...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [

    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      [
        'subscript',
        'superscript',
        'justifyFull',
        'heading',
        'fontName'],
      [
        'customClasses',
        'insertImage',
        'insertVideo',
        'insertHorizontalRule',
        'toggleEditorMode'
      ]
    ]
  };
}
