import { ReloadOutlined } from "@ant-design/icons";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Button, Col, Input, Select } from "antd";
import { useEffect, type Dispatch, type SetStateAction } from "react";
import { GetAllProjectName } from "../../apis/ProjectApi";
import type { ProjectDataName } from "../../apis/types";

interface props {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  searchproject: string[];
  setSearchProject: Dispatch<SetStateAction<string[]>>;
}

export const FIlterSection = ({
  search,
  setSearch,
  searchproject,
  setSearchProject,
}: props) => {
  const ClearSearch = () => {
    setSearch("");
    setSearchProject(data?.map((x) => x.id) || []);
  };

  const { data } = useQuery<ProjectDataName[]>({
    queryKey: ["getProjectName"],
    queryFn: () => GetAllProjectName(),
    placeholderData: keepPreviousData,
  });

  useEffect(() => setSearchProject(data?.map((x) => x.id) || []), [data]);
  return (
    <>
      <Col xs={24} sm={14}>
        <Input
          placeholder="Search the task"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Col>
      <Col xs={20} sm={9}>
        <Select
          value={searchproject}
          mode="multiple"
          allowClear
          showSearch
          optionFilterProp="label"
          style={{ width: "100%" }}
          onChange={(e) => setSearchProject(e)}
          maxTagCount={1}
          maxTagPlaceholder={(omittedValues) => `+${omittedValues.length}`}
          options={data?.map((x: ProjectDataName) => {
            return {
              value: x.id,
              label: x.name,
            };
          })}
        />
      </Col>
      <Col xs={4} sm={1}>
        <Button
          icon={<ReloadOutlined />}
          shape="circle"
          onClick={ClearSearch}
        />
      </Col>
    </>
  );
};
