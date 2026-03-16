"use client";

import React, { useState } from "react";
import { DeleteOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import "./cart.scss";
import { ICartItem } from "@/types/models/cart.model";
import CartItem from "./cart.item";
import PaginationLayout from "../layouts/pagination";
import { useSearchParams } from "next/navigation";
import { SHIPPING_CONFIG } from "@/utils/shipping";
import Link from "next/link";
interface IProps {
  items: ICartItem[];
  meta?: {
    current: number;
    pageSize: number;
    pages: number;
    totals: number;
  };
   totalPrice: number;
}

const Cart = (props: IProps) => {
  const { items, meta, totalPrice } = props;

  const [isLoading, setIsLoading] = useState(false);

  const searchParams = useSearchParams();

  const pageKey = `${searchParams.get("current")}-${searchParams.get("pageSize")}`;

  const formatPrice = (price: number) => {
    return price.toLocaleString("vi-VN") + "đ";
  };

  // const subTotal = items.reduce((sum, item) => sum + item.subtotal, 0) || 0;
  const shipping =
    totalPrice >= SHIPPING_CONFIG.FREE_SHIPPING_THRESHOLD
      ? 0
      : SHIPPING_CONFIG.DEFAULT_FEE;
  const total = totalPrice + shipping;

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-container">
          <div className="empty-cart">
            <ShoppingCartOutlined style={{ fontSize: 80 }} />
            <h2>Giỏ hàng trống</h2>
            <p>Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm</p>
            <button className="btn-shopping">Tiếp tục mua sắm</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page" key={pageKey}>
      <div className="cart-container">
        <h1 className="cart-title">Giỏ hàng của bạn</h1>
        <p className="cart-count">{meta?.totals} sản phẩm</p>

        <div className="cart-content">
          <div className="cart-items">
            <CartItem items={items} onLoadingChange={setIsLoading} />

            <PaginationLayout meta={meta} nameItem="sản phẩm" />
          </div>
          <div className="cart-summary">
            <h2>Tóm tắt đơn hàng</h2>

            <div className="summary-row">
              <span>Tạm tính</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>

            <div className="summary-row">
              <span>Phí vận chuyển</span>
              <span>{formatPrice(shipping)}</span>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-row total">
              <span>Tổng cộng</span>
              <span>{formatPrice(total)}</span>
            </div>

            <Link href="/checkout">
              <button className="btn-checkout" disabled={isLoading}>Thanh toán</button>
            </Link>

            <div className="shipping-note">
              <p>Miễn phí vận chuyển cho đơn hàng từ 500.000đ</p>
            </div>

            <Link href="/">
              <button className="btn-continue">Tiếp tục mua sắm</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
