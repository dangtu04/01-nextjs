"use client";
import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  message,
  notification,
  Row,
} from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Link from "next/link";
import { authenticate, loginWithGoogle } from "@/utils/actions";
import { useRouter } from "next/navigation";
import ModalReactivate from "./modal.reactivate";
import { useState } from "react";
import ModalChangePassword from "./modal.change.password";
import "./login.scss";

// google Icon svg component
const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" style={{ marginRight: 8 }}>
    <path
      fill="#4285F4"
      d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18z"
    />
    <path
      fill="#34A853"
      d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2.01c-.72.49-1.63.84-2.7.84-2.09 0-3.85-1.4-4.48-3.29H1.83v2.07A8 8 0 0 0 8.98 17z"
    />
    <path
      fill="#FBBC05"
      d="M4.5 10.6A4.8 4.8 0 0 1 4.25 9c0-.56.1-1.1.25-1.6V5.33H1.83A8 8 0 0 0 .98 9c0 1.29.31 2.51.85 3.6z"
    />
    <path
      fill="#EA4335"
      d="M8.98 3.58c1.32 0 2.5.45 3.44 1.35l2.56-2.56A8 8 0 0 0 8.98 1a8 8 0 0 0-7.15 4.33l2.67 2.07c.63-1.89 2.4-3.82 4.48-3.82z"
    />
  </svg>
);

const Login = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [changePassword, setChangePassword] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false); // loading state

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
      } else if (res?.errCode === 3) {
        notification.error({
          message: "Lỗi máy chủ",
          description: "Vui lòng thử lại sau.",
        });
      }
    } else {
      message.success("Đăng nhập thành công!");
      window.location.href = "/";
    }
  };

  // Handler Google login
  const handleGoogleLogin = async () => {
    try {
      setGoogleLoading(true);
      await loginWithGoogle();
    } catch (error) {
      notification.error({
        message: "Đăng nhập Google thất bại",
        description: "Vui lòng thử lại.",
      });
      setGoogleLoading(false);
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
                  rules={[
                    { required: true, message: "Vui lòng nhập mật khẩu!" },
                  ]}
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

              {/* Divider + Google button */}
              <Divider className="login-divider">hoặc</Divider>

              <Button
                block
                loading={googleLoading}
                onClick={handleGoogleLogin}
                className="google-login-btn"
                icon={!googleLoading && <GoogleIcon />}
              >
                Đăng nhập với Google
              </Button>

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
