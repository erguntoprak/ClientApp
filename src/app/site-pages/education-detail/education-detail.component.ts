import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EducationContactFormInsertModel } from '../../shared/models';
import { BaseService } from '../../shared/base.service';
import { ActivatedRoute } from '@angular/router';
import { AcdcLoadingService } from 'acdc-loading';
import { DomSanitizer } from '@angular/platform-browser';
import 'hammerjs';
import { NgxGalleryOptions, NgxGalleryImage} from 'ngx-gallery-9';
import { environment } from 'src/environments/environment';

declare var $: any;
@Component({
  selector: 'se-educacation-detail',
  templateUrl: './education-detail.component.html'
})
export class EducationDetailComponent implements OnInit, AfterViewInit {

  educationDetailModel: any;
  imageObject: Array<object> = [];
  contactForm: FormGroup;
  submitted = false;
  contactFormSuccessMessage = false;
  contactFormDiv = true;
  educationContactFormInsertModel: EducationContactFormInsertModel;
  zoom: number = 8;
  lat: number = 51.673858;
  lng: number = 7.815982;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[] = [];
  constructor(private formBuilder: FormBuilder, private baseService: BaseService, private route: ActivatedRoute, private acdcLoadingService: AcdcLoadingService, private sanitizer: DomSanitizer) {

  }
  ngOnInit(): void {
    this.acdcLoadingService.showLoading();
    this.galleryOptions = [
      {
        width: '100%',
        height: '600px',
        imageAutoPlay:true,
        imageAutoPlayInterval: 5000,
        imageAutoPlayPauseOnHover: true,
        imageInfinityMove:true,
        previewFullscreen:true,
        previewCloseOnClick:true,
        previewCloseOnEsc:true,
        previewKeyboardNavigation:true,
        previewZoom:true,
        previewZoomMax:5,
        previewRotate:true,
        
      }
    ];
    this.route.params.subscribe(params => {
      this.baseService.get("Education/GetEducationDetailModelBySeoUrl?seoUrl=", params['name']).subscribe(data => {
        this.educationDetailModel = data;
        if (this.educationDetailModel.socialInformation.mapCode != '') {
          this.educationDetailModel.socialInformation.mapCode = this.sanitizer.bypassSecurityTrustHtml(this.educationDetailModel.socialInformation.mapCode);
        }
        this.educationDetailModel.socialInformation.youtubeVideoOne = this.educationDetailModel.socialInformation.youtubeVideoOne.split("watch?v=")[1];
        this.educationDetailModel.socialInformation.youtubeVideoTwo = this.educationDetailModel.socialInformation.youtubeVideoTwo.split("watch?v=")[1]
        this.educationDetailModel.blogList.map(blog => {
          blog.firstVisibleImageName = `${environment.apiUrl}/images/blog/${blog.firstVisibleImageName}_300x180.jpg`
        });

        this.educationDetailModel.images.forEach(image => {
          this.galleryImages.push({
            small: `${environment.apiUrl}/images/${image}_1000x600.jpg`,
            medium: `${environment.apiUrl}/images/${image}_1000x600.jpg`,
            big:`${environment.apiUrl}/images/${image}_1000x600.jpg`
          });
        });

        this.acdcLoadingService.hideLoading();


      })
    });
    this.contactForm = this.formBuilder.group({
      nameSurname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required]
    });

  }
  ngAfterViewInit(): void {
  }
  onContactFormSubmit() {
    this.submitted = true;
    if (this.contactForm.invalid) {
      return;
    }
    this.educationContactFormInsertModel = {
      nameSurname: this.contactForm.controls['nameSurname'].value,
      email: this.contactForm.controls['email'].value,
      phoneNumber: this.contactForm.controls['phoneNumber'].value,
      educationId: this.educationDetailModel.generalInformation.id,
      createDateTime: null
    };
    this.baseService.post("Education/InsertContactForm", this.educationContactFormInsertModel).subscribe(data => {
      this.contactFormSuccessMessage = true;
      this.contactFormDiv = false;
    });

  }

  blankLinkClick(url) {
    window.open(url, "_blank");
  }


}
