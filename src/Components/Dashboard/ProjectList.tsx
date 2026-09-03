import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Card, Col, Flex, Grid, List, Listy, Row, Typography } from "antd";
import type { Pagination, Project } from "../../apis/types";
import { GetAllProject } from "../../apis/ProjectApi";
import { useNavigate } from "react-router";

const ProjectList = () => {
  const navigate = useNavigate();
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  const { data, isLoading } = useQuery<Pagination<Project>>({
    queryKey: ["getRecentProjects"],
    queryFn: () => GetAllProject(1, 5),
    placeholderData: keepPreviousData,
  });

  return (
    <Card
      style={{
        height: 365,
        borderRadius: 16,
        background: "#f5f5f5",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        // alignItems:"center"
      }}
      styles={{
        body: {
          padding: "10px",
          height: "100%",
        },
      }}
    >
      {/* Header */}
      <Flex
        justify="space-between"
        align="center"
        // style={{
        //   marginBottom: 12,
        // }}
      >
        <p className="text-lg font-semibold text-[#0f172a]">
          Recent Projects
        </p>

        <p
          className="text-sm font-medium cursor-pointer text-[#006aff]"
          onClick={() => navigate("/Projects")}
        >
          Show all projects →
        </p>
      </Flex>
      {data && data.results && data.results.length > 0 ? (
        <Listy<Project>
          items={data.results}
          styles={{
            item: {
              padding:  "12px",
            }
          }}
          rowKey="id"
          height={screens.xs ? 300 : 400}
          itemRender={(item) => (
            <Flex gap="small" align="flex-start">
              <Flex vertical flex="auto" style={{ minWidth: 0 }}>
                <Row>
                  <Col span={14} lg={16}>
                    <Typography.Title level={screens.xs ? 5 : 4}>
                      {item.name}
                    </Typography.Title>
                  </Col>
                  <Col span={2}>
                    <Typography.Text type="secondary">
                      {item.taskCount}
                    </Typography.Text>
                  </Col>
                  <Col span={8} lg={6}>
                    <Typography.Text type="secondary">
                      {item.status ? "Complete" : "In progress"}
                    </Typography.Text>
                  </Col>
                </Row>
              </Flex>
            </Flex>
          )}
        />
      ) : null}
    </Card>
  );
};

export default ProjectList;
