export enum ProductStatus {
  Active = "active",
  Inactive = "inactive",
  Draft = "draft",
}

export interface IThumbnail {
  publicId?: string;
  secureUrl: string;
}

export interface ICategory {
  _id: string;
  name: string;
}

export interface IBrand {
  _id: string;
  name: string;
}

export interface ISize {
  _id: string;
  name: string;
  code?: string;
}

export interface ISelectResponse<T> {
  results: T[];
}

export interface IProductVariant {
  sizeId: string;
  sizeCode?: string;
  sizeName?: string;
  quantity: number;
  isAvailable: boolean;
}

export interface IProductTable {
  _id: string;
  name: string;
  price: number;
  thumbnail: IThumbnail;
  categoryIds: ICategory[]; // Đã populate
  brandId: IBrand; // Đã populate
  variants: IProductVariant[];
  status: ProductStatus[];
}

export interface IProductDetail extends IProductTable {
  slug: string;
  description: string;
  material: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
  images?: string[]
}

export interface IProductCreate {
  name: string;
  description?: string;
  price: number;
  categoryIds: string[];
  brandId: string;
  material?: string;
  thumbnail?: File;
}

export interface IProductImage {
  _id: string;
  publicId: string;
  secureUrl: string;
}

export interface IProductImageResponse {
  results: IProductImage[];
}

export interface IProductCard {
  _id: string;
  name: string;
  slug: string;
  price: number;
  thumbnail: IThumbnail;
}
