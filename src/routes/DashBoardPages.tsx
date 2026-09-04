import { useEffect, useState } from "react";
import { Avatar, Button, Layout, Popover } from "antd";
import { Navbar } from "../Components/Navbar";
import { Outlet, useLocation } from "react-router";
import ProjectForm from "../Components/ProjectForm";
import { MenuOutlined, PlusOutlined, RightOutlined, UserOutlined } from "@ant-design/icons";
import UserComponent from "../Components/UserComponent";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { UserData } from "../apis/types";
import { Me } from "../apis/AuthApi";

const { Header, Content } = Layout;

const DashBoardPages = () => {
  const location = useLocation();
  const [open, setOpen] = useState<boolean>(false);
  const [userOpen, setUserOpen] = useState<boolean>(false);
  const [mobile, setMobile] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "b") {
        event.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const { data } = useQuery<UserData>({
    queryKey: ["User"],
    queryFn: () => Me(),
    placeholderData: keepPreviousData,
  });

  // return (
  //   <Layout style={{ minHeight: "100vh", backgroundColor: "white", overflow: "hidden" }}>
  //     <Navbar
  //       setMobile={setMobile}
  //       setOpen={setNavOpen}
  //       mobile={mobile}
  //       open={navOpen}
  //     />
  //     <Layout style={{ backgroundColor: "white",  minWidth: 0,
  //       minHeight: 0, }}>
  //       <Header
  //         style={{
  //           paddingInline: "15px",
  //           backgroundColor: "white",
  //           boxShadow:
  //             "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
  //           display: "flex",
  //           justifyContent: "space-between",
  //           alignItems: "center",
  //         }}
  //       >
  //         <h1 className="text-lg font-semibold">
  //           {location.pathname == "/"
  //             ? "DashBoard"
  //             : location.pathname.slice(1)}
  //         </h1>
  //         <div className="flex items-center justify-center gap-2">
  //           <Button type="primary" onClick={() => setOpen(true)} icon={<PlusOutlined />}>
  //           {!mobile && (
  //               "Add Project"
  //             )}
  //             {mobile && (
  //               ""
  //             )}
  //             </Button>

  //           <Popover
  //             placement="topLeft"
  //             trigger="click"
  //             open={userOpen}
  //             onOpenChange={() => setUserOpen(true)}
  //             content={
  //               <a onClick={() => setUserOpen(false)}>
  //                 <UserComponent data={data} />
  //               </a>
  //             }
  //           >
  //             <Button
  //               color="default"
  //               variant="outlined"
  //               shape="round"
  //               icon={<RightOutlined />}
  //               iconPlacement="end"
  //               style={{
  //                 padding: "5px",
  //                 width: "60px",
  //               }}
  //             >
  //               <Avatar shape="circle" icon={<UserOutlined />} size="small" />
  //             </Button>
  //           </Popover>
  //           {mobile && (
  //             <Button
  //               type="text"
  //               icon={<MenuOutlined />}
  //               onClick={() => setNavOpen(true)}
  //             />
  //           )}
  //         </div>
  //       </Header>
  //       <Content style={{ margin: "15px" ,overflowY: "auto",
  //   overflowX: "hidden",}}>
  //         <Outlet />
  //       </Content>
  //     </Layout>
  //     <ProjectForm
  //       modalopen={open}
  //       modaldisplay={() => {
  //         setOpen(false);
  //       }}
  //       isEditing={false}
  //       EditableData={{ name: "", desc: "", id: "" }}
  //     />
  //   </Layout>
  // );
  return (
  <Layout
    style={{
      height: "100vh",
      overflow: "hidden",
      backgroundColor: "white",
    }}
  >
    <Navbar
      setMobile={setMobile}
      setOpen={setNavOpen}
      mobile={mobile}
      open={navOpen}
    />

    <Layout
      style={{
        backgroundColor: "white",
        minWidth: 0,
        minHeight: 0,
      }}
    >
      <Header
        style={{
          paddingInline: "15px",
          backgroundColor: "white",
          boxShadow:
            "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 className="text-lg font-semibold">
          {location.pathname == "/"
            ? "DashBoard"
            : location.pathname.slice(1)}
        </h1>

        <div className="flex items-center justify-center gap-2">
          <Button
            type="primary"
            onClick={() => setOpen(true)}
            icon={<PlusOutlined />}
          >
            {!mobile && "Add Project"}
          </Button>

          <Popover
            placement="topLeft"
            trigger="click"
            open={userOpen}
            onOpenChange={(value) => setUserOpen(value)}
            content={
              <a onClick={() => setUserOpen(false)}>
                <UserComponent data={data} />
              </a>
            }
          >
            <Button
              color="default"
              variant="outlined"
              shape="round"
              icon={<RightOutlined />}
              iconPlacement="end"
              style={{
                padding: "5px",
                width: "60px",
              }}
            >
              <Avatar
                shape="circle"
                icon={<UserOutlined />}
                size="small"
              />
            </Button>
          </Popover>

          {mobile && (
            <Button
              type="text"
              icon={<MenuOutlined />}
              onClick={() => setNavOpen(true)}
            />
          )}
        </div>
      </Header>

      <Content
        style={{
          margin: "15px",
          minHeight: 0,
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        <Outlet />
      </Content>
    </Layout>

    <ProjectForm
      modalopen={open}
      modaldisplay={() => {
        setOpen(false);
      }}
      isEditing={false}
      EditableData={{ name: "", desc: "", id: "" }}
    />
  </Layout>
);
};

export default DashBoardPages;
