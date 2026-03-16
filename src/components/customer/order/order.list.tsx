"use client";

import { IOrder, OrderStatus } from "@/types/models/order.model";
import "./order.list.scss";
import Link from "next/link";
import PaginationLayout from "../layouts/pagination";

interface IProps {
  orders?: IOrder[];
  meta?: {
    current: number;
    pageSize: number;
    pages: number;
    totals: number;
  };
}

const getStatusBadge = (status: OrderStatus) => {
  const statusConfig = {
    [OrderStatus.PENDING]: {
      label: "Chờ xác nhận",
      className: "status-pending",
    },
    [OrderStatus.CONFIRMED]: {
      label: "Đã xác nhận",
      className: "status-confirmed",
    },
    [OrderStatus.PROCESSING]: {
      label: "Đang xử lý",
      className: "status-processing",
    },
    [OrderStatus.SHIPPING]: {
      label: "Đang giao hàng",
      className: "status-shipping",
    },
    [OrderStatus.COMPLETED]: {
      label: "Hoàn thành",
      className: "status-completed",
    },
    [OrderStatus.CANCELLED]: {
      label: "Đã huỷ",
      className: "status-cancelled",
    },
    [OrderStatus.REFUNDED]: {
      label: "Đã hoàn tiền",
      className: "status-refunded",
    },
  };

  const config = statusConfig[status] || {
    label: status,
    className: "status-default",
  };
  return config;
};

const OrderList = ({ orders = [], meta }: IProps) => {
  return (
    <div className="orderListContainer">
      <div className="header">
        <h2>Đơn hàng của tôi</h2>
        <p className="subtitle">
          Tổng cộng: <span>{meta?.totals || 0}</span> đơn hàng
        </p>
      </div>

      {orders && orders.length > 0 ? (
        <div className="ordersWrapper">
          {orders.map((order) => {
            const statusConfig = getStatusBadge(order.status);
            const orderDate = new Date(order.createdAt);
            const formattedDate = orderDate.toLocaleDateString("vi-VN", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            });

            return (
              <div key={order._id} className="orderCard">
                <div className="cardHeader">
                  <div className="orderInfo">
                    <span className="orderId">
                      Đơn #{order._id.slice(-6).toUpperCase()}
                    </span>
                    <span className="orderDate">{formattedDate}</span>
                  </div>
                  <div className={`statusBadge ${statusConfig.className}`}>
                    {statusConfig.label}
                  </div>
                </div>

                <div className="cardBody">
                  <div className="deliveryInfo">
                    <p className="label">Giao tới:</p>
                    <p className="receiver">{order.delivery.receiverName}</p>
                    <p className="address">
                      {order.delivery.address.detail},{" "}
                      {order.delivery.address.wardName},{" "}
                      {order.delivery.address.provinceName}
                    </p>
                  </div>
                </div>

                <div className="cardFooter">
                  <div className="priceInfo">
                    <div className="priceRow">
                      <span>Tạm tính:</span>
                      <span className="price">
                        {order.subtotal.toLocaleString("vi-VN")}₫
                      </span>
                    </div>
                    {order.discountAmount > 0 && (
                      <div className="priceRow">
                        <span>Giảm giá:</span>
                        <span className="discount">
                          -{order.discountAmount.toLocaleString("vi-VN")}₫
                        </span>
                      </div>
                    )}
                    {order.shippingFee > 0 && (
                      <div className="priceRow">
                        <span>Phí vận chuyển:</span>
                        <span className="shipping">
                          {order.shippingFee.toLocaleString("vi-VN")}₫
                        </span>
                      </div>
                    )}
                    <div className="totalRow">
                      <span>Tổng cộng:</span>
                      <span className="total">
                        {order.totalAmount.toLocaleString("vi-VN")}₫
                      </span>
                    </div>
                  </div>

                  <Link href={`/order/${order._id}`} className="viewButton">
                    Xem chi tiết
                  </Link>
                </div>
              </div>
            );
          })}
          <PaginationLayout meta={meta} nameItem="đơn hàng" />
        </div>
      ) : (
        <div className="emptyState">
          <svg
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M9 2L6.46447 4.53553C6.07154 4.92848 6.07154 5.56164 6.46447 5.95456L9 8.49009M15 2L17.5355 4.53553C17.9285 4.92848 17.9285 5.56164 17.5355 5.95456L15 8.49009" />
            <path d="M6 12H18" />
            <rect x="2" y="9" width="20" height="13" rx="2" />
          </svg>
          <p>Bạn chưa có đơn hàng nào</p>
          <p className="emptySubtext">
            Bắt đầu mua sắm để tạo đơn hàng đầu tiên
          </p>
        </div>
      )}
    </div>
  );
};

export default OrderList;
