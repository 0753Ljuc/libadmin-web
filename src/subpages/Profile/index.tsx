import { getProfile } from "@/request";
import Table, { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { Profile, ProfileType } from '@/types';
import { popError } from "@/utils/pop";
import { matchGender, matchProfileType } from "@/utils/helper";



const Index: React.FC = () => {
  const [profiles, setProfiles] = useState<Profile[]>([])
  const getProfileHelper = async () => {
    const resp = await getProfile()
    if (resp.success) {
      setProfiles([resp.data])
    } else {
      popError(resp.data.error)
    }
  }

  useEffect(() => {
    getProfileHelper()
  }, [])

  return (
    <div>
      <Table columns={columns} dataSource={profiles} />
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
    title: '类型',
    dataIndex: 'profile_type',
    key: 'profile_type',
    render: matchProfileType,
  },

  {
    title: '性别',
    dataIndex: 'gender',
    key: 'gender',
    render: matchGender,
  },

];
export default Index;