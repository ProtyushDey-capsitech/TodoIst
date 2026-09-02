import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { GetAllTask } from "../apis/TaskApi";
import {
  Badge,
  Button,
  Col,
  Collapse,
  Empty,
  Flex,
  Row,
  Spin,
  type CollapseProps,
} from "antd";
import type { getalltask, taskproject } from "../apis/types";
import { ReloadOutlined } from "@ant-design/icons";
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

  const items: CollapseProps["items"] = data?.map((x: getalltask) => {
    return {
      key: x.status,
      label: (
        <Flex gap={10}>
          <p>{x.status}</p>{" "}
          <Badge
            className="site-badge-count-109"
            count={x.count}
            style={{ backgroundColor: "#52c41a" }}
          />
        </Flex>
      ),
      children: x.tasks.map((x: taskproject) => (
        <p key={x.id}>
          {x.name} {"  "} {x.projectName}
        </p>
      )),
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
        <Col span={23}>
          <p className="text-[16px] text-blue-500 font-medium">See all Tasks</p>
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
        <Collapse items={items} defaultActiveKey={["Todo", "Inprogress"]} />
      ) : (
        <Empty description="No tasks found" />
      )}
    </Flex>
  );
};

export default TaskPage;
