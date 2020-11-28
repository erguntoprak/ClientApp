import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CategoryModel, EducationListModel, DistrictModel, AddressModel, SearchResult, EducationSearchResult } from '../../shared/models';
import { BaseService } from '../../shared/base.service';
import { environment } from 'src/environments/environment';
declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  apiUrl = environment.apiUrl;
  searchForm: FormGroup;
  categories: CategoryModel[];
  educationList: EducationListModel[];
  districtList: DistrictModel[];
  selectedCategoryId: number;
  categoryHomePage = new FormControl();
  district = new FormControl();
  isSearchResult: boolean = false;
  selectedDistrictId: number;
  selectedSearchFormCategoryName: string = "Özel Anaokul";
  selectedCategoryUrl: string = '/ozel-anaokul';
  searchResult: SearchResult[] = [];
  educationSearchResult: EducationSearchResult[];

  constructor(private formBuilder: FormBuilder, private baseService: BaseService) {
    this.searchForm = this.formBuilder.group({
      searchText: [''],
      categoryId: [1]
    });
  }
  ngOnInit(): void {
    this.getAllCallMethod();
  }
  ngAfterViewInit(): void {
    this.searchForm.get('categoryId').valueChanges.subscribe(value => {
      if (value == null) {
        this.selectedSearchFormCategoryName = "Eğitim Kurumları";
        return;
      }
      if (this.categories.length > 0) {
        let category = this.categories.find(d => d.id == value);
        this.selectedSearchFormCategoryName = category.name;
        this.selectedCategoryUrl = '/' + category.seoUrl;
      }
    });
    this.categoryHomePage.valueChanges.subscribe(value => {
      if (value == null) {
        value = 0;
      }
      if (this.district.value == null) {
        this.selectedDistrictId = 0;
      }
      else {
        this.selectedDistrictId = this.district.value;
      }
      this.baseService.getAll<EducationListModel[]>(`Education/GetAllEducationListByCategoryIdAndDistrictId?categoryId=${value}&districtId=${this.selectedDistrictId}`).subscribe(educationList => {
        this.educationList = educationList;
      });
    });
    this.district.valueChanges.subscribe(value => {
      if (value == null) {
        value = 0;
      }
      if (this.categoryHomePage.value == null) {
        this.selectedCategoryId = 0;
      } else {
        this.selectedCategoryId = this.categoryHomePage.value;
      }
      this.baseService.getAll<EducationListModel[]>(`Education/GetAllEducationListByCategoryIdAndDistrictId?categoryId=${this.selectedCategoryId}&districtId=${value}`).subscribe(educationList => {
        this.educationList = educationList;
      });
    });
    this.baseService.getAll<EducationSearchResult[]>("Education/GetAllSearchEducationList").subscribe(searchList => {
      this.educationSearchResult = searchList;
    });
  }

  onSearchFormSubmit() {

  }
  focusFunction() {
    this.isSearchResult = true;
  }
  focusOutFunction() {
    setTimeout(() => {
      this.isSearchResult = false;
    }, 300);
  }
  getAllCallMethod() {
    this.baseService.getAll<CategoryModel[]>("Category/GetAllCategoryList").subscribe(categories => {
      this.categories = categories;
    });
    this.baseService.getAll<EducationListModel[]>("Education/GetAllEducationListByRandomCategoryId").subscribe(educationList => {
      this.educationList = educationList;
    });
    this.baseService.getAll<AddressModel>("Address/GetCityNameDistricts").subscribe(addressModel => {
      this.districtList = addressModel.districtListModel;
      this.districtList.forEach(d => {
        this.searchResult.push({ text: d.name, url: 'egitim-kurumlari',districtUrl:d.seoUrl});
      });
    });
  }

}
