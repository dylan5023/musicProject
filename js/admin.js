import User from "./user.js"; 
//Class Admin
class Admin extends User {
    /**
     * @var {int} partyId
     */
    _partyId;
    
    constructor (id,name,email,picture = "",partyId) {
        super (id,name,email,picture = "")
        this._partyId = partyId;
    }

    getPartyId() {
        return this._partyId;
    }
}
export default Admin;