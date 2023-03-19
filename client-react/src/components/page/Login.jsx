import {useState, useEffect} from "react";
import {useNavigate, Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {
    Button,
    FormControl,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField
} from "@mui/material";
import {useFormik} from "formik";
import * as Yup from "yup";
import WrapLogin from "../layout/wrapLogin";
import {handleLogin} from "../../services/authService";
import {setError} from "../../redux/authSlice";

export default function Login() {
    const err = useSelector((state) => state.auth.user?.error)
    const [showPass, setShowPass] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const dataForm = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().required("không được để trống"),
            password: Yup.string().required("không được để trống")
        }),

        onSubmit: (values) => {
            handleLogin(values, dispatch, navigate)
            dataForm.resetForm();
        }
    });

    const handleShowPass = () => {
        setShowPass(!showPass)
    }

    return (
            <WrapLogin>
                <div className="bg-[rgba(255,253,253,0.87)] flex flex-col gap-2 p-4 pt-10 drop-shadow-md rounded-sm">
                    {/*<img src={logo} alt="logo" className="mx-auto mb-2 h-10 w-52" />*/}
                    <p className="mx-auto text-slate-400 font-bold text-lg max-w-xs text-center	">
                        Đăng nhập
                    </p>
                    {/*<div className="bg-white border flex flex-col gap-2 p-4 pt-10 drop-shadow-md">*/}
                    {/*  <LazyLoadImage*/}
                    {/*    draggable="false"*/}
                    {/*    className="mx-auto h-30 w-36 object-contain"*/}
                    {/*    src={logo}*/}
                    {/*    alt="logo"*/}
                    {/*  />*/}

                    <form
                        onSubmit={dataForm.handleSubmit}
                        className="flex flex-col justify-center items-center gap-3 m-3 md:m-8"
                    >
                        {err ? (
                            <FormHelperText style={{color: "#d32f2f", textAlign: "center"}}>
                                {err}
                            </FormHelperText>
                        ) : null}

                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            value={dataForm.values.email}
                            onChange={dataForm.handleChange}
                            error={dataForm.errors.email && dataForm.touched.email}
                            helperText={
                                dataForm.errors.email && dataForm.touched.email
                                    ? dataForm.errors.email
                                    : null
                            }
                            size="small"
                        />

                        <FormControl
                            fullWidth
                            size="small"
                            variant="outlined"
                        >
                            {dataForm.errors.password && dataForm.touched.password ? (
                                <InputLabel htmlFor="outlined-adornment-password" style={{color: "red"}}>
                                    Password
                                </InputLabel>
                            ) : (
                                <InputLabel htmlFor="outlined-adornment-password">
                                    Password
                                </InputLabel>
                            )}

                            <OutlinedInput
                                label="password"
                                error={dataForm.errors.password && dataForm.touched.password}
                                value={dataForm.values.password}
                                onChange={dataForm.handleChange}
                                name="password"
                                autoComplete="on"
                                id="outlined-adornment-password"
                                type={showPass ? "text" : "password"}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleShowPass}
                                            // onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPass ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                            {dataForm.errors.password && dataForm.touched.password ? (
                                <FormHelperText style={{color: "#d32f2f"}}>
                                    {dataForm.errors.password}
                                </FormHelperText>
                            ) : null}
                        </FormControl>
                        <Button
                            variant="contained"
                            type="submit"
                            className="font-medium py-2 rounded w-full"
                            onClick={() => dispatch(setError(null))}
                        >
                            Đăng Nhập
                        </Button>
                        {/*<div className="flex">*/}
                        {/*    <span className="my-3 text-gray-500"></span>*/}
                        {/*</div>*/}
                        <Link
                            // to="/password/forgot"
                            className="text-sm font-medium  text-blue-800"
                        >
                            Quên mật khẩu?
                        </Link>
                    </form>
                </div>
                <div className="bg-[rgba(255,253,253,0.87)] border p-5 text-center drop-shadow-md rounded-sm">
                    Bạn chưa có tài khoản?{" "}
                    <Link to="/register" className="text-sm font-medium  text-blue-800"
                          onClick={() => dispatch(setError(null))}>
                        <p>Đăng Ký</p>
                    </Link>
                </div>
            </WrapLogin>
    )
}