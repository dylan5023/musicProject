//Father Class
class User {
    // Variables
    /**
     * @var {int} id
     */
    _id;
    /**
     * @var {string} firstName
     */
    _firstName;
    /**
     * @var {string} lastName
     */
    _lastName;
    /**
     * @var {string} email
     */
    _email;
    /**
     * @var {string} picture
     */
    _picture;

    //Father constructor
    constructor(id,firstName,lastName,email,picture = "") {
        this._id = id;
        this._firstName = firstName;
        this._lastName = lastName;
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