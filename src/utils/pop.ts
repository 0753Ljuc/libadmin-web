import { Modal } from "antd";

export const popError = (msg: string, afterClose?: () => void) => {
  Modal.error({
    title: 'Error',
    content: msg,
    afterClose
  })
}

export const popSuccess = (msg: string, afterClose?: () => void) => {
  Modal.success({
    title: 'Success',
    content: msg,
    afterClose
  })
}
