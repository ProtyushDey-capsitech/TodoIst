import React, { useEffect, useState } from "react";
import { Button, Layout, Modal } from "antd";
import { Navbar } from "../Components/Navbar";
import { Outlet, useLocation } from "react-router";
import ProjectForm from "../Components/ProjectForm";

const { Header, Content } = Layout;

const DashBoardPages = () => {
  const location = useLocation();
  const [open, setOpen] = useState<boolean>(false);

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

  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "white" }}>
      <Navbar />
      <Layout style={{ backgroundColor: "white" }}>
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
            {location.pathname=="/"?"DashBoard":location.pathname.slice(1)}
          </h1>
          <Button type="primary" onClick={() => setOpen(true)}>
            + Add Project
          </Button>
        </Header>
        <Content style={{ margin: "15px"}}>
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
