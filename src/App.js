import React from 'react';
import './App.css';
import { BrowserRouter } from "react-router-dom"
import { Layout, theme } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import AppHeader from './component/header/AppHeader';
import AppSider from './component/sider/AppSider';
import AppContent from './component/pagecontent/AppContent';

// import AppFooter from './component/footer/AppFooter'

function App() {
  const {
    token: {
      colorBgContainner
    },
  } = theme.useToken();
  return (
    <div className="App">
      <BrowserRouter>
        <Layout >
          <Header style={{ width: "100%" }}>
            <AppHeader></AppHeader>
          </Header>
          <Layout>
            <Layout>
              <AppSider></AppSider>
              <Content
                className='content'
                style={{
                  background: colorBgContainner,
                  margin: 0,
                  backgroundColor: 'white'
                }}>
                <AppContent />
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </BrowserRouter>
    </div>
  );
}


export default App;