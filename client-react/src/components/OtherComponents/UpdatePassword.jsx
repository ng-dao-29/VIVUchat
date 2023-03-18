import PropTypes from 'prop-types';
import {styled} from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import * as Yup from "yup";
import {useFormik} from "formik";
import {useSelector} from "react-redux";
import {updatePassword} from "../../services/authService";
import {useState, useEffect} from "react";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {
    Button,
    FormControl,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
} from "@mui/material";

const BootstrapDialog = styled(Dialog)(({theme}) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

function BootstrapDialogTitle(props) {
    const {children, onClose, ...other} = props;

    return (
        <DialogTitle sx={{m: 0, p: 2, width: 420}} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon/>
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

export default function UpdatePassword(props) {
    const {open, setOpen} = props
    const [showPass1, setShowPass1] = useState(false);
    const [showPass2, setShowPass2] = useState(false);
    const [showPass3, setShowPass3] = useState(false);
    const [Notification, setNotification] = useState({});
    const dataForm = useFormik({
        initialValues: {
            password: "",
            newPassword: "",
            confirmPassword: ""
        },
        validationSchema: Yup.object({
            password: Yup.string()
                .required("Không được để trống"),
            newPassword: Yup.string()
                .required("không được để trống")
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,25}$/,
                    "Tối thiểu 8 và tối đa 25 ký tự, ít nhất một chữ hoa, một chữ thường, một số và một ký tự đặc biệt"
                ),
            confirmPassword: Yup.string()
                .required("không được để trống")
                .oneOf([Yup.ref('newPassword')], 'xác nhận mật khẩu không khớp!'),
        }),

        onSubmit: (values) => {
            updatePassword(values).then((res) => {
                setNotification({
                    success: res.data.success,
                    message: res.data.message
                })
                if (res.data.success) {
                    dataForm.resetForm()
                }
            }).catch((err) => {
                setNotification({
                    success: false,
                    message: "Lỗi hệ thống tạm thời không thể đổi mật khẩu. Chúng tôi sẽ khắc phục sớm nhất có thể"
                })
                dataForm.resetForm()
            })
        }
    })

    const handleClose = () => {
        setOpen(false);
        dataForm.resetForm()
    };

    return (
        <div>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <form onSubmit={dataForm.handleSubmit}>
                    <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                        <b className="ml-32">Đổi mật khẩu</b>
                    </BootstrapDialogTitle>
                    <DialogContent dividers>
                            <div className="flex flex-col items-center mb-6" style={{color: "black"}}>
                                <img
                                    alt="Remy Sharp"
                                    src={"data:image/png;base64,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"}
                                />
                                <p>Nghi nghờ tài khoản của bạn bị đăng nhập trái phép?</p>
                                <p>Hãy đổi mật khẩu ngay bây giờ!</p>
                                {Notification.message ? (
                                    <h1 style={{color: Notification.success? ("#6de81a"): ("#d32f2f"), textAlign: "center"}}>
                                        {Notification?.message}
                                    </h1>
                                ) : null}
                            </div>
                        <div className="flex flex-col justify-center items-center m-3 md:m-8">
                            <FormControl
                                size="small"
                                variant="outlined"
                            >
                                {dataForm.errors.password && dataForm.touched.password ? (
                                    <InputLabel htmlFor="outlined-adornment-password" style={{color: "red"}}>
                                        Mật khẩu
                                    </InputLabel>
                                ) : (
                                    <InputLabel htmlFor="outlined-adornment-password">
                                        Mật khẩu
                                    </InputLabel>
                                )}

                                <OutlinedInput
                                    label="Mật khẩu"
                                    error={dataForm.errors.password && dataForm.touched.password}
                                    value={dataForm.values.password}
                                    onChange={dataForm.handleChange}
                                    name="password"
                                    autoComplete="on"
                                    id="outlined-adornment-password"
                                    type={showPass1 ? "text" : "password"}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => setShowPass1(!showPass1)}
                                                // onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPass1 ? <VisibilityOff/> : <Visibility/>}
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
                            <br/>
                            <FormControl
                                size="small"
                                variant="outlined"
                            >
                                {dataForm.errors.newPassword && dataForm.touched.newPassword ? (
                                    <InputLabel htmlFor="outlined-adornment-password" style={{color: "red"}}>
                                        Mật khẩu mới
                                    </InputLabel>
                                ) : (
                                    <InputLabel htmlFor="outlined-adornment-password">
                                        Mật khẩu mới
                                    </InputLabel>
                                )}
                                <OutlinedInput
                                    label="Mật khẩu mới"
                                    error={dataForm.errors.newPassword && dataForm.touched.newPassword}
                                    value={dataForm.values.newPassword}
                                    onChange={dataForm.handleChange}
                                    name="newPassword"
                                    autoComplete="on"
                                    id="outlined-adornment-new-password"
                                    type={showPass2 ? "text" : "password"}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => setShowPass2((!showPass2))}
                                                // onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPass2 ? <VisibilityOff/> : <Visibility/>}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                                {dataForm.errors.newPassword && dataForm.touched.newPassword ? (
                                    <FormHelperText style={{color: "#d32f2f", width: 220}}>
                                        {dataForm.errors.newPassword}
                                    </FormHelperText>
                                ) : null}
                            </FormControl>
                            <br/>
                            <FormControl
                                size="small"
                                variant="outlined"
                            >
                                {dataForm.errors.confirmPassword && dataForm.touched.confirmPassword ? (
                                    <InputLabel htmlFor="outlined-adornment-new-password" style={{color: "red"}}>
                                        Xác nhận mật khẩu
                                    </InputLabel>
                                ) : (
                                    <InputLabel htmlFor="outlined-adornment-new-password">
                                        Xác nhận mật khẩu
                                    </InputLabel>
                                )}

                                <OutlinedInput
                                    label="Xác nhận mật khẩu"
                                    error={dataForm.errors.confirmPassword && dataForm.touched.confirmPassword}
                                    value={dataForm.values.confirmPassword}
                                    onChange={dataForm.handleChange}
                                    name="confirmPassword"
                                    autoComplete="on"
                                    id="outlined-adornment-confirm-password"
                                    type={showPass3 ? "text" : "password"}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => setShowPass3(!showPass3)}
                                                // onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPass3 ? <VisibilityOff/> : <Visibility/>}
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
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button style={{marginRight: 150}} variant="contained" type="submit">xác nhận</Button>
                    </DialogActions>
                </form>
            </BootstrapDialog>
        </div>
    );
}