"use client";

import React from "react";
import { Pagination } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import "./pagination.scss";

interface IProps {
  meta?: {
    current: number;
    pageSize: number;
    pages: number;
    totals: number;
  };
  nameItem?: string;
}

const PaginationLayout = (props: IProps) => {
  const { meta, nameItem } = props;
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePaginationChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("current", page.toString());
    router.push(`?${params.toString()}`, { scroll: true });
    router.refresh();
  };

  if (!meta) return null;

  return (
    <div className="pagination-container">
      <Pagination
        current={meta.current}
        defaultCurrent={1}
        total={meta.totals}
        pageSize={meta.pageSize}
        onChange={handlePaginationChange}
        showTotal={(total, range) =>
          `${range[0]}-${range[1]} của ${total} ${nameItem || "mục"}`
        }
      />
    </div>
  );
};

export default PaginationLayout;
