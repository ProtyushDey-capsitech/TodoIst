import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Card, Col, Grid, Row } from "antd";
import type { DashCardcount } from "../../apis/types";
import {
  ClockCircleOutlined,
  ContainerOutlined,
  DatabaseOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { GetCount } from "../../apis/DashBoardApi";

const TopSection = () => {
  const { data, 
    // isFetching 
  } = useQuery<DashCardcount>({
    queryKey: ["TaskCount"],
    queryFn: GetCount,
    placeholderData: keepPreviousData,
  });
    const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  return (
    <Row
      gutter={15}
      style={{
        marginInline: "auto",
        width: "100%",
        backgroundColor: "#F5F5F5",
        padding: "5px",
        paddingBlock: "10px",
        borderRadius: "15px",
      }}
    >
      <Col span={24} md={12} lg={6} style={{ padding: screens.lg ?"0px 7px 0px 7px":"7px 7px 7px 7px"}}>
        <Card
          style={{ width: "100%", minHeight: "60px", borderRadius: "15px" }}
          styles={{ body: { padding: "12px" } }}
          variant="borderless"
          hoverable
        >
          <div className="flex items-center justify-between">
            <div className="text-lg font-medium flex items-center gap-2">
              <div className="w-8 h-8 bg-[#E1EEFE] flex justify-center items-center rounded-full">
                <ContainerOutlined
                  style={{ fontSize: "15px", color: "#0A55E2" }}
                />
              </div>
              <p className="font-semibold text-lg">Total Project</p>
            </div>
            <h1 className="font-bold text-3xl">{data?.totalProject}</h1>
          </div>
        </Card>
      </Col>
      <Col span={24} md={12} lg={6} style={{ padding: screens.lg ?"0px 7px 0px 7px":"7px 7px 7px 7px"}}>
        <Card
          style={{ width: "100%", minHeight: "60px", borderRadius: "15px" }}
          styles={{ body: { padding: "12px" } }}
          variant="borderless"
          hoverable
        >
          <div className="flex items-center justify-between">
            <div className="text-lg font-medium flex items-center gap-2">
              <div className="w-8 h-8 bg-[#EAF7EF] flex justify-center items-center rounded-full">
                <DatabaseOutlined
                  style={{ fontSize: "20px", color: "#1D913A" }}
                />
              </div>
              <p className="font-semibold text-lg">Total Task</p>
            </div>
            <h1 className="font-bold text-3xl">{data?.totalTask}</h1>
          </div>
        </Card>
      </Col>
      <Col span={24} md={12} lg={6} style={{ padding: screens.lg ?"0px 7px 0px 7px":"7px 7px 7px 7px"}}>
        <Card
          style={{ width: "100%", minHeight: "60px", borderRadius: "15px" }}
          styles={{ body: { padding: "12px" } }}
          variant="borderless"
          hoverable
        >
          <div className="flex items-center justify-between">
            <div className="text-lg font-medium flex items-center gap-2">
              <div className="w-8 h-8 bg-[#FFF1D4] flex justify-center items-center rounded-full">
                <ClockCircleOutlined
                  style={{ fontSize: "20px", color: "#FE8B07" }}
                />
              </div>
              <p className="font-semibold text-lg">Inprogress</p>
            </div>
            <h1 className="font-bold text-3xl">{data?.inprogressTask}</h1>
          </div>
        </Card>
      </Col>
      <Col span={24} md={12} lg={6} style={{ padding: screens.lg ?"0px 7px 0px 7px":"7px 7px 7px 7px"}}>
        <Card
          style={{ width: "100%", minHeight: "60px", borderRadius: "15px" }}
          styles={{ body: { padding: "12px" } }}
          variant="borderless"
          hoverable
        >
          <div className="flex items-center justify-between">
            <div className="text-lg font-medium flex items-center gap-2">
              <div className="w-8 h-8 bg-[#f1d6d6] flex justify-center items-center rounded-full">
                <ExclamationCircleOutlined
                  style={{ fontSize: "20px", color: "#EC5048" }}
                />
              </div>
              <p className="font-semibold text-lg">Todo</p>
            </div>
            <h1 className="font-bold text-3xl">{data?.todoTask}</h1>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default TopSection;
