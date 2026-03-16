"use client";

import "./order.detail.scss";

const OrderDetailSkeleton = () => {
  return (
    <div className="order-detail-container">
      <div className="max-width">
        {/* Header Skeleton */}
        <div className="order-detail-header">
          <div className="back-link skeleton" style={{ width: "200px", height: "24px" }}></div>
          <div className="header-card">
            <div className="header-top">
              <div className="header-left">
                <div className="skeleton" style={{ width: "150px", height: "32px", marginBottom: "8px" }}></div>
                <div className="skeleton" style={{ width: "120px", height: "20px" }}></div>
              </div>
              <div className="skeleton" style={{ width: "100px", height: "32px" }}></div>
            </div>
            <div className="skeleton" style={{ width: "300px", height: "20px", marginTop: "12px" }}></div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="order-detail-content">
          {/* Left Column */}
          <div className="order-detail-left">
            {/* Order Items Skeleton */}
            <div className="card">
              <div className="skeleton" style={{ width: "200px", height: "28px", marginBottom: "16px" }}></div>
              <div className="order-items">
                {[1, 2, 3].map((index) => (
                  <div key={index} className="item skeleton-item">
                    <div className="item-image skeleton" style={{ width: "100px", height: "100px" }}></div>
                    <div className="item-details" style={{ flex: 1 }}>
                      <div className="skeleton" style={{ width: "100%", height: "20px", marginBottom: "8px" }}></div>
                      <div className="skeleton" style={{ width: "80%", height: "16px", marginBottom: "6px" }}></div>
                      <div className="skeleton" style={{ width: "70%", height: "16px", marginBottom: "6px" }}></div>
                      <div className="skeleton" style={{ width: "60%", height: "16px" }}></div>
                    </div>
                    <div className="skeleton" style={{ width: "80px", height: "24px" }}></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Info Skeleton */}
            <div className="card">
              <div className="skeleton" style={{ width: "200px", height: "28px", marginBottom: "16px" }}></div>
              <div className="delivery-info">
                {[1, 2, 3].map((index) => (
                  <div key={index} className="info-group">
                    <div className="skeleton" style={{ width: "100px", height: "16px", marginBottom: "8px" }}></div>
                    <div className="skeleton" style={{ width: "100%", height: "20px" }}></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="order-detail-right">
            {/* Order Summary Skeleton */}
            <div className="card">
              <div className="skeleton" style={{ width: "200px", height: "28px", marginBottom: "16px" }}></div>
              <div className="order-summary">
                {[1, 2, 3, 4].map((index) => (
                  <div key={index} className="summary-row">
                    <div className="skeleton" style={{ width: "100px", height: "20px" }}></div>
                    <div className="skeleton" style={{ width: "80px", height: "20px" }}></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Info Skeleton */}
            <div className="card">
              <div className="skeleton" style={{ width: "200px", height: "28px", marginBottom: "16px" }}></div>
              <div className="payment-info">
                {[1, 2].map((index) => (
                  <div key={index} className="info-group">
                    <div className="skeleton" style={{ width: "120px", height: "16px", marginBottom: "8px" }}></div>
                    <div className="skeleton" style={{ width: "100%", height: "20px" }}></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailSkeleton;
