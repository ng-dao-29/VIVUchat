import UserService from "../services/UserService";
import userService from "../services/UserService";
import bcrypt from "bcrypt";

class UserController {

    async searchUser(req, res) {
        try{       
        let dataSearch = await UserService.search(req);
        if (dataSearch) {
            res.status(200).json({
                success: true,
                message: null,
                data: dataSearch
            })
        }
        }catch (e) {
            res.status(500).json({
                success: false,
                message: e.message,
                data: null
            })
        }
    }

    async getUser(req, res) {
        try {
            let user = await userService.getDataUser(req);
            res.status(200).json({
                success: true,
                message: null,
                data: user
            })
        } catch (e) {
            res.status(500).json({
                success: false,
                message: e.message,
                data: null
            })
        }
    };

}

export default new UserController();