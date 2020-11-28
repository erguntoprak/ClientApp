import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { BaseService } from '../../shared/base.service';
import { KeyValueModel, CategoryAttributeListModel, CategoryModel, AddressModel, CityModel, DistrictModel, ImageModel } from '../../shared/models';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AcdcLoadingService } from 'acdc-loading';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import * as _ from 'lodash';
import { ActionPermissionService } from 'src/app/_services/action-permission.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'se-education-create',
  templateUrl: './education-create.component.html'
})
export class EducationCreateComponent implements OnInit, AfterViewInit {

  apiUrl = environment.apiUrl;
  educationForm: FormGroup;
  errorList = [];
  imageUploadErrorMessage = [];
  selectedImageModel: ImageModel = { id: 0, firstVisible: false, imageUrl: "", title: "", educationId: 0 };
  isSelectFirstVisibleImage: boolean = false;
  categories: CategoryModel[];
  attributeList: CategoryAttributeListModel[];
  city: CityModel;
  districtList: DistrictModel[];
  urlImages: KeyValueModel[] = [];
  savedImageList: ImageModel[];
  questionItems: FormArray;
  youtubeVideoOneId: string = "";
  youtubeVideoTwoId: string = "";
  iframeMapCode: SafeHtml = "";
  nextStepOneControl: boolean = true;
  nextStepOneValidation: boolean = false;
  nextStepTwoControl: boolean = false;
  nextStepThreeControl: boolean = false;
  nextStepThreeValidation: boolean = false;
  nextStepFourControl: boolean = false;
  nextStepFourValidation: boolean = false;
  nextStepFiveControl: boolean = false;
  fileCount: number = 0;
  formData: FormData;

  constructor(public actionPermissionService: ActionPermissionService, private formBuilder: FormBuilder, private baseService: BaseService, private router: Router, private toastr: ToastrService, private acdcLoadingService: AcdcLoadingService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.educationForm = this.formBuilder.group({
      generalInformation: this.formBuilder.group(
        {
          id: [0, Validators.required],
          educationName: ['', Validators.required],
          educationType: [0, Validators.min(1)],
          description: [''],
        }
      ),
      attributes: this.formBuilder.array([]),
      addressInformation: this.formBuilder.group(
        {
          address: ['', Validators.required],
          cityId: [0, Validators.min(1)],
          districtId: [0, Validators.min(1)]
        }
      ),
      contactInformation: this.formBuilder.group(
        {
          authorizedName: ['', Validators.required],
          authorizedEmail: ['', [Validators.required, Validators.email]],
          phoneOne: ['', Validators.required],
          phoneTwo: ['', Validators.required],
          educationEmail: ['', [Validators.required, Validators.email]],
          educationWebsite: ['', Validators.required]
        }
      ),
      socialInformation: this.formBuilder.group(
        {
          youtubeVideoOne: [''],
          youtubeVideoTwo: [''],
          facebookAccountUrl: [''],
          instagramAccountUrl: [''],
          twitterAccountUrl: [''],
          youtubeAccountUrl: [''],
          mapCode: ['']
        }),
      questions: this.formBuilder.array([this.createQuestionItem()])
    });
    this.getAllCallMethod();
  }
  ngAfterViewInit() {
    this.educationForm.get("socialInformation").get("youtubeVideoOne").valueChanges.subscribe(value => {
      if (value == "") {
        this.youtubeVideoOneId = "";
      }
      else {
        this.youtubeVideoOneId = value.split("watch?v=")[1];
      }
    });
    this.educationForm.get("socialInformation").get("youtubeVideoTwo").valueChanges.subscribe(value => {
      if (value == "") {
        this.youtubeVideoTwoId = "";
      }
      else {
        this.youtubeVideoTwoId = value.split("watch?v=")[1];
      }
    });
    this.educationForm.get("socialInformation").get("mapCode").valueChanges.subscribe(value => {
      if (value.startsWith("<iframe") && value.endsWith("</iframe>")) {
        this.iframeMapCode = this.sanitizer.bypassSecurityTrustHtml(value);
      }
      else if (value == "") {
        this.iframeMapCode = "";
      }
      else {
        this.iframeMapCode = null;
      }
    });
  }

