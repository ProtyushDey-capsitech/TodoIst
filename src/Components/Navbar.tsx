import Sider from "antd/es/layout/Sider";
import { Button, ConfigProvider, Menu } from "antd";
import { DatabaseOutlined, CheckSquareOutlined } from "@ant-design/icons";
import { LogoutUser } from "../apis/AuthApi";
import { useLocation, useNavigate } from "react-router";
import React from "react";

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    { label: "Projects", icon: DatabaseOutlined },
    { label: "Tasks", icon: CheckSquareOutlined },
  ].map((navitems) => ({
    key: `/${navitems.label}`,
    icon: React.createElement(navitems.icon),
    label: `${navitems.label}`,
     style: {
    marginBottom: 5,
  },
  }));

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
      width={260}
      style={{
        height: "100vh",
        backgroundColor: "#F5F5F5",
        padding: "10px",
        paddingBlock: "20px",
        boxShadow:"rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px"
      }}
      styles={{
        body: {
          display: "flex",
          flexDirection: "column",
          gap: "100px",
          justifyContent: "space-between",
        },
      }}
    >
      <div className=" flex flex-col gap-5">
        <h1 className="text-3xl font-medium mx-auto">TaskManager</h1>
        <ConfigProvider
          theme={{
            components: {
              Menu: {
                itemSelectedBg: "#E8EDF2",
                itemSelectedColor: "#1677ff",
                itemHoverBg: "#f5f5f5",
                itemHoverColor: "#1677ff",
                itemBorderRadius:8,
                itemHeight: 35,
              },
            },
          }}
        >
          <Menu
            mode="inline"
            selectedKeys={[location.pathname]}
            items={items}
            style={{
              background: "transparent",
              border: "none",
              fontWeight: 600,
              fontSize: 16,
            }}
            onClick={(e)=>navigate(e.key)}
          />
        </ConfigProvider>
      </div>
      <Button
        type="primary"
        onClick={() => {
          navigate("/login");
          LogoutUser();
        }}
      >
        Logout
      </Button>
    </Sider>
  );
};
