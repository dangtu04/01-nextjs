import { IProductCard } from "@/types/models/product.model";
import { sendRequest } from "@/utils/api";
import SearchResult from "@/components/customer/product/search.result";

interface IProps {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}
const ProductSearchPage = async ({ params, searchParams }: IProps) => {
  const keyword = (searchParams?.keyword as string) || "";

  const res = await sendRequest<IBackendRes<IModelPaginate<IProductCard>>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/products/search/keyword`,
    method: "GET",
    queryParams: {
      keyword,
      current: 1,
      pageSize: 8,
    },
    nextOption: {
      cache: "no-store",
    },
  });

  const initialProducts = res?.data?.results ?? [];

  return (
    <SearchResult
      key={keyword}
      initialProducts={initialProducts}
      keyword={keyword}
    />
  );
};

export default ProductSearchPage;
