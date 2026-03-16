import { sendAuthRequest } from "@/utils/api";
import { IOrder } from "@/types/models/order.model";
import OrderList from "@/components/customer/order/order.list";
import { cache } from "react";

interface IProps {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

const OrderPage = async (props: IProps) => {
  const current = props?.searchParams?.current ?? 1;
  const pageSize = props?.searchParams?.pageSize ?? 10;
  const sort = "-createdAt";
  const res = await sendAuthRequest<IBackendRes<IModelPaginate<IOrder>>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/orders/user`,
    method: "GET",
    queryParams: { current, pageSize, sort, ...props.searchParams },
    nextOption: { cache: "no-store" },
  });

  return (
    <OrderList
      orders={res?.data?.results}
      meta={res?.data?.meta}
    />
  );
};

export default OrderPage;