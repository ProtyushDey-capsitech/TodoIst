import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { GetAllTask } from "../apis/TaskApi";
import {
  Badge,
  Col,
  Collapse,
  Empty,
  Flex,
  Row,
  Spin,
  Table,
  Tag,
  type CollapseProps,
  type TableColumnsType,
} from "antd";
import type { getalltask, taskproject } from "../apis/types";
import { useState } from "react";
import { FIlterSection } from "../Components/TaskPage/FIlterSection";

const TaskPage = () => {
  const [search, setSearch] = useState<string>("");
  const [searchproject, setSearcProject] = useState<string[]>([]);

  const { data, isLoading } = useQuery<getalltask[]>({
    queryKey: ["getTasks", search, searchproject],
    queryFn: () => GetAllTask(search, searchproject),
    placeholderData: keepPreviousData,
  });

  const columns: TableColumnsType<taskproject> = [
    {
      title: "Task",
      dataIndex: "name",
      key: "name",
      width: 180,
      ellipsis: true,
    },
    {
      title: "Description",
      dataIndex: "desc",
      key: "desc",
      width: 300,
      ellipsis: true,
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      width: 130,
      render: (priority) => (
        <Tag
          color={
            priority === "HIGH"
              ? "red"
              : priority === "MEDIUM"
                ? "orange"
                : "green"
          }
        >
          {priority}
        </Tag>
      ),
    },
    {
      title: "Project",
      dataIndex: "projectName",
      key: "projectName",
      width: 180,
      ellipsis: true,
    },
  ];

  const items: CollapseProps["items"] = data?.map((x: getalltask) => {
    return {
      key: x.status,
      label: (
        <Flex gap={10} align="center">
          <p className="font-medium">{x.status}</p>
          <Badge count={x.count} style={{ backgroundColor: "#52c41a" }} />
        </Flex>
      ),
      children: (
        <Table<taskproject>
          columns={columns}
          loading={isLoading}
          style={{
            width: "100%",
          }}
          scroll={{ x: "max-content" }}
          size="middle"
          dataSource={x.tasks}
          rowKey={(record) => record.id}
          pagination={false}
        />
      ),
    };
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
        <Col span={22} lg={23}>
          <p className="text-[16px] text-blue-500 font-medium">See all Tasks</p>
        </Col>
      </Row>
      <Row
        gutter={[20, 10]}
        style={{
          backgroundColor: "#F5F5F5",
          width: "100%",
          minHeight: "60px",
          borderRadius: "10px",
          padding: "5px 16px",
          alignItems: "center",
          marginInline: "auto",
        }}
      >
        <FIlterSection
          search={search}
          setSearch={setSearch}
          searchproject={searchproject}
          setSearchProject={setSearcProject}
        />
      </Row>
      {isLoading ? (
        <Flex justify="center" align="center" style={{ height: 300 }}>
          <Spin size="large" />
        </Flex>
      ) : data?.length ? (
        <Collapse
          items={items}
          defaultActiveKey={["Todo", "Inprogress"]}
          styles={{ body: { padding: 0 } }}
        />
      ) : (
        <Empty description="No tasks found" />
      )}
    </Flex>
  );
};

export default TaskPage;
