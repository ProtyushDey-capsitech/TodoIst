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
  
  const [open, setOpen] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [pages, setPages] = useState<number>(1);
  const [search, setSearch]= useState<string>("")
  const [searchStatus, setSearchStatus]= useState<string>("")
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
    },
    {
      title: "Description",
      dataIndex: "desc",
      width: "45%",
      ellipsis: true,
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
            onChange={() => UpdateStatus.mutate((record.id))}
            options={[
              { value: true, label: "Completed" },
              { value: false, label: "Todo" },
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
            <Button
              onClick={() => Delete.mutate(record.id)}
              icon={<DeleteOutlined />}
            ></Button>
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

  const ClearSearch = ()=>{
    setSearch("")
    setSearchStatus("")
  }

const { data, isLoading } = useQuery<Pagination<Project>>({
  queryKey: ["getProjects", pages, debouncedSearch, searchStatus],
  queryFn: () => GetAllProject(pages, debouncedSearch, searchStatus),
  placeholderData: keepPreviousData,
});

  return (
    <Flex gap={"medium"} vertical>
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
        <Col span={23}>
          <p className="text-[16px] text-blue-500 font-medium">
            Manage your projects
          </p>
        </Col>
        <Col span={1}>
          <Button
            icon={<ReloadOutlined />}
            shape="circle"
            onClick={() => window.location.reload()}
          />
        </Col>
      </Row>
      <Row
        gutter={20}
        style={{
          backgroundColor: "#F5F5F5",
          width: "100%",
          height: "60px",
          borderRadius: "10px",
          padding: "5px 16px",
          alignItems: "center",
          marginInline:"auto"
        }}
      >
        <Col span={8}>
          <Input placeholder="Search the project" value={search} onChange={(e)=>setSearch(e.target.value)}/>
        </Col>
        <Col span={2}>
          <Select
            value={searchStatus}
            style={{ width: "100%" }}
            onChange={(e) => setSearchStatus(e)}
            options={[
              { value: "", label: "All" },
              { value: "true  ", label: "Completed" },
              { value: "false", label: "Todo" },
            ]}
          />
        </Col>
        <Col span={2}>
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
