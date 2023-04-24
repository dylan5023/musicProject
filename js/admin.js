import User from "./user.js"; 
//Class Admin
class Admin extends User {
    /**
     * @var {int} partyId
     */
    _partyId;
    
    constructor (id,firstName,lastName,email,picture = "",partyId) {
        super (id,firstName,lastName,email,picture = "")
        this._partyId = partyId;
    }

    getPartyId() {
        return this._partyId;
    }
}
export default Admin;