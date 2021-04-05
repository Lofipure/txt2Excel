import React from 'react';
import { Modal, Form, Input, Button, message, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import styles from './index.less';

const App = () => {
  const [modal, setModal] = React.useState<boolean>(true);
  const [passWordForm] = Form.useForm();

  return (
    <div className={styles['app']}>
      <Modal
        visible={modal}
        title="Welcome To Use TxtToExcel"
        footer={
          <Button
            onClick={() => {
              if (passWordForm.validateFields()) {
                if (
                  passWordForm.getFieldValue('password') === 'wangziheng1999'
                ) {
                  message.success('Login Success');
                  setModal(false);
                } else {
                  message.error('Password Error');
                }
              }
            }}
            type="primary"
          >
            Validate
          </Button>
        }
      >
        <Form form={passWordForm} layout="vertical">
          <Form.Item
            name="password"
            label="Please Input Password"
            rules={[{ required: true, message: 'This label is required' }]}
          >
            <Input.Password allowClear visibilityToggle />
          </Form.Item>
        </Form>
      </Modal>
      <div className={styles['container']}>
        <div className={styles['title']}>Welcome To TxtToExcel Converter</div>
        <div className={styles['sub-title']}>Only for Nian Nian</div>
        <div className={styles['upload__container']}>
          <Upload
            action={'http://114.116.246.240:1818/upload'}
            headers={{ authorization: 'authorization-text' }}
            beforeUpload={(file) => {
              const isTxt = file.type === 'text/plain';
              if (!isTxt) {
                message.error('You can only upload .txt file!');
              }
              return isTxt;
            }}
            onChange={(info) => {
              if (info.file.status === 'done') {
                Modal.confirm({
                  title: 'Result',
                  content: 'Conversion completed, do you want to download?',
                  onOk: () => {
                    window.open('http://114.116.246.240:1818/index.xlsx');
                  },
                });
              }
            }}
          >
            <Button icon={<InboxOutlined />} type="primary">
              Click To Upload
            </Button>
          </Upload>
        </div>
      </div>
    </div>
  );
};

export default App;
