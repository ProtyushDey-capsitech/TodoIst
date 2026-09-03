import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Tag, Typography } from "antd";
import { useNavigate } from "react-router";
import { LogoutUser} from "../apis/AuthApi";
import type { UserData } from "../apis/types";



const UserComponent = (data:{ data: NoInfer<UserData> | undefined; }) => {
  const navigate = useNavigate();
console.log(data,"user")
  return (
    <div className="w-75 flex flex-col justify-center items-center gap-5">
      <div className="w-[70] flex flex-col items-center justify-center gap-3">
        <Avatar shape="circle" size={72} icon={<UserOutlined />} />
        <Typography.Title level={4}>{data.data?.name}</Typography.Title>
        <Tag color={"blue"} variant={"outlined"}>
          {data.data?.email}
        </Tag>
      </div>
      <Button
        icon={<LogoutOutlined />}
        color="danger"
        variant="outlined"
        onClick={() => {
          navigate("/login");
          LogoutUser();
        }}
      >
        Logout
      </Button>
    </div>
  );
};

export default UserComponent;
