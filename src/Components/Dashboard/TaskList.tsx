import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Badge, Card, Flex, Listy, Tag, Typography } from "antd";
import type { RecentTask } from "../../apis/types";
import { useNavigate } from "react-router";
import { GetRecentTask } from "../../apis/DashBoardApi";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  SyncOutlined,
} from "@ant-design/icons";

const TaskList = () => {
  const navigate = useNavigate();

  const { data, isLoading } = useQuery<RecentTask[]>({
    queryKey: ["getRecentTask"],
    queryFn: () => GetRecentTask(),
    placeholderData: keepPreviousData,
  });

  const presets = [
    { status: "success"},
    { status: "processing"},
    { status: "error"},
  ];

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
      <Flex
        justify="space-between"
        align="center"
        style={{
          marginBottom: 12,
        }}
      >
        <div className="text-lg font-semibold text-[#0f172a]">Recent Tasks</div>

        <div
          className="text-sm font-medium cursor-pointer text-[#006aff]"
          onClick={() => navigate("/Tasks")}
        >
          Show all tasks →
        </div>
      </Flex>
      {data && data.length > 0 ? (
        <Listy<RecentTask>
          items={data}
          rowKey="id"
          styles={{ item: { padding: "0" } }}
          height={400}
          itemRender={(item) => (
            <Flex
              gap="medium"
              align="flex-start"
              style={{ paddingInline: "5" }}
            >
              <Flex vertical flex="auto" style={{ minWidth: 0 }}>
                <Flex
                  justify="space-between"
                  gap="small"
                  style={{ height: "35px" }}
                >
                  <div className="flex items-center justify-center gap-2">
                    {item.status == "Done" ? (
                      <Badge
                        count={
                          <CheckCircleOutlined
                            style={{ color: "#15B40C", fontSize: "18px" }}
                          />
                        }
                      />
                    ) : item.status == "Inprogress" ? (
                      <Badge
                        count={
                          <ClockCircleOutlined
                            style={{ color: "#FE8B07", fontSize: "18px" }}
                          />
                        }
                      />
                    ) : (
                      <Badge
                        count={
                          <ExclamationCircleOutlined
                            style={{ color: "#f5222d", fontSize: "18px" }}
                          />
                        }
                      />
                    )}
                    <Typography.Title style={{ margin: "0" }} level={4}>
                      {item.name}
                    </Typography.Title>
                    <Tag key={presets[item.priority=="Low"?0:item.priority=="High"?2:1].status} color={presets[item.priority=="Low"?0:item.priority=="High"?2:1].status}variant={"outlined"}>{item.priority}</Tag>
                  </div>
                  <Typography.Text type="secondary">
                    {item.status}
                  </Typography.Text>
                </Flex>
                <Typography.Text type="secondary" ellipsis>
                  -{item.projectName}
                </Typography.Text>
              </Flex>
            </Flex>
          )}
        />
      ) : null}
    </Card>
  );
};

export default TaskList;
