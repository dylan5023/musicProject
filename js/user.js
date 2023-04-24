//Father Class
class User {
    // Variables
    /**
     * @var {int} id
     */
    _id;
    /**
     * @var {string} name
     */
    _name;
    /**
     * @var {string} email
     */
    _email;
    /**
     * @var {string} picture
     */
    _picture;

    //Father constructor
    constructor(id,name,email,picture = "") {
        this._id = id;
        this._name = name;
        this._email = email;
        this._picture = picture;
    }

    getId() {
        return this._id;
    }

    createParty()

    joinParty() 
}
export default User;