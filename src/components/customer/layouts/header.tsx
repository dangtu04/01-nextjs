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
import { redirect, useRouter } from "next/navigation";
import Image from "next/image";


interface CustomerHeaderProps {
  totalQty: number;
  isAuthenticated: boolean;
}

const CustomerHeader = ({ totalQty, isAuthenticated }: CustomerHeaderProps) => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

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

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/login");
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
          label: <span onClick={handleLogout}>Đăng xuất</span>,
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

          <div className="logo" onClick={() => router.push("/")}>
           <Image src="/logo.png" alt="Logo" width={100} height={50} />
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
              onClick={() => setIsSearchModalOpen(true)}
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

      {/* Search Modal */}
      {isSearchModalOpen && (
        <div
          className="search-modal-overlay"
          onClick={() => setIsSearchModalOpen(false)}
        >
          <div
            className="search-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="search-modal-title">TÌM KIẾM</h2>
            <div className="search-modal-input-wrapper">
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyPress={handleKeyPress}
                className="search-modal-input"
                autoFocus
              />
              <button
                className="search-modal-button"
                onClick={() => {
                  handleSearch();
                  setIsSearchModalOpen(false);
                }}
              >
                <SearchOutlined style={{ fontSize: "20px" }} />
              </button>
            </div>
            <button
              className="search-modal-close"
              onClick={() => setIsSearchModalOpen(false)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CustomerHeader;
