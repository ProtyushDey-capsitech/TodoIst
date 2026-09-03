import { useState } from "react";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import ProjectForm from "../Components/ProjectForm";
import {
  GetAllProject,
  DeleteProject,
  UpdatePrjectStatus,
} from "../apis/ProjectApi";
import type { Project, Pagination } from "../apis/types";
import { useNavigate } from "react-router";
import {
  Col,
  Row,
  Button,
  Table,
  type TableColumnsType,
  type TableProps,
  Space,
  Flex,
  Select,
  Input,
  Popconfirm,
  message,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  LinkOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import UseDebounce from "../hooks/UseDebounce";

const ProjectPage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [open, setOpen] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [pages, setPages] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [searchStatus, setSearchStatus] = useState<string>("");
  const [editableData, setEditableData] = useState<
    Omit<Project, "status" | "taskCount">
  >({
    id: "",
    name: "",
    desc: "",
  });
  const debouncedSearch = UseDebounce<string>(search, 500);

  const columns: TableColumnsType<Project> = [
    {
      title: "Name",
      dataIndex: "name",
      width: "20%",
      ellipsis: true,
      render: (_, record) => {
        return record.name.length > 20
          ? `${record.name.slice(0, 20)}...`
          : record.name;
      },
    },
    {
      title: "Description",
      dataIndex: "desc",
      width: "45%",
      ellipsis: true,
      render: (_, record) => {
        return record.desc.length > 49
          ? `${record.desc.slice(0, 50)}...`
          : record.desc;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      width: "15%",
      render: (_, record) => {
        return (
          <Select
            value={record.status}
            style={{ width: 120 }}
            onChange={() => UpdateStatus.mutate(record.id)}
            options={[
              { value: true, label: "Completed" },
              { value: false, label: "In Progress" },
            ]}
          />
        );
      },
    },
    {
      title: "TaskCount",
      dataIndex: "taskCount",
      width: "10%",
    },
    {
      title: "Action",
      dataIndex: "actions",
      width: "10%",
      render: (_, record) => {
        return (
          <Space size="small">
            <Button
              onClick={() => navigate(`/project/${record.id}`)}
              icon={<LinkOutlined />}
            ></Button>
            <Button
              onClick={() => ReadyforEdit(record.id, record.name, record.desc)}
              icon={<EditOutlined />}
            ></Button>
            <Popconfirm
              title="Delete the task"
              description="Are you sure to delete this project?"
              onConfirm={() => Delete.mutate(record.id)}
              onCancel={() =>
                messageApi.open({
                  type: "error",
                  content: "This is an error message",
                })
              }
              okText="Yes"
              cancelText="No"
            >
              <Button icon={<DeleteOutlined />}></Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  const onChange: TableProps<Project>["onChange"] = (pagination) => {
    setPages(pagination.current ?? 1);
  };

  const ReadyforEdit = (id: string, name: string, desc: string) => {
    const project: Omit<Project, "status" | "taskCount"> = {
      id: id,
      name: name,
      desc: desc,
    };
    console.log(project);
    setEditableData(project);
    setOpen(true);
    setIsEditing(true);
  };

  const Delete = useMutation({
    mutationFn: (id: string) => DeleteProject(id),
    mutationKey: ["ProjectDelete"],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getProjects"],
      });
      messageApi.open({
        type: "success",
        content: "Project Deleted",
      });
    },
  });

  const UpdateStatus = useMutation({
    mutationFn: (id: string) => UpdatePrjectStatus(id),

    mutationKey: ["ProjectStatus"],

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getProjects"],
      });
    },
  });

  const ClearSearch = () => {
    setSearch("");
    setSearchStatus("");
  };

  const { data, isLoading } = useQuery<Pagination<Project>>({
    queryKey: ["getProjects", pages, debouncedSearch, searchStatus],
    queryFn: () => GetAllProject(pages, 10, debouncedSearch, searchStatus),
    placeholderData: keepPreviousData,
  });

  return (
    <Flex gap={"medium"} vertical>
      {contextHolder}
      <Row
        style={{
          backgroundColor: "#F5F5F5",
          width: "100%",
          height: "45px",
          borderRadius: "10px",
          padding: "5px 16px",
          alignItems: "center",
        }}
      >
        <Col span={22} lg={23}>
          <p className="text-[16px] text-blue-500 font-medium">
            Manage your projects
          </p>
        </Col>
        <Col span={2} lg={1}>
          <Button
            icon={<ReloadOutlined />}
            shape="circle"
            onClick={() => window.location.reload()}
          />
        </Col>
      </Row>
      <Row
        gutter={[20, 10]}
        style={{
          backgroundColor: "#F5F5F5",
          width: "100%",
          minHeight: "60px",
          borderRadius: "10px",
          padding: "5px ",
          alignItems: "center",
          marginInline: "auto",
        }}
      >
        <Col xs={24} sm={14}>
          <Input
            placeholder="Search the project"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>

        <Col xs={20} sm={6}>
          <Select
            value={searchStatus}
            style={{ width: "100%" }}
            onChange={(e) => setSearchStatus(e)}
            options={[
              { value: "", label: "All" },
              { value: "true", label: "Completed" },
              { value: "false", label: "In Progress" },
            ]}
          />
        </Col>

        <Col xs={4} sm={2}>
          <Button
            icon={<ReloadOutlined />}
            shape="circle"
            onClick={ClearSearch}
          />
        </Col>
      </Row>
      <Table<Project>
        columns={columns}
        loading={isLoading}
        style={{
          width: "100%",
        }}
        scroll={{ x: "max-content" }}
        size="medium"
        dataSource={data?.results}
        onChange={onChange}
        pagination={{
          current: pages,
          pageSize: data?.pageSize ?? 10,
          total: data?.total ?? 0,
          showSizeChanger: false,
        }}
      />

      <ProjectForm
        modalopen={open}
        modaldisplay={() => {
          setOpen(false);
          setIsEditing(false);
        }}
        isEditing={isEditing}
        EditableData={editableData}
      />
    </Flex>
  );
};

export default ProjectPage;
