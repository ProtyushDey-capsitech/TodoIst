import ReactECharts from "echarts-for-react";
import { Card } from "antd";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { ProjectStatusCount } from "../../apis/types";
import { GetProjectTaskCount } from "../../apis/DashBoardApi";

const ProjectTaskStatus = () => {
  const { data, isFetching } = useQuery<ProjectStatusCount[]>({
    queryKey: ["ProjectStatusCount"],
    queryFn: GetProjectTaskCount,
    placeholderData: keepPreviousData,
  });

  const projects = data?.map((project) => project.name) ?? [];

  const todoCount =
    data?.map(
      (project) => project.count?.find((x) => x.status === "Todo")?.count ?? 0,
    ) ?? [];

  const inprogressCount =
    data?.map(
      (project) =>
        project.count?.find((x) => x.status === "Inprogress")?.count ?? 0,
    ) ?? [];

  const doneCount =
    data?.map(
      (project) => project.count?.find((x) => x.status === "Done")?.count ?? 0,
    ) ?? [];

  const option = {
    tooltip: {
      trigger: "axis",
    },

    legend: {
      top: 0,
      right: 0,
      data: ["Todo", "Inprogress", "Done"],
    },

    grid: {
      left: 45,
      right: 20,
      top: 45,
      bottom: 50,
      containLabel: true,
    },

    xAxis: {
      type: "category",
      data: projects.map((e)=> e.length>7?`${e.slice(0,5)}...`:e),
      axisLabel: {
        interval: 0,
        rotate:45,
        color: "#64748b",
      },
      axisLine: {
        lineStyle: {
          color: "#e2e8f0",
        },
      },
    },

    yAxis: {
      type: "value",
      minInterval: 1,
      axisLabel: {
        color: "#64748b",
        
      },
      splitLine: {
        lineStyle: {
          color: "#e2e8f0",
        },
      },
    },

    series: [
      {
        name: "Todo",
        type: "bar",
        data: todoCount,
        barMaxWidth: 25,
        itemStyle: {
          color: "#f59e0b",
          borderRadius: [4, 4, 0, 0],
        },
      },
      {
        name: "Inprogress",
        type: "bar",
        data: inprogressCount,
        barMaxWidth: 25,
        itemStyle: {
          color: "#3b82f6",
          borderRadius: [4, 4, 0, 0],
        },
      },
      {
        name: "Done",
        type: "bar",
        data: doneCount,
        barMaxWidth: 25,
        itemStyle: {
          color: "#22c55e",
          borderRadius: [4, 4, 0, 0],
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
        },
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 5,
        }}
      >
        <div className="flex flex-col sm:flex-row sm:gap-3 sm:items-end w-full">
        <p className="text-lg font-semibold text-[#0f172a]">
            Tasks By Project
          </p>

          <p className="text-sm mt-1 text-[#94a3b8]">Current task status</p>
        </div>
      </div>

      <ReactECharts
        option={option}
        notMerge={true}
        lazyUpdate={true}
        showLoading={isFetching}
        style={{
          height: 250,
          width: "100%",
        }}
      />
    </Card>
  );
};

export default ProjectTaskStatus;
