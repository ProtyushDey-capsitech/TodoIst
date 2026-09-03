import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  Badge,
  Card,
  Flex,
  Grid,
  List,
  Tag,
  Typography,
} from "antd";
import type { RecentTask } from "../../apis/types";
import { useNavigate } from "react-router";
import { GetRecentTask } from "../../apis/DashBoardApi";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

const TaskList = () => {
  const navigate = useNavigate();
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  const { data, isLoading } = useQuery<RecentTask[]>({
    queryKey: ["getRecentTask"],
    queryFn: GetRecentTask,
    placeholderData: keepPreviousData,
  });

  const getStatusIcon = (status: string) => {
    if (status === "Done") {
      return (
        <CheckCircleOutlined
          style={{ color: "#15B40C", fontSize: 18 }}
        />
      );
    }

    if (status === "Inprogress") {
      return (
        <ClockCircleOutlined
          style={{ color: "#FE8B07", fontSize: 18 }}
        />
      );
    }

    return (
      <ExclamationCircleOutlined
        style={{ color: "#f5222d", fontSize: 18 }}
      />
    );
  };

  const getPriorityColor = (priority: string) => {
    if (priority === "Low") return "success";
    if (priority === "High") return "error";
    return "processing";
  };

  return (
    <Card
      loading={isLoading}
      style={{
        height: 365,
        borderRadius: 16,
        background: "#f5f5f5",
      }}
      styles={{
        body: {
          padding: "10px",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Flex
        justify="space-between"
        align="center"
        style={{
          marginBottom: 8,
          gap: 10,
        }}
      >
        <Typography.Text strong style={{ fontSize: 18 }}>
          Recent Tasks
        </Typography.Text>

        <Typography.Text
          className="cursor-pointer"
          style={{
            color: "#006aff",
            fontSize: 14,
            whiteSpace: "nowrap",
          }}
          onClick={() => navigate("/Tasks")}
        >
          Show all tasks →
        </Typography.Text>
      </Flex>

      {data && data.length > 0 ? (
        <List<RecentTask>
          dataSource={data}
          rowKey="id"
          style={{
            flex: 1,
            overflow: "auto",
          }}
          renderItem={(item) => (
            <List.Item
              style={{
                padding: " 8px",
              }}
            >
              <Flex
                vertical
                style={{
                  width: "100%",
                  minWidth: 0,
                }}
              >
                <Flex
                  align="center"
                  justify="space-between"
                  gap={8}
                  style={{
                    width: "100%",
                    minWidth: 0,
                  }}
                >
                  <Flex
                    align="center"
                    gap={8}
                    style={{
                      minWidth: 0,
                      flex: 1,
                    }}
                  >
                    <Badge
                      count={getStatusIcon(item.status)}
                      style={{
                        background: "transparent",
                      }}
                    />

                    <Typography.Text
                      strong
                      ellipsis
                      style={{
                        minWidth: 0,
                        flex: 1,
                      }}
                    >
                      {item.name}
                    </Typography.Text>

                    <Tag
                      color={getPriorityColor(item.priority)}
                      variant="outlined"
                      style={{
                        margin: 0,
                        flexShrink: 0,
                      }}
                    >
                      {item.priority}
                    </Tag>
                  </Flex>

                  <Typography.Text
                    type="secondary"
                    style={{
                      flexShrink: 0,
                      fontSize: 13,
                    }}
                  >
                    {screens.xs
                      ? item.status === "Inprogress"
                        ? "Progress"
                        : item.status
                      : item.status}
                  </Typography.Text>
                </Flex>

                <Typography.Text
                  type="secondary"
                  ellipsis
                  style={{
                    marginLeft: 30,
                    fontSize: 13,
                  }}
                >
                  - {item.projectName}
                </Typography.Text>
              </Flex>
            </List.Item>
          )}
        />
      ) : (
        <Flex
          justify="center"
          align="center"
          style={{
            flex: 1,
          }}
        >
          <Typography.Text type="secondary">
            No recent tasks
          </Typography.Text>
        </Flex>
      )}
    </Card>
  );
};

export default TaskList;