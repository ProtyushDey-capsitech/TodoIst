import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Card, Col, Flex, List, Listy, Row, Typography } from "antd";
import type { Pagination, Project } from "../../apis/types";
import { GetAllProject } from "../../apis/ProjectApi";
import { useNavigate } from "react-router";

const ProjectList = () => {
  const navigate = useNavigate();

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
      }}
      styles={{
        body: {
          padding: "20px 22px",
          height: "100%",
        },
      }}
    >
      {/* Header */}
      <Flex
        justify="space-between"
        align="center"
        style={{
          marginBottom: 12,
        }}
      >
        <div className="text-lg font-semibold text-[#0f172a]">
          Recent Projects
        </div>

        <div
          className="text-sm font-medium cursor-pointer text-[#006aff]"
          onClick={() => navigate("/Projects")}
        >
          Show all projects →
        </div>
      </Flex>
      {data && data.results && data.results.length > 0 ? (
        <Listy<Project>
          items={data.results}
          rowKey="id"
          height={400}
          itemRender={(item) => (
            <Flex gap="small" align="flex-start">
              <Flex vertical flex="auto" style={{ minWidth: 0 }}>
                <Row>
                  <Col span={18}>
                    <Typography.Title level={4}>{item.name}</Typography.Title>
                  </Col>
                  <Col span={2}>
                    <Typography.Text type="secondary">
                      {item.taskCount}
                    </Typography.Text>
                  </Col>
                  <Col span={4}>
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
