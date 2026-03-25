"use client";

import { useHasMounted } from "@/utils/customHook";
import { Button, Form, Input, Modal, notification, Steps } from "antd";
import {
  SmileOutlined,
  SolutionOutlined,
  UserOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { sendRequest } from "@/utils/api";
import "./modal.change.password.scss";

const ModalChangePassword = (props: any) => {
  const { isModalOpen, setIsModalOpen } = props;
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();
  const [userEmail, setUserEmail] = useState("");

  const hasMounted = useHasMounted();
  if (!hasMounted) return <></>;

  const onFinishStep0 = async (values: any) => {
    const { email } = values;
    const res = await sendRequest<IBackendRes<any>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/forgot-password`,
      method: "POST",
      body: { email },
    });
    if (res?.data) {
      setUserEmail(res?.data?.email);
      setCurrent(1);
    } else {
      notification.error({
        message: "Có lỗi xảy ra",
        description: res?.message,
      });
    }
  };

  const onFinishStep1 = async (values: any) => {
    const { code, password, confirmPassword } = values;
    if (password !== confirmPassword) {
      notification.error({
        message: "Không hợp lệ",
        description: "Mật khẩu và mật khẩu xác nhận không chính xác",
      });
      return;
    }
    const res = await sendRequest<IBackendRes<any>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/reset-password`,
      method: "POST",
      body: { code, password, confirmPassword, email: userEmail },
    });
    if (res?.data) {
      setCurrent(2);
    } else {
      notification.error({
        message: "Có lỗi xảy ra",
        description: res?.message,
      });
    }
  };

  const resetModal = () => {
    setIsModalOpen(false);
    setCurrent(0);
    setUserEmail("");
    form.resetFields();
  };

  return (
    <Modal
      title={null}
      open={isModalOpen}
      onOk={resetModal}
      onCancel={resetModal}
      maskClosable={false}
      footer={null}
      className="change-password-modal"
      width={480}
    >
      <div className="cp-modal-header">
        <span className="cp-modal-label">Tài khoản</span>
        <h2 className="cp-modal-title">Quên mật khẩu</h2>
      </div>

      <Steps
        current={current}
        className="cp-steps"
        items={[
          { title: "Email", icon: <UserOutlined /> },
          { title: "Xác nhận", icon: <SolutionOutlined /> },
          { title: "Hoàn tất", icon: <SmileOutlined /> },
        ]}
      />

      <div className="cp-step-content">
        {current === 0 && (
          <>
            <p className="cp-description">
              Nhập email tài khoản của bạn để nhận mã xác nhận đổi mật khẩu.
            </p>
            <Form
              name="change-password"
              onFinish={onFinishStep0}
              autoComplete="off"
              layout="vertical"
              form={form}
              className="cp-form"
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: "Vui lòng nhập email!" }]}
              >
                <Input placeholder="email@example.com" />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="cp-submit-btn"
                  block
                >
                  Gửi mã xác nhận
                </Button>
              </Form.Item>
            </Form>
          </>
        )}

        {current === 1 && (
          <>
            <p className="cp-description">
              Mã xác nhận đã được gửi tới <strong>{userEmail}</strong>. Nhập mã
              và đặt mật khẩu mới.
            </p>
            <Form
              name="change-pass-2"
              onFinish={onFinishStep1}
              autoComplete="off"
              layout="vertical"
              className="cp-form"
            >
              <Form.Item
                label="Mã xác nhận"
                name="code"
                rules={[{ required: true, message: "Vui lòng nhập mã!" }]}
              >
                <Input placeholder="Nhập mã từ email" />
              </Form.Item>
              <Form.Item
                label="Mật khẩu mới"
                name="password"
                rules={[{ required: true, message: "Vui lòng nhập mật khẩu mới!" }]}
              >
                <Input.Password/>
              </Form.Item>
              <Form.Item
                label="Xác nhận mật khẩu"
                name="confirmPassword"
                rules={[{ required: true, message: "Vui lòng xác nhận mật khẩu!" }]}
              >
                <Input.Password/>
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="cp-submit-btn"
                  block
                >
                  Xác nhận
                </Button>
              </Form.Item>
            </Form>
          </>
        )}

        {current === 2 && (
          <div className="cp-success">
            <CheckCircleOutlined className="cp-success-icon" />
            <p className="cp-success-text">Mật khẩu đã được thay đổi thành công.</p>
            <p className="cp-success-sub">Vui lòng đăng nhập lại để tiếp tục.</p>
            <Button
              type="primary"
              className="cp-submit-btn cp-done-btn"
              onClick={resetModal}
              block
            >
              Đóng
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ModalChangePassword;