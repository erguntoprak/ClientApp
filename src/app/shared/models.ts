export interface LoginModel {
  email: string;
  password: string;
}
export interface RegisterModel {
  name: string;
  surname: string;
  email: string;
  phone: string;
  password: string;
}
export interface UserLoginModel {
  userId: string;
  name: string;
  surname: string;
  email: string;
  token: string;
  roles: string[];
}
export interface UserModel {
  id:string;
  name: string;
  surname: string;
  email: string;
  phoneNumber:string;
  roles: string[];
}
export interface UserListModel {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  roles: string[];
  emailConfirmed: string;
  activated: string;
}
export interface RoleModel {
  id: string;
  name: string;
}
export interface KeyValueModel {
  key: any;
  value: any;
}
export interface EducationListModel {
  id: number;
  name: string;
  categoryName: string;
  categorySeoUrl: string;
  categoryId: number;
  districtName: string;
  districtSeoUrl: string;
  districtId: number;
  address: string;
  base64Image: string;
  seoUrl: string;
  imageUrl: string;
}

export interface EducationFilterListModel {
  id: number;
  name: string;
  categoryName: string;
  categorySeoUrl: string;
  categoryId: number;
  districtName: string;
  districtId: number;
  address: string;
  base64Image: string;
  seoUrl: string;
  attributeIds: number[];
}

export interface CategoryAttributeListModel {
  categoryName: string;
  attributeListModel: AttributeModel[];
}

export interface AttributeModel {
  id: number;
  name: string;
}
export interface FilterModel {
  categoryId: number;
  educationName?: string;
}
export interface CategoryModel {
  id: number;
  name: string;
  seoUrl: string;
}
export interface AttributeCategoryModel {
  id: number;
  name: string;
}
export interface AttributeListModel {
  id: number;
  name: string;
  attributeCategoryId: number;
  attributeCategoryName: string;
}
export interface SearchResult {
  text: string;
  districtUrl: string;
}
export interface EducationSearchResult {
  name: string;
  seoUrl: string;
}
export interface AddressModel {
  cityModel: CityModel;
  districtListModel: DistrictModel[];
}
export interface CityModel {
  id: number;
  name: string;
}
export interface DistrictModel {
  id: number;
  name: string;
  seoUrl: string;
}
export interface ImageModel {
  id: number;
  imageUrl: string;
  title: string;
  firstVisible: boolean;
  educationId: number;
}
export interface EducationContactFormInsertModel {
  nameSurname: string;
  email: string;
  phoneNumber: string;
  educationId: number;
  createDateTime: Date;
}
export interface EducationContactFormListModel {
  nameSurname: string;
  email: string;
  phoneNumber: string;
  createDateTime: string;
}
export interface BlogListModel {
  id: number;
  title: string;
  userSeoUrl: string;
  seoUrl: string;
  userName: string;
  isActive: boolean;
  firstVisibleImageName: string;
  createTime: string;
}
export interface BlogDetailModel {
  id: number;
  title: string;
  author: string;
  firstVisibleImageName: string;
  createTime: string;
  metaDescription: string;
  metaKeywords: string;
  metaTitle: string;
  blogItems: BlogItemModel[];
}
export interface BlogItemModel {
  imageName: string;
  description: string;
}
export interface BlogUpdateModel {
  id: number;
  title: string;
  firstVisibleImageName: string;
  blogItems: BlogItemModel[];
}
export interface NavigationModel {
  title:string;
  key: string;
  isVisible: boolean;
  navigationItems:NavigationItemModel[];
}
export interface NavigationItemModel {
  name:string;
  routeUrl: string;
  icon: string;
  key: string;
  isVisible: boolean;
}
export interface ActionPermissionModel {
  [action: string]: string[];
}
export interface DashboardDataModel {
  educationTotalCount:number;
  blogTotalCount:number;
  contactFormCount:number;
}
