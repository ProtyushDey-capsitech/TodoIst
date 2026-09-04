import { Col, Flex, Grid, Row } from "antd";
import TopSection from "../Components/Dashboard/TopSection";
import TaskOverView from "../Components/Dashboard/TaskOverView";
import TaskPriority from "../Components/Dashboard/TaskPriority";
import ProjectTaskStatus from "../Components/Dashboard/ProjectTaskStatus";
import ProjectList from "../Components/Dashboard/ProjectList";
import TaskList from "../Components/Dashboard/TaskList";

const DashBoard = () => {
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  return (
    <Flex gap={"medium"} vertical>
      <TopSection/>

      <Row
        gutter={15}
        style={{
          marginInline: "auto",
          width: "100%",
          border: "none",
        }}
      >
        <Col
          span={24}
          md={12}
          xxl={6}
          style={{
            padding: screens.xxl ? "0 7px 0px 0" : screens.md  ? "0px 7px 7px 0": "0px 0px 7px 0px",
          }}
        >
          <TaskOverView />
        </Col>

        <Col
          span={24}
          md={12}
          xxl={8}
          style={{
            padding: screens.xxl ? "0px 7px" : screens.md  ? "0px 0px 7px 7px": "7px 0 7px 0px",
          }}
        >
          <TaskPriority />
        </Col>

        <Col
          span={24}
          xxl={10}
          style={{
            padding: screens.xxl ? "0px 0px 0px 7px" : "7px 0 7px 0",
          }}
        >
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
        <Col span={24} lg={12} style={{ padding: screens.lg ?"0px 7px 0px 0px ":"0px 0px 7px 0px "}}>
          <ProjectList />
        </Col>
        <Col span={24} lg={12} style={{  padding: screens.lg ?"0px 0px 0px 7px ":"7px 0px 0px 0px "}}>
          <TaskList />
        </Col>
      </Row>
    </Flex>
  );
};

export default DashBoard;
