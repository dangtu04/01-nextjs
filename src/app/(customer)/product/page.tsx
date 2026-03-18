import { handleGetProductsPublicAction } from "@/actions/products.actions";
import ProductAll from "@/components/customer/product/product.all";
import { ICategory } from "@/types/models/product.model";
import { sendRequest } from "@/utils/api";

const ProductPage = async () => {
  const product = await handleGetProductsPublicAction({
    current: 1,
    pageSize: 8,
  });

  const listCategories = await sendRequest<
    IBackendRes<IModelPaginate<ICategory>>
  >({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/categories/public/all`,
    method: "GET",
    nextOption: {
      next: { tags: ["list-categories-public"] },
    },
  });

  const listBrands = await sendRequest<IBackendRes<IModelPaginate<ICategory>>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/brands/public/all`,
    method: "GET",
    nextOption: {
      next: { tags: ["list-brands-public"] },
    },
  });

  const listCategoriesForSelect = listCategories.data?.results
    ? [{ _id: "", name: "Tất cả" }, ...listCategories.data?.results]
    : [{ _id: "", name: "Tất cả" }];
  const listBrandsForSelect = listBrands.data?.results
    ? [{ _id: "", name: "Tất cả" }, ...listBrands.data?.results]
    : [{ _id: "", name: "Tất cả" }];
  return (
    <>
      <ProductAll
        initialProducts={product?.data?.results ?? []}
        listCategoriesForSelect={listCategoriesForSelect}
        listBrandsForSelect={listBrandsForSelect}
      />
    </>
  );
};

export default ProductPage;
