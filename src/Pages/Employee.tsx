import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  MoreOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Flex,
  Input,
  message,
  Popconfirm,
  Popover,
  Row,
  Space,
  Table,
  type TableColumnsType,
  type TableProps,
} from "antd";
import type { employee, Pagination } from "../apis/types";
import EmplyeeForm from "../Components/EmplyeeForm";
import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getEmployeeList } from "../apis/DashBoardApi";
import UseDebounce from "../hooks/UseDebounce";

const Employee = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [messageApi, contextHolder] = message.useMessage();
  const [pages, setPages]= useState<number>(1);
  const columns: TableColumnsType<employee> = [
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
      title: "Email",
      dataIndex: "desc",
      width: "40%",
      ellipsis: true,
      render: (_, record) => {
        return (
          <div className="flex items-center justify-between w-full">
            <p>
              {record.email.length > 49
                ? `${record.email.slice(0, 50)}...`
                : record.email}
            </p>
            <CopyOutlined
              className="cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText(record.email);
                messageApi.open({
                      type: "success",
                      content: "Employee mail is copied",
                    })
              }}
            />
          </div>
        );
      },
    },
    {
      title: "Role",
      dataIndex: "desc",
      width: "20%",
      ellipsis: true,
      render: (_, record) => {
        return record.role;
      },
    },
    {
      title: "TaskCount",
      dataIndex: "taskCount",
      width: "15%",
      render: (_) => {
        return 2;
      },
    },
    {
      title: "Action",
      dataIndex: "actions",
      width: "5%",
      render: (_, record) => {
        return (
          <Popover
            content={
              <Space size="small">
                <Button
                  onClick={() => console.log(record.id)}
                  icon={<EditOutlined />}
                ></Button>
                <Popconfirm
                  title="Delete the task"
                  description="Are you sure to delete this project?"
                  onConfirm={() => console.log(record.id)}
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
            }
            arrow={false}
          >
            <Button icon={<MoreOutlined />}></Button>
          </Popover>
        );
      },
    },
  ];
  const debouncedSearch = UseDebounce<string>(search, 500);
const onChange: TableProps<employee>["onChange"] = (pagination) => {
    setPages(pagination.current ?? 1);
  };
  const { data, isLoading } = useQuery<Pagination<employee>>({
    queryKey: ["getemployeeList", pages, debouncedSearch],

    queryFn: () => getEmployeeList(pages, debouncedSearch),
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
            Manage your Employees
          </p>
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
            placeholder="Search your employee"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>
        <Col xs={4} sm={2}>
          <Button
            icon={<PlusOutlined />}
            shape="circle"
            onClick={() => setOpen(true)}
          />
        </Col>
      </Row>
      <Table<employee>
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
      <EmplyeeForm
        modalopen={open}
        modaldisplay={() => {
          setOpen(false);
        }}
      />
    </Flex>
  );
};

export default Employee;
