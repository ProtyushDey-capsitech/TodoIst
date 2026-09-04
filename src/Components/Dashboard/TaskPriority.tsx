import ReactECharts from "echarts-for-react";
import { Card } from "antd";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { PriorityCount } from "../../apis/types";
import { GetCountPriority } from "../../apis/DashBoardApi";

const TaskPriority = () => {
  const { data, 
    // isFetching 
  } = useQuery<PriorityCount[]>({
    queryKey: ["PriorityCount"],
    queryFn: GetCountPriority,
    placeholderData: keepPreviousData,
  });

  const priority = data?.map((e: PriorityCount) => e.priority) ?? [];

  const count: number[] = data?.map((e: PriorityCount) => e.count) ?? [];

  const option = {
    tooltip: {
      trigger: "axis",
    },

    grid: {
      left: 20,
      right: 25,
      top: 10,
      bottom: 10,
      containLabel: true,
    },

    yAxis: {
      type: "value",
      minInterval: 1,
      axisLabel: {
        color: "#64748b",
      },
      axisLine: {
        show: false,
      },
      splitLine: {
        lineStyle: {
          color: "#e2e8f0",
        },
      },
    },

    xAxis: {
      type: "category",
      data: priority,
      axisLabel: {
        color: "#334155",
        fontSize: 13,
        fontWeight: 500,
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
    },

    series: [
      {
        type: "bar",
        data: count,
        barWidth: 18,
        barCategoryGap: "40%",

        itemStyle: {
          borderRadius: [8, 8, 0, 0],
          color: (params: any) => {
            const priorityColors: Record<string, string> = {
              Low: "#22c55e",
              Medium: "#3b82f6",
              High: "#ef4444",
            };

            return priorityColors[params.name] ?? "#94a3b8";
          },
        },

        label: {
          show: true,
          position: "right",
          color: "#334155",
          fontWeight: 600,
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
      styles={{ body: { padding: "20px 22px", height: "100%" } }}
    >
      <div className="flex flex-col sm:flex-row sm:gap-3 sm:items-end w-full">
        <p className="text-lg font-semibold text-[#0f172a]">
          Tasks By Priority
        </p>
        <p className="text-sm mt-1 text-[#94a3b8]">Current task priorities</p>
      </div>
      <ReactECharts
        option={option}
        notMerge={true}
        lazyUpdate={true}
        style={{ height: 220, width: "100%" }}
      />
    </Card>
  );
};
export default TaskPriority;
