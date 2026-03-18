import ProductCreate from "@/components/admin/products/product.create";
import { ICategory } from "@/types/models/product.model";
import { sendAuthRequest } from "@/utils/api";

const CreateProductPage = async () => {
  const listCategoriesForSelect = await sendAuthRequest<
    IBackendRes<IModelPaginate<ICategory>>
  >({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/categories/select/all`,
    method: "GET",
    nextOption: {
      next: { tags: ["list-categories"] },
    },
  });

  const listBrandsForSelect = await sendAuthRequest<
    IBackendRes<IModelPaginate<ICategory>>
  >({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/brands/select/all`,
    method: "GET",
    nextOption: {
      next: { tags: ["list-brands"] },
    },
  });
  // console.log({ listCategoriesForSelect, listBrandsForSelect });
  return (
    <>
      <div>
        <ProductCreate
          listCategoriesForSelect={listCategoriesForSelect?.data?.results || []}
          listBrandsForSelect={listBrandsForSelect?.data?.results || []}
        />
      </div>
    </>
  );
};

export default CreateProductPage;
