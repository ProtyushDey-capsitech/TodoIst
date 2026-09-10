import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  Col,
  Empty,
  Flex,
  Row,
  Spin,
} from "antd";
import type { getalltask} from "../apis/types";
import { lazy, Suspense, useState } from "react";
import { FIlterSection } from "../Components/TaskPage/FIlterSection";
// import ListTask from "../Components/TaskPage/ListTask";
import { GetAllTask } from "../apis/TaskApi";
const ListTask = lazy(() => import("../Components/TaskPage/ListTask"));
const TaskPage = () => {
  const [search, setSearch] = useState<string>("");
  const [searchproject, setSearcProject] = useState<string[]>([]);

  const { data, isLoading } = useQuery<getalltask[]>({
    queryKey: ["getTasks", search, searchproject],
    queryFn: () => GetAllTask(search, searchproject),
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
        <Suspense
				fallback={<div>Component2 are loading please wait...</div>}
			>
        <ListTask data={data} isLoading={isLoading} />
			</Suspense>
      ) : (
        <Empty description="No tasks found" />
      )}
    </Flex>
  );
};

export default TaskPage;
