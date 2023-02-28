import { CandleProps } from "@/subpages/subpageConfig";
import { useEffect, useState } from "react";
import { Gender, Profile } from "@/types";
import { getProfilesHelper } from "../helper";
import { popError } from "@/utils/pop";
import { Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { renderGender } from "@/components/Gender";
import { renderProfileType } from "@/components/ProfileType";


const Index: React.FC<CandleProps> = () => {

  const [profiles, setProfiles] = useState<Profile[]>([]);

  const init = async () => {
    const resp = await getProfilesHelper();
    if (!resp.success) {
      return popError(resp.data.error)
    }
    setProfiles(resp.data);
  }

  useEffect(() => {
    init();
  }, [])

  return (
    <div>
      <Table dataSource={profiles} columns={columns} />;
    </div>
  )
}



const columns: ColumnsType<Profile> = [
  {
    title: 'ID',
    dataIndex: 'user_id',
    key: 'user_id',
  },
  {
    title: '用户名',
    dataIndex: 'username',
    key: 'username',
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: '性别',
    dataIndex: 'gender',
    key: 'gender',
    render: renderGender,
  },

  {
    title: '注册日期',
    dataIndex: 'created_at',
    key: 'created_at',
    render: date => new Date(date).toLocaleDateString()
  },
  {
    title: '类型',
    dataIndex: 'profile_type',
    key: 'profile_type',
    render: renderProfileType
  },
];

export default Index;