import { LockOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Tag, Typography } from "antd";
import { useNavigate } from "react-router";
import { LogoutUser} from "../apis/AuthApi";
import type { UserData } from "../apis/types";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

interface UserComponentProps {
  cangepassword: () => void;
}

const UserComponent = ({ cangepassword }: UserComponentProps) => {
  const navigate = useNavigate();
  const data: UserData = useSelector((state: RootState) => state.user);
console.log(data,"user")
  return (
    <div className="w-75 flex flex-col justify-center items-center gap-5">
      <div className="w-40 flex flex-col items-center justify-center gap-3">
        <Avatar shape="circle" size={72} icon={<UserOutlined />} />
        <Typography.Title level={4}>{data?.name}</Typography.Title>
        <Tag color={"blue"} variant={"outlined"}>
          {data?.email}
        </Tag>
      </div >
      <div className="w-full flex justify-center items-center gap-5">
      <Button
        icon={<LockOutlined />}
        color="primary"
        variant="outlined"
        onClick={() => {
          cangepassword();
        }}
      >
        Change password
      </Button>
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
      </Button></div>
    </div>
  );
};

export default UserComponent;
