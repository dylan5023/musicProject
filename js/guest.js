import User from "./user.js"; 
//Class Guest
class Guest extends User {
    /**
     * @var {int} guestId
     */
    _guestId;
    
    constructor (id,name,email,picture = "",guestId) {
        super (id,name,email,picture = "")
        this._guestId = guestId;
    }

    getGuestId() {
        return this._guestId;
    }
}
export default Guest;