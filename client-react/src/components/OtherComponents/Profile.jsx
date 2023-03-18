import PropTypes from 'prop-types';
import {styled} from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Avatar from "@mui/material/Avatar";
import {useFormik} from "formik";
import {useSelector} from "react-redux";
import {Button} from "@mui/material";
import {useState, useEffect} from "react";

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

export default function Profile(props) {
    const {open, setOpen} = props
    const {userData} = useSelector((state) => state.auth?.user);
    const dataUpdate = useFormik({
        initialValues: {
            id: userData?.id,
            email: userData?.email,
            name: userData?.name,
            gender: "",
            birthday: ""
        }
    })
    const handleClose = () => {
        setOpen(false);
        dataUpdate.resetForm()
    };

    return (
        <div>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <form>
                    <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                        <b className="ml-28">Thông tin cá nhân</b>
                    </BootstrapDialogTitle>
                    <DialogContent dividers>
                        <div>
                            <div className="flex flex-col items-center mb-6" style={{color: "black"}}>
                                <Avatar
                                    alt="Remy Sharp"
                                    src={userData?.avatar}
                                    sx={{width: 150, height: 150}}
                                />
                                <p className="text-2xl mb-4 mt-1.5" style={{color: "#9805f8"}}>{userData?.name}</p>
                                <p>hello dất vui được làm quen với mọi người</p>
                            </div>
                            <div>
                                <div><b style={{color: "#f52b2b"}}>ID: </b> {userData?.id}</div>
                                <div><b style={{color: "#f52b2b"}}>Email: </b>{userData?.email}</div>
                                <br/>
                                <div><b style={{color: "#3dc90e"}}>Tên: </b>
                                    <input className="focus:outline-none w-80"
                                           name="name"
                                           value={dataUpdate.values.name}
                                           onChange={dataUpdate.handleChange}
                                    />
                                </div>
                                <div><b style={{color: "#3dc90e"}}>Giới tính: </b>
                                    <select className="focus:outline-none" name="gender">
                                        <option value="male">Nam</option>
                                        <option value="female">Nữ</option>
                                        <option value="other">khác</option>
                                        <option value="secret">Bí mật</option>
                                    </select></div>
                                <div><b style={{color: "#3dc90e"}}>Sinh nhật: </b>
                                    <input type={"date"} value={dataUpdate.values.birthday}
                                           onChange={dataUpdate.handleChange}
                                           className="focus:outline-none"/>
                                </div>
                                {/*<div><b style={{color: "#3dc90e"}}>Giới thiệu: </b>*/}
                                {/*    <input type={"text"}*/}
                                {/*           className="focus:outline-none"/>*/}
                                {/*</div>*/}
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button type="submit">save</Button>
                    </DialogActions>
                </form>
            </BootstrapDialog>
        </div>
    );
}