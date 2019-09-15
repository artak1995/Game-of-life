import React from 'react';
import { Modal as AntdModal } from 'antd';

const Modal = ({ title, isOpen, onSubmit, onCancel, children }) => (
  <AntdModal title={title} visible={isOpen} onOk={onSubmit} onCancel={onCancel}>
    {children}
  </AntdModal>
);

export default Modal;
