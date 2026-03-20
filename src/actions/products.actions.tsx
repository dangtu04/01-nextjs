"use server";

import { auth } from "@/auth";
import { IProductCard, IProductVariant } from "@/types/models/product.model";
import { sendAuthRequest, sendRequest, sendRequestFile } from "@/utils/api";
import { revalidateTag } from "next/cache";
import { cache } from "react";

export const handleCreateProductAction = async (formData: FormData) => {
  const session = await auth();
  const res = await sendRequestFile<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/products`,
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${session?.user?.access_token}`,
    },
  });

  revalidateTag("list-products");
  return res;
};

export const handleUpdateProductAction = async (
  id: string,
  formData: FormData,
) => {
  const session = await auth();
  const res = await sendRequestFile<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/products/${id}`,
    method: "PATCH",
    body: formData,
    headers: {
      Authorization: `Bearer ${session?.user?.access_token}`,
    },
  });

  revalidateTag("list-products");
  return res;
};

export const handleUpdateProductVariantsAction = async (
  id: any,
  variants: IProductVariant,
) => {
  const res = await sendAuthRequest<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/products/${id}/variants`,
    method: "PUT",
    body: { variants },
  });

  revalidateTag("list-products");
  return res;
};

export const handleDeleteProductAction = async (id: any) => {
  const res = await sendAuthRequest<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/products/${id}`,
    method: "DELETE",
  });

  revalidateTag("list-products");
  return res;
};

export const handleBulkAddImagesAction = async (
  id: string,
  formData: FormData,
) => {
  const session = await auth();
  const res = await sendRequestFile<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/products/${id}/images-detail`,
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${session?.user?.access_token}`,
    },
  });

  revalidateTag("list-products");
  return res;
};

export const handleBulkUpdateImagesAction = async (
  id: string,
  formData: FormData,
) => {
  const session = await auth();
  const res = await sendRequestFile<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/products/${id}/images-detail`,
    method: "PATCH",
    body: formData,
    headers: {
      Authorization: `Bearer ${session?.user?.access_token}`,
    },
  });

  revalidateTag("list-products");
  return res;
};

export const handleGetNewProductsAction = async (
  current: number,
  pageSize: number,
) => {
  const res = await sendRequest<IBackendRes<IModelPaginate<IProductCard>>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/products/list/new`,
    method: "GET",
    queryParams: { current, pageSize },
    nextOption: {
      next: { tags: ["list-products"], revalidate: 3600 },
    },
  });
  return res;
};

interface IGetProductsPublicParams {
  current: number;
  pageSize: number;
  minPrice?: number;
  maxPrice?: number;
  categoryId?: string;
  brandId?: string;
}

export const handleGetProductsPublicAction = async (
  params: IGetProductsPublicParams,
) => {
  const res = await sendRequest<IBackendRes<IModelPaginate<IProductCard>>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/products/public/all`,
    method: "GET",
    queryParams: params,
    nextOption: {
      next: { tags: ["list-products-public"], revalidate: 0 },
      // cache: "no-store",
    },
  });
  return res;
};

export const handleSearchProductsAction = async (params: {
  keyword?: string;
  current?: number;
  pageSize?: number;
}) => {
  const res = await sendRequest<IBackendRes<IModelPaginate<IProductCard>>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/products/search/keyword`,
    method: "GET",
    queryParams: params,
    nextOption: {
      cache: "no-store",
    },
  });

  // console.log("Search products result:", res);
  return res;
};
