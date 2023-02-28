import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { Breadcrumb, Layout, Menu, Image, theme } from 'antd';
import { getItems, getPathsByItems, getProfileHelper, requestLogoutHelper } from './helper';
import { MenuProps } from 'antd/lib/menu'
import { renderSubPage, subpageConfig } from '@/subpages';
import { getHashRoute, setHashRoute } from '@/utils/helper'
import './index.less';
import { useNavigate } from 'react-router-dom';
import { Profile } from '@/types';
import { popError } from '@/utils/pop';


const { Header, Content, Footer, Sider } = Layout;
const Home: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [breadCrumbPath, setBreadCrumbPath] = useState<string[]>([])
  const [openKeys, setOpenKeys] = useState<string[]>([])
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const [profile, setProfile] = useState<Profile>();
  const navigate = useNavigate();
  const { token: { colorBgContainer, colorBgLayout }, } = theme.useToken();

  const items = useMemo(() => getItems(profile?.profile_type || null, subpageConfig,), [profile])

  const onMenuClick: NonNullable<MenuProps["onClick"]> = useCallback((e) => {
    const paths = getPathsByItems(items, e.key.split('-'))
    setBreadCrumbPath(paths)
    setHashRoute(e.key)
    setSelectedKeys(e.keyPath)
  }, [])

  const logout = async () => {
    await requestLogoutHelper()
    navigate('/');
  }

  const initialize = () => {
    let hash = getHashRoute().replace(/\//g, "-/");
    hash = hash.startsWith('-') ? hash.slice(1) : hash;
    const splitedHash = hash.split('-');
    const paths = getPathsByItems(items, splitedHash)
    setOpenKeys([splitedHash[0]])
    setSelectedKeys([hash])
    setBreadCrumbPath(paths)
  }

  const setupUser = async () => {
    const res = await getProfileHelper();
    res.success ? setProfile(res.data) : popError(res.data.error)
  }

  useEffect(() => {
    initialize()
    setupUser()
  }, [])

  return (
    <div className='page-home'>
      {!profile ? <div style={{ display: 'flex', justifyContent: 'center' }}>loading...</div> :
        <Layout className='layout'>
          <Header className="header">
            <div> <span >LibAdmin ♥</span></div>
            <div className='avatar'>
              <span>Hello, {profile?.username} </span>
              <span className='avatar-logout' onClick={logout}>注销</span>
            </div>
          </Header>
          <Layout className='body'>
            <Sider
              theme='light'
              collapsible
              collapsed={collapsed}
              onCollapse={(value: boolean | ((prevState: boolean) => boolean)) => setCollapsed(value)}
            >
              <Menu
                mode="inline"
                items={items}
                onClick={onMenuClick}
                onOpenChange={setOpenKeys}
                selectedKeys={selectedKeys}
                openKeys={openKeys}
              />
            </Sider>
            <Layout>
              <Content className='content'>

                <Breadcrumb style={{ margin: '16px 0' }}>
                  {breadCrumbPath.map((v, index) => <Breadcrumb.Item key={index}>{v}</Breadcrumb.Item>)}
                </ Breadcrumb>
                {renderSubPage(profile.profile_type, colorBgContainer)}
              </Content>
              {/* <Footer style={{ textAlign: 'center' }}>Footer ©2023</Footer> */}
            </Layout>
          </Layout>
        </Layout>
      }
    </div>
  );
}



export default Home;