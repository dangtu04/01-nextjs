"use client";

import {
  IOrder,
  OrderStatus,
  PaymentStatus,
  PaymentMethod,
} from "@/types/models/order.model";
import Link from "next/link";
import "./order.detail.scss";
import { LeftOutlined } from "@ant-design/icons";

const nullImage = "/null-product.png";

interface OrderDetailProps {
  order: IOrder;
}

const getStatusLabel = (status: OrderStatus) => {
  const statusLabels: Record<OrderStatus, string> = {
    [OrderStatus.PENDING]: "Chờ xác nhận",
    [OrderStatus.CONFIRMED]: "Đã xác nhận",
    [OrderStatus.PROCESSING]: "Đang xử lý",
    [OrderStatus.SHIPPING]: "Đang giao",
    [OrderStatus.COMPLETED]: "Hoàn thành",
    [OrderStatus.CANCELLED]: "Đã hủy",
    [OrderStatus.REFUNDED]: "Đã hoàn tiền",
  };
  return statusLabels[status];
};

const getPaymentStatusLabel = (status: PaymentStatus) => {
  const labels: Record<PaymentStatus, string> = {
    [PaymentStatus.UNPAID]: "Chưa thanh toán",
    [PaymentStatus.PAID]: "Đã thanh toán",
    [PaymentStatus.FAILED]: "Thanh toán thất bại",
    [PaymentStatus.REFUNDED]: "Đã hoàn tiền",
  };
  return labels[status];
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const OrderDetail = ({ order }: OrderDetailProps) => {
  return (
    <div className="order-detail-container">
      <div className="max-width">
        {/* Header */}
        <div className="order-detail-header">
          <Link href="/order" className="back-link">
            <LeftOutlined />
            Quay lại danh sách đơn hàng
          </Link>
          <div className="header-card">
            <div className="header-top">
              <div className="header-left">
                <h1>Đơn hàng</h1>
                <p>#{order._id}</p>
              </div>
              <div className="header-right">
                <span className={`status-badge ${order.status.toLowerCase()}`}>
                  {getStatusLabel(order.status)}
                </span>
              </div>
            </div>
            <p className="header-date">
              Ngày đặt hàng: {formatDate(order.createdAt)}
            </p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="order-detail-content">
          {/* Left Column - Order Items */}
          <div className="order-detail-left">
            {/* Order Items */}
            <div className="card">
              <h2>Sản phẩm đã đặt</h2>
              <div className="order-items">
                {order.items && order.items.length > 0 ? (
                  order.items.map((item, index) => (
                    <div key={index} className="item">
                      <div className="item-image">
                        <img src={item.thumbnail || nullImage} alt={item.productName} />
                      </div>
                      <div className="item-details">
                        <Link
                          href={`/product/${item.productSlug}`}
                          className="item-name"
                        >
                          {item.productName}
                        </Link>
                        <p className="item-info">
                          Size: {item.sizeName} ({item.sizeCode})
                        </p>
                        <p className="item-info">
                          Đơn giá: {formatPrice(item.price)}
                        </p>
                        <p className="item-info">Số lượng: {item.quantity}</p>
                      </div>
                      <div className="item-total">
                        <p className="price">{formatPrice(item.totalPrice)}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="empty-message">Không có sản phẩm nào</p>
                )}
              </div>
            </div>

            {/* Delivery Information */}
            <div className="card">
              <h2>Thông tin giao hàng</h2>
              <div className="delivery-info">
                <div className="info-group">
                  <p className="label">Người nhận</p>
                  <p className="value">{order.delivery.receiverName}</p>
                </div>
                <div className="info-group">
                  <p className="label">Số điện thoại</p>
                  <p className="value">{order.delivery.receiverPhone}</p>
                </div>
                <div className="info-group">
                  <p className="label">Địa chỉ giao hàng</p>
                  <p className="value">{order.delivery.address.detail}</p>
                  <p className="value">
                    {order.delivery.address.wardName},{" "}
                    {order.delivery.address.provinceName}
                  </p>
                </div>
                {order.delivery.note && (
                  <div className="info-group">
                    <p className="label">Ghi chú</p>
                    <p className="value">{order.delivery.note}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="order-detail-right">
            {/* Price Summary */}
            <div className="card">
              <h2>Tóm tắt đơn hàng</h2>
              <div className="order-summary">
                <div className="summary-row">
                  <span className="label">Tạm tính:</span>
                  <span className="value">{formatPrice(order.subtotal)}</span>
                </div>
                <div className="summary-row">
                  <span className="label">Phí vận chuyển:</span>
                  <span className="value">
                    {formatPrice(order.shippingFee)}
                  </span>
                </div>
                {order.discountAmount > 0 && (
                  <div className="summary-row discount">
                    <span className="label">Giảm giá:</span>
                    <span className="value">
                      -{formatPrice(order.discountAmount)}
                    </span>
                  </div>
                )}
                <div className="summary-row divider"></div>
                <div className="summary-row total">
                  <span className="label">Tổng cộng:</span>
                  <span className="value">
                    {formatPrice(order.totalAmount)}
                  </span>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="card">
              <h2>Thanh toán</h2>
              <div className="payment-info">
                <div className="info-group">
                  <p className="label">Phương thức thanh toán</p>
                  <p className="value">
                    {order.payment.method === PaymentMethod.COD
                      ? "Thanh toán khi nhận hàng (COD)"
                      : "VNPay"}
                  </p>
                </div>
                <div className="info-group">
                  <p className="label">Trạng thái thanh toán</p>
                  <p>
                    <span
                      className={`payment-status-badge ${order.payment.status.toLowerCase()}`}
                    >
                      {getPaymentStatusLabel(order.payment.status)}
                    </span>
                  </p>
                </div>
                {order.payment.transactionId && (
                  <div className="info-group">
                    <p className="label">Mã giao dịch</p>
                    <p className="value transaction-id">
                      {order.payment.transactionId}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
