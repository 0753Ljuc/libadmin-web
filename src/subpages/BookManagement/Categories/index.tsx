

import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Button, Form, Input, Popconfirm, Table } from 'antd';
import { ColumnTypes, EditableCellProps, EditableRowProps, CategoryFormDataSource, ProfileType } from '@/types';
import { addCategoriesHelper, categories2FormDataSource, deleteCategoryHelper, getCategoriesHelper, updateCategoriesHelper } from './helper';
import { popError } from '@/utils/pop';
import Search from 'antd/es/input/Search';
import styled from 'styled-components';
import { CandleProps } from '@/subpages/subpageConfig';
import { getEditable } from '@/components/Edtiable';


const components = getEditable();

const Categories: React.FC<CandleProps> = ({ profileType }) => {
  const [categories, setCategories] = useState<CategoryFormDataSource[]>([]);
  const [addable, setAddable] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');

  const isAdmin = profileType === ProfileType.ADMIN;

  const newCategory = useCallback(async (categoryName: string) => {
    if (!categoryName) return;
    const res = await addCategoriesHelper(categoryName)
    if (!res.success) {
      popError(res.data.error)
    }
    setSearchValue('');
    const res2 = await getCategoriesHelper();
    if (res2.success) {
      setCategories(categories2FormDataSource(res2.data))
    } else {
      popError(res2.data.error)
    }
  }, [])

  const handleSave = useCallback(async (row: CategoryFormDataSource) => {
    if (categories.find(v => v.category === row.category)) return;
    const resp = await updateCategoriesHelper(row.id, row.category)
    if (resp.success) {
      const updatedCategory = categories.find(v => v.id === row.id);
      updatedCategory!.category = row.category;
      setCategories([...categories])
    } else {
      popError(resp.data.error)
    }
  }, [categories])

  const deleteCategory = async (e: CategoryFormDataSource) => {
    const res = await deleteCategoryHelper(e.id);
    if (res.success) {
      setCategories(categories.filter(v => v.id !== e.id))
    } else {
      popError(res.data.error)
    }
  }

  const columns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
    {
      title: '编号',
      dataIndex: 'id',
    },
    {
      title: '类别',
      dataIndex: 'category',
      editable: true,
      // @ts-ignore
      onCell: (record: CategoryFormDataSource) => ({
        record,
        dataIndex: 'category',
        editable: isAdmin,
        title: "类别",
        handleSave,
      })
    },
    {
      title: '操作',
      dataIndex: 'operation',
      render: (_, record) => (
        <Popconfirm title="Sure to delete?" onConfirm={() => deleteCategory(record as CategoryFormDataSource)}>
          <a>Delete</a>
        </Popconfirm>
      )
    },
  ];


  const getCategories = async () => {
    const res = await getCategoriesHelper();
    if (res.success) {
      setCategories(categories2FormDataSource(res.data))
    } else {
      popError(res.data.error)
    }
  }

  useEffect(() => {
    getCategories()
  }, [])

  return (
    <div className='subpage-categories'>
      {isAdmin && <Button onClick={() => setAddable(!addable)} type="primary" style={{ marginBottom: 16 }}> 新增类别 </Button>}
      {
        addable && <WrappedNewCategory >
          <Search
            placeholder="Please enter new category name"
            value={searchValue}
            enterButton="确定"
            onSearch={newCategory}
            onChange={e => setSearchValue(e.target.value)}
          />
          <Button onClick={() => setAddable(false)} >取消</Button>
        </WrappedNewCategory>
      }
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={categories}
        columns={isAdmin ? columns : columns.slice(0, 2) as ColumnTypes}
      />
    </div>
  );
};

const WrappedNewCategory = styled.div`
  display: flex;
  margin-bottom: 10px;
`


export default Categories;