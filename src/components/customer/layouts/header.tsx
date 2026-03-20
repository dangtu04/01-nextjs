"use client";

import React, { useState } from "react";
import {
  SearchOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { Badge, Dropdown } from "antd";
import "./header.scss";
import MenuHorizontal from "./menu.horizontal";
import { menuData } from "@/utils/menu.data";
import MenuVertical from "./menu.vertical";
import Link from "next/link";
import type { MenuProps } from "antd";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

interface CustomerHeaderProps {
  totalQty: number;
  isAuthenticated: boolean;
}

const CustomerHeader = ({ totalQty, isAuthenticated }: CustomerHeaderProps) => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleSearch = () => {
    if (searchValue.trim()) {
      router.push(`/product/search?keyword=${encodeURIComponent(searchValue)}`);
      setSearchValue("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const data: any = menuData;

  const accountMenu: MenuProps["items"] = isAuthenticated
    ? [
        {
          key: "profile",
          label: <Link href="/profile">Hồ sơ</Link>,
        },
        {
          key: "logout",
          label: <span onClick={() => signOut()}>Đăng xuất</span>,
        },
      ]
    : [
        {
          key: "login",
          label: <Link href="/login">Đăng nhập</Link>,
        },
      ];

  return (
    <>
      <header className="customer-header">
        <div className="header-container">
          <div className="menu-toggle" onClick={toggleMenu}>
            <MenuOutlined style={{ fontSize: "24px", color: "#fff" }} />
          </div>

          <div className="logo">
            <img
              src="https://placehold.co/120x40/000000/FFFFFF/png?text=iGO+STORE"
              alt="iGO Store"
            />
          </div>

          <div className="search-bar">
            <input
              type="text"
              placeholder="Bạn đang tìm gì..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyPress={handleKeyPress}
              className="search-input"
            />
            <button className="search-button" onClick={handleSearch}>
              <SearchOutlined style={{ fontSize: "18px" }} />
            </button>
          </div>

          <div className="header-actions">
            <div
              className="action-item action-item-search"
              onClick={handleSearch}
              style={{ cursor: "pointer" }}
            >
              <SearchOutlined style={{ fontSize: "24px" }} />
              <span>Tìm kiếm</span>
            </div>

            <Dropdown
              menu={{ items: accountMenu }}
              trigger={["hover"]}
              placement="bottomRight"
            >
              <div className="action-item">
                <UserOutlined style={{ fontSize: "24px" }} />
                <span>Tài khoản</span>
              </div>
            </Dropdown>

            <Link
              href={"/cart"}
              className="action-item"
              style={{ textDecoration: "none" }}
            >
              <Badge count={totalQty} offset={[5, 0]}>
                <ShoppingCartOutlined
                  style={{ fontSize: "24px", color: "#fff" }}
                />
              </Badge>

              <span>Giỏ hàng</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Menu Component */}
      <MenuHorizontal data={data} />

      <MenuVertical data={data} isOpen={isMenuOpen} onClose={closeMenu} />
    </>
  );
};

export default CustomerHeader;
