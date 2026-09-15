import { Col, Grid, Row } from "antd";
import TopSection from "../Components/AdminDashBoard/TopSection";
import TaskOverView from "../Components/AdminDashBoard/TaskOverView";
import TaskPriority from "../Components/AdminDashBoard/TaskPriority";
import ProjectTaskStatus from "../Components/AdminDashBoard/ProjectTaskStatus";
import TaskList from "../Components/AdminDashBoard/TaskList";


const AdminDashBoard = () => {
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  return (
    <Row>
      <Col
        style={{
          padding: "0px 7px 0px 0px",
        }}
        // style={{backgroundColor:"red"}}
        span={16}
      >
        <Col
          span={24}
          style={{
            padding: "0px 0px 7px 0px",
          }}
        >
          <TopSection />
        </Col>
        <Row>
          <Col
            span={12}
            // md={12}
            // xxl={12}
            style={{
              padding: screens.xxl
                ? "7px 7px 7px 0"
                : screens.md
                  ? "0px 7px 7px 0"
                  : "0px 0px 7px 0px",
            }}
          >
            <TaskOverView />
          </Col>

          <Col
            span={12}
            // md={12}
            // xxl={8}
            style={{
              padding: screens.xxl
                ? "7px 0px 0px 7px"
                : screens.md
                  ? "0px 7px 7px 0"
                  : "0px 0px 7px 0px",
            }}
          >
            <TaskPriority />
          </Col>
        </Row>
        <Col
          style={{
            padding: screens.xxl ? "7px 0px 0px 0px" : "7px 0 7px 0",
          }}
        >
          <ProjectTaskStatus />
        </Col>
      </Col>
      <Col
        span={8}
        style={{
          padding: "0px 7px 0px 7px",
        }}
      >
        <TaskList />
      </Col>
    </Row>
  );
};

export default AdminDashBoard;
