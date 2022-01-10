import React from 'react';
import { Modal } from 'antd';

export const MetaplexModal = (props: any) => {
  const { children, bodyStyle, ...rest } = props;

  return (
    <Modal
      bodyStyle={{
        background: '#f5deb3',
        boxShadow: '0px 6px 12px 8px rgba(0, 0, 0, 0.3)',
        borderRadius: 16,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#f5deb3',
        ...bodyStyle,
      }}
      footer={null}
      width={400}
      {...rest}
    >
      {children}
    </Modal>
  );
};
