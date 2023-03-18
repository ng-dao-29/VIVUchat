import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import UserService from "../services/UserService";
import userService from "../services/UserService";

class AuthController {

    async createUser(req, res) {
        try {
            let user = await UserService.checkUser(req)
            if (user) {
                res.status(202).json({
                    success: false,
                    message: "tài khoản email đã đăng ký trước đó!",
                    data: null
                });
            } else {
                let newUser = await UserService.createUser(req);
                let payload = {
                    id: newUser.id,
                    name: newUser.name,
                    email: newUser.email,
                    avatar: newUser.avatar
                };
                const token = JWT.sign(payload, "333-4444-55555",
                    {expiresIn: "1h"});
                if (newUser)
                    res.status(200).json({
                        success: true,
                        message: "Tạo tài khoản thành công",
                        data: {
                            userData: newUser,
                            token: token
                        }
                    })
            }
        } catch (e) {
            res.status(500).json({
                success: false,
                message: e.message,
                data: null
            })
        }
    }

    async login(req, res) {
        try {
            const user = await UserService.checkUser(req);
            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: "Tài khoản hoạc mật khẩu không trính xác",
                    data: null
                });
            }
            const checkPassword = await bcrypt.compare(
                req.body.password, user.password
            )
            if (!checkPassword) {
                return res.status(401).json({
                    success: false,
                    message: "Tài khoản hoạc mật khẩu không trính xác",
                    data: null
                });
            }
            let payload = {
                id: user.id,
                name: user.name,
                email: user.email,
                avatar: user.avatar
            };
            const token = JWT.sign(payload, "333-4444-55555",
                {expiresIn: "1h"});
            const login = await userService.handelUserOnLine(user)
            // const cookieRefresh = JWT.sign(payload, "333-4444-55555",
            //     {expiresIn: "1m"});
            // res.cookie("refreshToken", cookieRefresh, {
            //     httpOnly: true,
            //     secure:false,
            //     path: "/",
            //     sameSite: "strict",
            // });
            res.status(200).json({
                success: true,
                message: null,
                data: {
                    userData: user,
                    token: token
                }
            })
        } catch (e) {
            res.status(500).json({
                success: false,
                message: e.message,
                data: null
            })
        }
    };

    async logout(req, res) {
        try {
            await userService.handelUserOffLine(req)
            res.status(200).json({
                success: true,
                message: null,
                data: null
            })
        } catch (e) {
            res.status(500).json({
                success: false,
                message: e.message,
                data: null
            })
        }
    }

    async UpdatePassword(req, res) {
        try {
            const { password, newPassword } = req.body;
            let user = await userService.getPassword(req);
            const isPasswordMatch = await bcrypt.compare(password, user.password);
            if (isPasswordMatch) {
                let hashPassword = await bcrypt.hash(newPassword,10)
                let handleUpdatePassword = await UserService.updatePassword(user, hashPassword);
                res.status(200).json({
                    success: true,
                    message: "Đổi mật khẩu thành công",
                    data: null
                });
            } else {
                res.status(202).json({
                    success: false,
                    message: "Mật khẩu cũ không chính xác",
                    data: null
                });
            }
        } catch (e) {
            res.status(500).json({
                success: false,
                message: e.message,
                data: null
            })
        }
    }
}

export default new AuthController();
