"use client";
import React from "react";
import { Button, Col, Divider, Form, Input, message, notification, Row } from "antd";
import { ArrowLeftOutlined, MailOutlined } from "@ant-design/icons";
import Link from "next/link";
import { sendRequest } from "@/utils/api";
import { useRouter } from "next/navigation";
import "./verify.scss";

type VerifyProps = {
  id: string;
};

const Verify = (props: VerifyProps) => {
  const router = useRouter();
  const { id } = props;

  const onFinish = async (values: any) => {
    const { _id, code } = values;
    const res = await sendRequest<IBackendRes<any>>({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/verify-account`,
      body: { _id, code },
    });
    if (res?.data) {
      message.success("Kích hoạt tài khoản thành công!");
      router.push("/login");
    } else {
      notification.error({
        message: "Kích hoạt không thành công",
        description: res?.message,
      });
    }
  };

  return (
    <div className="verify-wrapper">
      <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
        <Col xs={22} sm={16} md={12} lg={8} xl={7}>
          <div className="verify-card">
            <div className="verify-header">
              <span className="verify-label">Xác thực</span>
              <h1 className="verify-title">Kích hoạt tài khoản</h1>
            </div>

            <div className="verify-notice">
              <MailOutlined className="verify-notice-icon" />
              <p className="verify-notice-text">
                Mã xác nhận đã được gửi đến email của bạn. Vui lòng kiểm tra hộp thư và nhập mã bên dưới.
              </p>
            </div>

            <Form
              name="verify"
              onFinish={onFinish}
              autoComplete="off"
              layout="vertical"
              className="verify-form"
            >
              <Form.Item name="_id" initialValue={id} hidden>
                <Input />
              </Form.Item>

              <Form.Item
                label="Mã xác nhận"
                name="code"
                rules={[{ required: true, message: "Vui lòng nhập mã xác nhận!" }]}
              >
                <Input placeholder="Nhập mã từ email" />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="verify-submit-btn"
                  block
                >
                  Kích hoạt
                </Button>
              </Form.Item>
            </Form>

            <Divider className="verify-divider" />

            <div className="verify-footer">
              <span>Đã có tài khoản?</span>
              <Link href="/auth/login" className="login-link">
                Đăng nhập
              </Link>
            </div>

            <div className="verify-back">
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

export default Verify;