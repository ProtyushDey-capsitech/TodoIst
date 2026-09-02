import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Card, Col, Row } from "antd";
import type { DashCardcount } from "../../apis/types";
import {
  ClockCircleOutlined,
  ContainerOutlined,
  DatabaseOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { GetCount } from "../../apis/DashBoardApi";

const TopSection = () => {
  const { data, isFetching } = useQuery<DashCardcount>({
    queryKey: ["TaskCount"],
    queryFn: GetCount,
    placeholderData: keepPreviousData,
  });
  return (
    <Row
      gutter={15}
      style={{
        marginInline: "auto",
        width: "100%",
        backgroundColor: "#F5F5F5",
        padding: "10px",
        paddingBlock: "15px",
        borderRadius: "15px",
      }}
    >
      <Col span={6}>
        <Card
          style={{ width: "100%", minHeight: "120px", borderRadius: "15px"}}
          variant="borderless"
          hoverable
        >
          <div className="flex items-start justify-between">
            <div className="text-lg font-medium">
              <p>Total Task</p>
              <h1 className="font-bold text-4xl">{data?.totalTask}</h1>
            </div>
            <div className="w-10 h-10 bg-[#EAF7EF] flex justify-center items-center rounded-full">
              <DatabaseOutlined
                style={{ fontSize: "20px", color: "#1D913A" }}
              />
            </div>
          </div>
        </Card>
      </Col>
      <Col span={6}>
        <Card
          style={{ width: "100%", minHeight: "120px", borderRadius: "15px" }}
          variant="borderless"
          hoverable
        >
          <div className="flex items-start justify-between">
            <div className="text-lg font-medium">
              <p>Total Project</p>
              <h1 className="font-bold text-4xl">{data?.totalProject}</h1>
            </div>
            <div className="w-10 h-10 bg-[#E1EEFE] flex justify-center items-center rounded-full">
              <ContainerOutlined
                style={{ fontSize: "20px", color: "#0A55E2" }}
              />
            </div>
          </div>
        </Card>
      </Col>
      <Col span={6}>
        <Card
          style={{ width: "100%", minHeight: "120px", borderRadius: "15px" }}
          variant="borderless"
          hoverable
        >
          <div className="flex items-start justify-between">
            <div className="text-lg font-medium">
              <p>Inprogress Task</p>
              <h1 className="font-bold text-4xl">{data?.inprogressTask}</h1>
            </div>
            <div className="w-10 h-10 bg-[#FFF1D4] flex justify-center items-center rounded-full">
              <ClockCircleOutlined
                style={{ fontSize: "25px", color: "#FE8B07" }}
              />
            </div>
          </div>
        </Card>
      </Col>
      <Col span={6}>
        <Card
          style={{ width: "100%", minHeight: "120px",borderRadius: "15px" }}
          variant="borderless"
          hoverable
        >
          <div className="flex items-start justify-between">
            <div className="text-lg font-medium">
              <p>Todo Task</p>
              <h1 className="font-bold text-4xl">{data?.todoTask}</h1>
            </div>
            <div className="w-10 h-10 bg-[#f1d6d6] flex justify-center items-center rounded-full">
              <ExclamationCircleOutlined
                style={{ fontSize: "25px", color: "#EC5048" }}
              />
            </div>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default TopSection;
