import { Badge, Collapse, Flex, Table, Tag, type CollapseProps, type TableColumnsType } from 'antd';
import type { getalltask, taskproject } from '../../apis/types';

const ListTask = ({ data, isLoading }: { data: getalltask[]; isLoading: boolean }) => {
      const columns: TableColumnsType<taskproject> = [
    {
      title: "Task",
      dataIndex: "name",
      key: "name",
      width: 180,
      ellipsis: true,
    },
    {
      title: "Description",
      dataIndex: "desc",
      key: "desc",
      width: 300,
      ellipsis: true,
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      width: 130,
      render: (priority) => (
        <Tag
          color={
            priority === "HIGH"
              ? "red"
              : priority === "MEDIUM"
                ? "orange"
                : "green"
          }
        >
          {priority}
        </Tag>
      ),
    },
    {
      title: "Project",
      dataIndex: "projectName",
      key: "projectName",
      width: 180,
      ellipsis: true,
    },
  ];

  const items: CollapseProps["items"] = data?.map((x: getalltask) => {
    return {
      key: x.status,
      label: (
        <Flex gap={10} align="center">
          <p className="font-medium">{x.status}</p>
          <Badge count={x.count} style={{ backgroundColor: "#52c41a" }} />
        </Flex>
      ),
      children: (
        <Table<taskproject>
          columns={columns}
          loading={isLoading}
          style={{
            width: "100%",
          }}
          scroll={{ x: "max-content" }}
          size="middle"
          dataSource={x.tasks}
          rowKey={(record) => record.id}
          pagination={false}
        />
      ),
    };
  });
  return (
    <Collapse
          items={items}
          defaultActiveKey={["Todo", "Inprogress"]}
          styles={{ body: { padding: 0 } }}
        />
  )
}

export default ListTask