import {AppDataSource} from "../database/data-source";
import {Users} from "../models/Users";
import UserService from "./UserService";
import {Relationships} from "../models/Relationships";
const relationshipsRepository = AppDataSource.getRepository(Relationships);

class RelationshipSerVice {
    async addFriend (req) {
        let newRelationship = new Relationships()
        newRelationship.user = req.user.id;
        newRelationship.object = req.body.userId;
        newRelationship.information = "waiting";
        newRelationship.proactive = req.user.id;
        let data = await relationshipsRepository.save(newRelationship)
        return data
    }
}

export default new RelationshipSerVice()

