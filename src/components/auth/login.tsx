"use client";
import { Button, Col, Divider, Form, Input, message, notification, Row } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Link from "next/link";
import { authenticate } from "@/utils/actions";
import { useRouter } from "next/navigation";
import ModalReactivate from "./modal.reactivate";
import { useState } from "react";
import ModalChangePassword from "./modal.change.password";
import "./login.scss";

const Login = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [changePassword, setChangePassword] = useState(false);

  const onFinish = async (values: any) => {
    const { email, password } = values;
    const res = await authenticate(email, password);
    if (res?.error) {
      if (res?.errCode === 1) {
        notification.error({
          message: "Đăng nhập không thành công",
          description: res?.error,
        });
      } else if (res?.errCode === 2) {
        setUserEmail(email);
        setIsModalOpen(true);
        return;
      }
    } else {
      message.success("Đăng nhập thành công!");
      router.push("/");
    }
  };

  return (
    <>
      <div className="login-wrapper">
        <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
          <Col xs={22} sm={16} md={12} lg={8} xl={7}>
            <div className="login-card">
              <div className="login-header">
                <span className="login-label">Đăng nhập</span>
                <h1 className="login-title">Chào mừng trở lại</h1>
              </div>

              <Form
                name="login"
                onFinish={onFinish}
                autoComplete="off"
                layout="vertical"
                className="login-form"
              >
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[{ required: true, message: "Vui lòng nhập email!" }]}
                >
                  <Input placeholder="email@example.com" />
                </Form.Item>

                <Form.Item
                  label="Mật khẩu"
                  name="password"
                  rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
                >
                  <Input.Password />
                </Form.Item>

                <div className="login-forgot">
                  <Button
                    type="link"
                    onClick={() => setChangePassword(true)}
                    className="forgot-btn"
                  >
                    Quên mật khẩu?
                  </Button>
                </div>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-submit-btn"
                    block
                  >
                    Đăng nhập
                  </Button>
                </Form.Item>
              </Form>

              <Divider className="login-divider" />

              <div className="login-footer">
                <span>Chưa có tài khoản?</span>
                <Link href="/register" className="register-link">
                  Đăng ký
                </Link>
              </div>

              <div className="login-back">
                <Link href="/" className="back-link">
                  <ArrowLeftOutlined />
                  <span>Quay lại trang chủ</span>
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </div>

      <ModalReactivate
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        email={userEmail}
      />
      <ModalChangePassword
        isModalOpen={changePassword}
        setIsModalOpen={setChangePassword}
      />
    </>
  );
};

export default Login;