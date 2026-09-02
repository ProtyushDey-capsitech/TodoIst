import { Col, Flex, Row } from "antd";
import TopSection from "../Components/Dashboard/TopSection";
import TaskOverView from "../Components/Dashboard/TaskOverView";
import TaskPriority from "../Components/Dashboard/TaskPriority";
import ProjectTaskStatus from "../Components/Dashboard/ProjectTaskStatus";
import ProjectList from "../Components/Dashboard/ProjectList";
import TaskList from "../Components/Dashboard/TaskList";

const DashBoard = () => {
  return (
    <Flex gap={"medium"}  vertical>
      <TopSection/>

      <Row
        gutter={15}
        style={{
          marginInline: "auto",
          width: "100%",
          border: "none",
        }}
      >
        <Col span={8} style={{ paddingLeft: "0px" }}>
          <TaskOverView />
        </Col>

        <Col span={6}>
          <TaskPriority />
        </Col>
        <Col span={10} style={{ paddingRight: "0px" }}>
          <ProjectTaskStatus />
        </Col>
      </Row>
      <Row
        gutter={15}
        style={{
          marginInline: "auto",
          width: "100%",
          border: "none",
        }}
      >
        <Col span={12} style={{ paddingLeft: "0px" }}>
          <ProjectList />
        </Col>
        <Col span={12} style={{ paddingRight: "0px" }}>
          <TaskList />
        </Col>
      </Row>
    </Flex>
  );
};

export default DashBoard;
