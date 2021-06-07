import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EducationContactFormInsertModel } from '../../shared/models';
import { BaseService } from '../../shared/base.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, makeStateKey, TransferState } from '@angular/platform-browser';
import 'hammerjs';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation} from 'ngx-gallery-9';
import { environment } from 'src/environments/environment';
import { SeoService } from 'src/app/_services/seo.service';
import { Subscription } from 'rxjs';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

declare var $: any;
@Component({
  selector: 'se-educacation-detail',
  templateUrl: './education-detail.component.html',
  styleUrls: ['./education-detail.component.scss']
})
export class EducationDetailComponent implements OnInit, AfterViewInit, OnDestroy {
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
  color = '';
  galleryImages: NgxGalleryImage[] = [];
  environment:any;
  @ViewChild('generalInformation') generalInformation: ElementRef;
  subscription: any;
  youtubeOneId: any;
  youtubeTwoId: any;
  mapCode:any;
  constructor(private formBuilder: FormBuilder, private baseService: BaseService, private route: ActivatedRoute,
     private sanitizer: DomSanitizer, private seoService: SeoService, private state: TransferState, @Inject(PLATFORM_ID) private platformId: any) {
    this.environment = environment;
  }
 
  ngOnInit(): void {
    this.seoService.updateMeta('robots','index, follow');

    this.galleryOptions = [
      {
        width: '100%',
        height: '600px',
        imageInfinityMove:true,
        previewFullscreen:true,
        previewCloseOnClick:true,
        previewCloseOnEsc:true,
        previewKeyboardNavigation:true,
        previewZoom:true,
        previewZoomMax:5,
        imageSwipe: true,
        previewSwipe:true,
        previewRotate:true,
        imageAnimation: NgxGalleryAnimation.Slide,
        previewAnimation :false
      },
       // max-width 420
       {
        breakpoint: 420,
        height: '300px',
        imageSwipe: true,
        previewSwipe:true,
        thumbnailsSwipe:true
    },
    ];
    this.subscription = this.route.params.subscribe(params => {
      const dataKey = makeStateKey(params['name']);
      const $dataSource = this.baseService.get("Education/GetEducationDetailModelBySeoUrl?seoUrl=", params['name']);
      this.baseService.getCachedObservable<any>($dataSource, dataKey)
      .subscribe(data => {
        this.educationDetailModel = data;
        this.seoService.updateTitle(`${this.educationDetailModel.addressInformation.districtName} ${this.educationDetailModel.generalInformation.educationName}`);
        this.seoService.updateCanonicalUrl(environment.baseUrl +'/'+ this.educationDetailModel.addressInformation.districSeoUrl + '/' + this.educationDetailModel.generalInformation.categorySeoUrl + '/' + params['name']);
        this.seoService.updateMeta("description", "İzmir " + this.educationDetailModel.addressInformation.districtName + " ilçesindeki " + this.educationDetailModel.generalInformation.categoryName + " - " + this.educationDetailModel.generalInformation.educationName +" hakkında, fotoğrafları, konumu, fiyatları incele");
        
        //Facebook Meta Tag
        this.seoService.updateMeta('og:title', `${this.educationDetailModel.addressInformation.districtName} ${this.educationDetailModel.generalInformation.educationName}`);
        this.seoService.updateMeta('og:type','website');
        this.seoService.updateMeta('og:url', environment.baseUrl +'/'+ this.educationDetailModel.addressInformation.districSeoUrl + '/' + this.educationDetailModel.generalInformation.categorySeoUrl + '/' + params['name']);
        this.seoService.updateMeta('og:image', `${environment.apiUrl}/images/${this.educationDetailModel.images[0]}_1000x600.jpg`);
        this.seoService.updateMeta('og:site_name','İzmir Eğitim Kurumları');
        this.seoService.updateMeta('og:description', "İzmir " + this.educationDetailModel.addressInformation.districtName + " ilçesindeki " + this.educationDetailModel.generalInformation.categoryName + " - " + this.educationDetailModel.generalInformation.educationName +" hakkında, fotoğrafları, konumu, fiyatları incele");
        this.seoService.updateMeta('og:locale','tr_TR');
        this.seoService.updateMeta('og:image:secure_url',environment.baseUrl +'/'+ this.educationDetailModel.addressInformation.districSeoUrl + '/' + this.educationDetailModel.generalInformation.categorySeoUrl + '/' + params['name']);
    
        //Twitter Meta Tag
        this.seoService.updateMeta('twitter:title', `${this.educationDetailModel.addressInformation.districtName} ${this.educationDetailModel.generalInformation.educationName}`);
        this.seoService.updateMeta('twitter:description', "İzmir " + this.educationDetailModel.addressInformation.districtName + " ilçesindeki " + this.educationDetailModel.generalInformation.categoryName + " - " + this.educationDetailModel.generalInformation.educationName +" hakkında, fotoğrafları, konumu, fiyatları incele");
        this.seoService.updateMeta('twitter:image', `${environment.apiUrl}/images/${this.educationDetailModel.images[0]}_1000x600.jpg`);
        this.seoService.updateMeta('twitter:card','summary_large_image');
        this.seoService.updateMeta('twitter:url',environment.baseUrl +'/'+ this.educationDetailModel.addressInformation.districSeoUrl + '/' + this.educationDetailModel.generalInformation.categorySeoUrl + '/' + params['name']);

        if (this.educationDetailModel.socialInformation.mapCode != '' || this.educationDetailModel.socialInformation.mapCode) {
          this.mapCode = this.sanitizer.bypassSecurityTrustHtml(this.educationDetailModel.socialInformation.mapCode);
        }
        this.youtubeOneId = this.educationDetailModel.socialInformation.youtubeVideoOne.split('watch?v=')[1];
        this.youtubeTwoId = this.educationDetailModel.socialInformation.youtubeVideoTwo.split('watch?v=')[1];
        this.educationDetailModel.images.forEach(image => {
          this.galleryImages.push({
            small: `${environment.apiUrl}/images/${image}_1000x600.jpg`,
            medium: `${environment.apiUrl}/images/${image}_1000x600.jpg`,
            big:`${environment.apiUrl}/images/${image}_1000x600.jpg`,
            description: this.educationDetailModel.generalInformation.educationName,
            label: this.educationDetailModel.generalInformation.educationName
          });
        });

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
  ngOnDestroy() {
    this.subscription.unsubscribe();
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

  openGeneralInformation(){
  this.generalInformation.nativeElement.style.display = "block";
  }

}
