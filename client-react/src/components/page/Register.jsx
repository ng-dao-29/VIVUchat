import WrapLogin from "../layout/wrapLogin";
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
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {Link, useNavigate} from "react-router-dom";
import {useFormik} from "formik";
import * as Yup from "yup";
import {register} from "../../services/authService";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setError} from "../../redux/authSlice";
export default function Register() {
    const {error} = useSelector((state) => state.auth.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [showPass, setShowPass] = useState(false);
    const [showPass2, setShowPass2] = useState(false);

    const dataForm = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        },
        validationSchema: Yup.object({
            name: Yup.string().required("không được để trống!"),
            email: Yup.string().required("không được để trống!")
                .email("Vui lòng nhập đúng định dạng Email"),
            password: Yup.string()
                .required("không được để trống")
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#@$!%*?&])[A-Za-z\d@$!%*?&]{8,25}$/,
                    "Tối thiểu 8 và tối đa 25 ký tự, ít nhất một chữ hoa, một chữ thường, một số và một ký tự đặc biệt"
                ),
            confirmPassword: Yup.string()
                .required("không được để trống")
                .oneOf([Yup.ref('password')], 'xác nhận mật khẩu không khớp!'),
        }),

        onSubmit: (values) => {
            register(values ,dispatch, navigate)
            dataForm.resetForm()
        }
    });

    const handleShowPass = () => {
        setShowPass(!showPass)
    }

    const handleShowPass2 = () => {
        setShowPass2(!showPass2)
    }

    return(
        <WrapLogin>
            <div className="bg-white border flex flex-col gap-2 p-4 pt-10 drop-shadow-md">
                {/*<img src={logo} alt="logo" className="mx-auto mb-2 h-10 w-52" />*/}
                <p className="mx-auto text-slate-400 font-bold text-lg max-w-xs text-center	">
                    Đăng ký
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
                    {error ? (
                        <FormHelperText style={{color: "#d32f2f", textAlign: "center"}}>
                            {error}
                        </FormHelperText>
                    ) : null}

                    <TextField
                        fullWidth
                        label="Name"
                        name="name"
                        value={dataForm.values.name}
                        onChange={dataForm.handleChange}
                        error={dataForm.errors.name && dataForm.touched.name}
                        helperText={
                            dataForm.errors.name && dataForm.touched.name
                                ? dataForm.errors.name
                                : null
                        }
                        size="small"
                    />

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

                    <FormControl
                        fullWidth
                        size="small"
                        variant="outlined"
                    >
                        {dataForm.errors.password && dataForm.touched.password ? (
                            <InputLabel htmlFor="outlined-adornment-password" style={{color: "red"}}>
                                password
                            </InputLabel>
                        ) : (
                            <InputLabel htmlFor="outlined-adornment-password">
                                password
                            </InputLabel>
                        )}

                        <OutlinedInput
                            label="password"
                            error={dataForm.errors.confirmPassword && dataForm.touched.confirmPassword}
                            value={dataForm.values.confirmPassword}
                            onChange={dataForm.handleChange}
                            name="confirmPassword"
                            autoComplete="on"
                            id="outlined-adornment-password"
                            type={showPass2 ? "text" : "password"}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleShowPass2}
                                        // onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPass2 ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        {dataForm.errors.confirmPassword && dataForm.touched.confirmPassword ? (
                            <FormHelperText style={{color: "#d32f2f"}}>
                                {dataForm.errors.confirmPassword}
                            </FormHelperText>
                        ) : null}
                    </FormControl>
                    <Button
                        variant="contained"
                        type="submit"
                        className="font-medium py-2 rounded w-full"
                        onClick={() => dispatch(setError(null))}
                    >
                        Đăng ký
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

            <div className="bg-white border p-5 text-center drop-shadow-md">
                Bạn đã có tài khoản?{" "}
                <Link to="/login"  className="text-sm font-medium  text-blue-800"
                      onClick={() => dispatch(setError(null))}>
                    <p>Đăng nhập</p>
                </Link>
            </div>
        </WrapLogin>
    )
}