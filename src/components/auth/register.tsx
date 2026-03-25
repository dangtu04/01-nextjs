"use client";
import React from "react";
import { Button, Col, Divider, Form, Input, notification, Row } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Link from "next/link";
import { sendRequest } from "@/utils/api";
import { useRouter } from "next/navigation";
import "./register.scss";

const Register = () => {
  const router = useRouter();

  const onFinish = async (values: any) => {
    const { email, name, password } = values;
    const res = await sendRequest<IBackendRes<any>>({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/register`,
      body: { email, name, password },
    });

    console.log("res register", res);
    if (res?.data && res?.statusCode === 201) {
      router.push(`/verify/${res?.data?._id}`);
    } else {
      notification.error({
        message: "Đăng ký không thành công",
        description: res?.message,
      });
    }
  };

  return (
    <div className="register-wrapper">
      <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
        <Col xs={22} sm={16} md={12} lg={8} xl={7}>
          <div className="register-card">
            <div className="register-header">
              <span className="register-label">Đăng ký</span>
              <h1 className="register-title">Tạo tài khoản mới</h1>
            </div>

            <Form
              name="register"
              onFinish={onFinish}
              autoComplete="off"
              layout="vertical"
              className="register-form"
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: "Vui lòng nhập email!" }]}
              >
                <Input placeholder="email@example.com" />
              </Form.Item>

              <Form.Item label="Họ và tên" name="name">
                <Input placeholder="Nguyễn Văn A" />
              </Form.Item>

              <Form.Item
                label="Mật khẩu"
                name="password"
                rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="register-submit-btn"
                  block
                >
                  Đăng ký
                </Button>
              </Form.Item>
            </Form>

            <Divider className="register-divider" />

            <div className="register-footer">
              <span>Đã có tài khoản?</span>
              <Link href="/login" className="login-link">
                Đăng nhập
              </Link>
            </div>

            <div className="register-back">
              <Link href="/" className="back-link">
                <ArrowLeftOutlined />
                <span>Quay lại trang chủ</span>
              </Link>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Register;
