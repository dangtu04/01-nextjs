import { Suspense } from "react";
import { sendAuthRequest } from "@/utils/api";
import { IOrder } from "@/types/models/order.model";
import OrderDetail from "@/components/customer/order/order.detail";
import OrderDetailSkeleton from "@/components/customer/order/order.detail.skeleton";

interface OrderDetailPageProps {
  params: { id: string };
}

const OrderDetailContent = async ({ id }: { id: string }) => {
  const res = await sendAuthRequest<IBackendRes<IOrder>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/orders/order-id/${id}`,
    method: "GET",
    nextOption: { cache: "no-store" },
  });

  const order = res?.data;

  if (!order) {
    return <div>Không tìm thấy đơn hàng</div>;
  }

  return <OrderDetail order={order} />;
};

const OrderDetailPage = async ({ params }: OrderDetailPageProps) => {
  const { id } = params;

  return (
    <Suspense fallback={<OrderDetailSkeleton />}>
      <OrderDetailContent id={id} />
    </Suspense>
  );
};

export default OrderDetailPage;
