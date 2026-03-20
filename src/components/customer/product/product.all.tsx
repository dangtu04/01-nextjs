"use client";

import { ICategory, IProductCard } from "@/types/models/product.model";
import ProductCard from "../product/product.card";
import ProductCardSkeleton from "@/components/customer/product/product.card.skeleton";
import { handleGetProductsPublicAction } from "@/actions/products.actions";
import { useMemo, useState } from "react";
import { Button, InputNumber, Select } from "antd";
import "./product.all.scss";

const { Option } = Select;

const PAGE_SIZE = 8;

interface IProps {
  initialProducts: IProductCard[];
  listCategoriesForSelect: ICategory[];
  listBrandsForSelect: ICategory[];
}

const ProductAll = ({
  initialProducts,
  listCategoriesForSelect,
  listBrandsForSelect,
}: IProps) => {
  const [products, setProducts] = useState<IProductCard[]>(initialProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // filter states
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [category, setCategory] = useState<string>("");
  const [brand, setBrand] = useState<string>("");

  // dùng useMemo để không tạo lại options nếu list categories không đổi
  const categoryOptions = useMemo(
    () =>
      listCategoriesForSelect.map((c) => ({
        label: c.name,
        value: c._id,
      })),
    [listCategoriesForSelect],
  );

  const brandOptions = useMemo(
    () =>
      listBrandsForSelect.map((b) => ({
        label: b.name,
        value: b._id,
      })),
    [listBrandsForSelect],
  );

  // fetch products để tái sử dụng cho filter và load more
  const fetchProducts = async (page: number, isLoadMore = false) => {
    setLoading(true);
    try {
      const result = await handleGetProductsPublicAction({
        current: page,
        pageSize: PAGE_SIZE,
        minPrice: minPrice ?? undefined,
        maxPrice: maxPrice ?? undefined,
        categoryId: category || undefined,
        brandId: brand || undefined,
      });

      const newProducts = result?.data?.results ?? [];

      setProducts((prev) =>
        isLoadMore ? [...prev, ...newProducts] : newProducts,
      );

      setHasMore(newProducts.length >= PAGE_SIZE);
      setCurrentPage(page);
    } finally {
      setLoading(false);
    }
  };

  // handle filter
  const handleFilter = () => fetchProducts(1);

  // handle reset filter
  const handleReset = () => {
    setMinPrice(null);
    setMaxPrice(null);
    setCategory("");
    setBrand("");
    fetchProducts(1);
  };

  // handle load more
  const handleLoadMore = () => {
    if (!loading) fetchProducts(currentPage + 1, true);
  };

  // console.log(">>>>> check render product all");
  return (
    <div className="product-all">
      <div className="product-all__body">
        {/* Sidebar Filter */}
        <aside className="product-all__sidebar">
          <div className="product-all__filter-title">Bộ lọc</div>

          {/* Price Range */}
          <div className="product-all__filter-section">
            <label>Khoảng giá</label>
            <div className="product-all__price-range">
              <InputNumber
                disabled={loading}
                placeholder="Từ"
                value={minPrice}
                onChange={(val) => setMinPrice(val)}
                min={0}
                formatter={(v) => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                parser={(v) => Number(v?.replace(/,/g, "")) as 0}
              />
              <span>—</span>
              <InputNumber
                disabled={loading}
                placeholder="Đến"
                value={maxPrice}
                onChange={(val) => setMaxPrice(val)}
                min={0}
                formatter={(v) => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                parser={(v) => Number(v?.replace(/,/g, "")) as 0}
              />
            </div>
          </div>

          {/* Category */}
          <div className="product-all__filter-section">
            <label>Danh mục</label>
            <Select
              value={category}
              onChange={setCategory}
              placeholder="Chọn danh mục"
              disabled={loading}
            >
              {categoryOptions.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </div>

          {/* Brand */}
          <div className="product-all__filter-section">
            <label>Thương hiệu</label>
            <Select
              value={brand}
              onChange={setBrand}
              placeholder="Chọn thương hiệu"
              disabled={loading}
            >
              {brandOptions.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </div>

          <Button
            className="product-all__filter-apply"
            onClick={handleFilter}
            loading={loading}
            block
          >
            Áp dụng
          </Button>
          <Button
            className="product-all__filter-reset"
            onClick={handleReset}
            block
          >
            Đặt lại
          </Button>
        </aside>

        {/* Product Grid */}
        <main className="product-all__main">
          <div className="product-all__grid">
            {loading && products.length === 0 ? (
              Array.from({ length: PAGE_SIZE }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))
            ) : products.length === 0 ? (
              <div className="product-all__empty">
                Không tìm thấy sản phẩm phù hợp.
              </div>
            ) : (
              products.map((product) => (
                <ProductCard
                  key={product?._id}
                  image={product?.thumbnail?.secureUrl}
                  name={product?.name}
                  price={product?.price}
                  slug={product?.slug}
                />
              ))
            )}
          </div>
          {/* Load More */}
          {products.length > 0 && hasMore && (
            <div className="product-all__load-more">
              <button
                className="btn-load-more"
                onClick={handleLoadMore}
                disabled={loading}
              >
                {loading ? "Đang tải..." : "Xem thêm"}
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ProductAll;
