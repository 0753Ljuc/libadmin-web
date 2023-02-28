import { EditableCellProps, EditableRowProps } from "@/types";
import { Form, FormInstance, Input, InputRef, Modal, Popover, Tooltip } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Children, Context, createContext, useContext, useEffect, useRef, useState } from "react";




const getEditableCell = <T extends object>(context: Context<FormInstance<T>>) => {

  const EditableCell: React.FC<EditableCellProps> = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    ellipsis,
    handleSave,
    ...restProps
  }) => {
    const [editing, setEditing] = useState(false);
    const form = useContext(context)!;

    const toggleEdit = () => {
      setEditing(!editing);
      form.setFieldValue(dataIndex, record[dataIndex]);
    };


    const save = async () => {
      try {
        const values = await form.validateFields();
        await handleSave({ ...record, ...values });
        toggleEdit();
      } catch (errInfo) {
        console.log('Save failed:', errInfo);
      }
    };

    let childNode = children;
    if (editable) {
      childNode = editing ? (
        <Form.Item
          style={{ margin: 0 }}
          name={dataIndex}
          rules={[{ required: true, message: `${title} is required.`, },]}

        >
          <Modal title={"编辑" + title} open={editing} onOk={save} onCancel={toggleEdit}>
            <TextArea rows={3} maxLength={256} defaultValue={form.getFieldValue(dataIndex)}
              onChange={e => form.setFieldValue(dataIndex, e.target.value)}
            />
          </Modal>
        </Form.Item>
      ) : (
        //ant-table-cell ant-table-cell-ellipsis
        ellipsis
          ? (
            <div className="ant-table-cell-ellipsis" onClick={toggleEdit}>
              <Tooltip title={children}> {children} </Tooltip>
            </div>
          )
          : <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={toggleEdit}>
            {children}
          </div>
      );
    }

    return <td {...restProps}>{childNode}</td>;
  };
  return EditableCell;
}



const getEditableRow = <T extends object>(context: Context<FormInstance<T>>) => {
  const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
      <Form form={form} component={false}>
        <context.Provider value={form}>
          <tr {...props} />
        </context.Provider>
      </Form>
    );
  };
  return EditableRow;
}


export const getEditable = <T extends object>() => {
  const EditableContext = createContext<FormInstance<T>>(null!);
  return { body: { row: getEditableRow(EditableContext), cell: getEditableCell(EditableContext), }, };
}