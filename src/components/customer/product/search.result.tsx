"use client";

import { IProductCard } from "@/types/models/product.model";
import ProductCard from "../product/product.card";
import ProductCardSkeleton from "@/components/customer/product/product.card.skeleton";
import { handleSearchProductsAction } from "@/actions/products.actions";
import { useEffect, useState } from "react";
import "./search.result.scss";

const PAGE_SIZE = 8;

interface IProps {
  initialProducts: IProductCard[];
  keyword?: string;
}

const SearchResult = ({ initialProducts, keyword }: IProps) => {
  const [products, setProducts] = useState<IProductCard[]>(initialProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialProducts.length >= PAGE_SIZE);

  const handleLoadMore = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const nextPage = currentPage + 1;
      const result = await handleSearchProductsAction({
        keyword: keyword || "",
        current: nextPage,
        pageSize: PAGE_SIZE,
      });
      const newProducts = result?.data?.results ?? [];
      setProducts((prev) => [...prev, ...newProducts]);
      setHasMore(newProducts.length >= PAGE_SIZE);
      setCurrentPage(nextPage);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="search-result">
      <div className="search-result__header">
        <h1>Kết quả tìm kiếm</h1>
        <p>
          Tìm kiếm: <strong>{keyword}</strong>
        </p>
      </div>

      <div className="search-result__container">
        <div className="search-result__wrapper">
          {products.length === 0 && !loading ? (
            <div className="search-result__empty">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
              <h2>Không tìm thấy kết quả</h2>
              <p>
                Xin lỗi, không có sản phẩm nào phù hợp với từ khóa:
                {keyword}. Vui lòng thử tìm kiếm với từ khóa khác.
              </p>
            </div>
          ) : (
            <>
              <div className="search-result__grid">
                {loading && products.length === 0
                  ? Array.from({ length: PAGE_SIZE }).map((_, i) => (
                      <ProductCardSkeleton key={i} />
                    ))
                  : products.map((product) => (
                      <ProductCard
                        key={product?._id}
                        image={product?.thumbnail?.secureUrl}
                        name={product?.name}
                        price={product?.price}
                        slug={product?.slug}
                      />
                    ))}
              </div>

              {/* Load More */}
              {products.length > 0 && hasMore && (
                <div className="search-result__load-more">
                  <button
                    className="btn-load-more"
                    onClick={handleLoadMore}
                    disabled={loading}
                  >
                    {loading ? "Đang tải..." : "Xem thêm"}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
