import { Button, Input, Label, makeStyles } from "@fluentui/react-components";
import { Login } from "../apis/AuthApi";
import { useNavigate } from "react-router";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import type { LoginPayload } from "../apis/types";

const useStyle = makeStyles({
  card: {
    backgroundColor: "#e1dfdd",
    minWidth: "300px",
    maxWidth: "500px",
    height: "500px",
    marginInline: "auto",
    marginTop: "100px",
    borderRadius: "15px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "20px",
    alignItems: "center",
    padding: "20px",
  },
  Title: {
    fontWeight: "600",
    fontSize: "32px",
  },
  Form: {
    display: "flex",
    flexDirection: "column",
    width: "80%",
    gap: "20px",
  },
  Input: {
    width: "100%",
    padding: "8px 12px",
  },
  Button: {
    width: "100%",
    padding: "8px 12px",
    color: "#fff",
    backgroundColor: "#0078d4",
    ":hover": {
      backgroundColor: "#005a9e",
    },
  },
});

const LoginPage = () => {
  const styles = useStyle();
  const navigate = useNavigate()



 const formik = useFormik({
    initialValues:{
      userName:"",
      password:""
    },
    onSubmit:(values ,{ resetForm })=> {
      loginmutation.mutate(values)
      resetForm()
    }
  })
  
  const loginmutation = useMutation({
    mutationFn:(values:LoginPayload)=>Login(values),
    onSuccess:(_data)=>{
      navigate("/")
    }
  })

  return (
    <div className={styles.card}>
      <h1 className={styles.Title}>Login Page</h1>
      <form className={styles.Form} onSubmit={formik.handleSubmit}>
        <Label htmlFor="Email">Email</Label>
        <Input
          id="Email"
          type="email"
          name="userName"
          onChange={formik.handleChange}
          placeholder="Enter the mail"
          required
          value={formik.values.userName}
          className={styles.Input}
        />
        <Label htmlFor="Password">Password</Label>
        <Input
          type="password"
          name="password"
          required
          onChange={formik.handleChange}
          placeholder="Enter the task"
          value={formik.values.password}
          className={styles.Input}
        />

        <Button className={styles.Button} type="submit">
          Login
        </Button>
      </form>
    </div>
  );
};

export default LoginPage;