  onSubmit() {
    this.acdcLoadingService.showLoading();
    if (this.educationForm.invalid) {
      this.nextStepFourValidation = true;
      this.acdcLoadingService.hideLoading();
      return;
    }

    this.baseService.post("Education/AddEducation", this.educationForm.value)
      .subscribe(educationId => {
        this.toastr.success('Eğitim kurumu kaydedildi. Görsellerin kayıt edilebilmesi için Lütfen Bekleyiniz..', 'Başarılı!',{
          timeOut: 5000,
        });
        if (this.formData) {
          this.baseService.postFormData(`Education/UploadEducationImage/${educationId}`, this.formData).subscribe(response => {
            this.baseService.get<ImageModel[]>("Education/GetEducationImagesByEducationId?educationId=", educationId).subscribe(imageModel => {
              this.savedImageList = imageModel;
              this.nextStepFourControl = false;
              this.nextStepFiveControl = true;
              this.acdcLoadingService.hideLoading();
            });
          });
        }
      });
  }
  saveSelectedFirsImage() {
    if (this.selectedImageModel.id === 0) {
      this.isSelectFirstVisibleImage = true;
      return;
    }
    this.acdcLoadingService.showLoading();
    this.baseService.post("Education/InsertFirstVisibleImage", this.selectedImageModel).subscribe(data => {
      this.router.navigate(['/panel/egitimler']);
      this.toastr.success('Kayıt işlemi gerçekleşti.', 'Başarılı!');
      this.acdcLoadingService.hideLoading();
    });
  }
  getQuestionControl() {
    let questionItems = this.educationForm.get('questions') as FormArray;
    return questionItems.controls;
  }
  createQuestionItem() {
    return this.formBuilder.group({
      question: '',
      answer: ''
    });
  }
  addQuestionItem(): void {
    this.questionItems = this.educationForm.get('questions') as FormArray;
    this.questionItems.push(this.createQuestionItem());
  }

  //steps
  nextStepOneClick() {
    if (this.educationForm.controls.generalInformation.status == 'VALID' && this.fileCount>0) {
      window.scroll(0, 0);
      this.nextStepOneControl = false;
      this.nextStepTwoControl = true;
    }
    else {
      this.nextStepOneValidation = true;
    }
  }
  nextStepTwoClick() {
    window.scroll(0, 0);
    this.nextStepTwoControl = false;
    this.nextStepThreeControl = true;
  }
  previousStepTwoClick() {
    window.scroll(0, 0);
    this.nextStepOneControl = true;
    this.nextStepTwoControl = false;
  }
  nextStepThreeClick() {
    if (this.iframeMapCode == null || this.youtubeVideoOneId == undefined || this.youtubeVideoTwoId == undefined) {
      this.nextStepThreeValidation = true;
      return;
    }
    window.scroll(0, 0);
    this.nextStepThreeControl = false;
    this.nextStepFourControl = true;
  }
  previousStepThreeClick() {
    window.scroll(0, 0);
    this.nextStepTwoControl = true;
    this.nextStepThreeControl = false;
  }
  previousStepFourClick() {
    window.scroll(0, 0);
    this.nextStepThreeControl = true;
    this.nextStepFourControl = false;
  }
  selectFirstVisibleImage(imageModel: ImageModel) {
    this.selectedImageModel = imageModel;
  }

  //select image
  onSelectFile(event) {
    const files: FileList = event.target.files;
    this.fileCount = 0;
    this.formData = new FormData();
    const allowed_types = ['image/png', 'image/jpeg'];
    this.imageUploadErrorMessage = [];

    for (let i = 0; i < files.length; i++) {
      if (!_.includes(allowed_types, event.target.files[i].type)) {
        this.imageUploadErrorMessage.push('Sadece ( JPG | PNG ) uzantılar kabul edilmektedir.');
        this.imageUploadErrorMessage = [...this.imageUploadErrorMessage];
      }
      else{
        this.formData.append(files.item(i).name, files.item(i));
        this.fileCount++;
      }
    }
  }
  //Checkbox change checked type
  onChange(id: string, isChecked: boolean) {
    const attributes = <FormArray>this.educationForm.controls.attributes;
    if (isChecked) {
      attributes.push(new FormControl(id));
    } else {
      let index = attributes.controls.findIndex(x => x.value == id)
      attributes.removeAt(index);
    }
  }
  //Dropdown selectedId change attributes
  educationTypeOnChange(event) {
    var categoryId = +event.target.value;
    this.baseService.getAll<CategoryAttributeListModel[]>("Attribute/GetAllAttributeByEducationCategoryId?categoryId=" + categoryId).subscribe(attributeList => {
      this.attributeList = attributeList;
    });
  }
  //Gel All Method
  getAllCallMethod() {
    this.baseService.getAll<CategoryModel[]>("Category/GetAllCategoryList").subscribe(categories => {
      this.categories = categories;
    });
    this.baseService.getAll<AddressModel>("Address/GetCityNameDistricts").subscribe(addressModel => {
      this.city = addressModel.cityModel;
      this.districtList = addressModel.districtListModel;
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
