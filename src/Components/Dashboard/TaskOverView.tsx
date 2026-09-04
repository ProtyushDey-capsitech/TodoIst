import ReactECharts from "echarts-for-react";
import { Card } from "antd";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { StatusCount } from "../../apis/types";
import { GetCountStatus } from "../../apis/DashBoardApi";
const TaskOverView = () => {
  const { data, isFetching } = useQuery<StatusCount[]>({
    queryKey: ["StatusCount"],
    queryFn: GetCountStatus,
    placeholderData: keepPreviousData,
  });

  const countData: { name: string; value: number }[] =
    data?.map((e: StatusCount) => ({
      name: e.status,
      value: e.count,
    })) ?? [];
  const totalTasks = data?.reduce((sum, item) => sum + item.count, 0);

  const option = {
    tooltip: { trigger: "item", formatter: "{b}: {c} ({d}%)" },
    series: [
      {
        name: "Tasks",
        type: "pie",
        radius: ["58%", "78%"],
        center: ["50%", "45%"],
        avoidLabelOverlap: true,
        itemStyle: { borderRadius: 6, borderColor: "#fff", borderWidth: 3 },
        labelLine: { show: false },

        data: countData,
      },
    ],
    graphic: [
      {
        type: "text",
        left: "center",
        top: "36%",
        style: {
          text: `${totalTasks}`,
          textAlign: "center",
          fill: "#1e293b",
          fontSize: 24,
          fontWeight: 700,
        },
      },
      {
        type: "text",
        left: "center",
        top: "48%",
        style: {
          text: "Total Tasks",
          textAlign: "center",
          fill: "#94a3b8",
          fontSize: 11,
        },
      },
    ],
  };
  return (
    <Card
      style={{
        height: 300,
        borderRadius: 16,
        background: "#f5f5f5",
      }}
      styles={{
        body: {
          padding: "20px 22px",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "column",
        },
      }}
    >
      <div className="flex flex-col sm:flex-row sm:gap-3 sm:items-end w-full">
        <p className="text-lg font-semibold text-[#0f172a]">Task Overview</p>
        <p className="text-sm mt-1 text-[#94a3b8]">Current task distribution</p>
      </div>
      <ReactECharts
        option={option}
        notMerge={true}
        lazyUpdate={true}
        showLoading={isFetching}
        style={{ height: 200, width: "100%" }}
      />
    </Card>
  );
};
export default TaskOverView;
