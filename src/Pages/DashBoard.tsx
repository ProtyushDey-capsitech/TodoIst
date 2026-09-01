import { Col, Flex, Row } from "antd";
import React from "react";
import TopSection from "../Components/Dashboard/TopSection";
import TaskOverView from "../Components/Dashboard/TaskOverView";

const DashBoard = () => {
  return (
    <Flex gap={"medium"} vertical >
      <TopSection />
      <Row
        gutter={15}
        style={{
          marginInline: "auto",
          width: "100%",
          border:"none"
        }}
      >
        <Col span={8} style={{ paddingLeft: "0px" }}>
          <TaskOverView />
        </Col>

        <Col span={16} style={{ paddingRight: "0px" }}>
          <div
            style={{
              background: "#F5F5F5",
              borderRadius: "15px",
              padding: "16px",
              height: "100%",
            }}
          >
            {/* <TaskOverView /> */}
          </div>
        </Col>
      </Row>
      <Row gutter={10}>
        <Col
          span={10}
          style={{ backgroundColor: "#F5F5F5", borderRadius: "15px" }}
        >
          {/* <TaskOverView /> */}
        </Col>
        <Col
          span={10}
          style={{ backgroundColor: "#F5F5F5", borderRadius: "15px" }}
        >
          {/* <TaskOverView /> */}
        </Col>
      </Row>
    </Flex>
  );
};

export default DashBoard;
