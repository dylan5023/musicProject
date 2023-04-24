//Class Tracks
class Tracks {
    /**
     * @var {string} trackId
    */
    _trackId;
    /**
     * @var {string} artist
     */
    _artist;
    /**
     * @var {string} trackName
    */
    _trackName;
    /**
     * @var {string} albumName
     */
    _albumName;
    /**
     * @var {string} genre
     */
    _genre;
    /**
     * @var {int} duration
     */
    _duration;
    /**
     * @var {boolean} explicit
    */
    _explicit;

    constructor(trackId,artist,trackName,albumName,genre,duration,explicit) {
        this._trackId = trackId;
        this._artist = artist;
        this._trackName = trackName;
        this._albumName = albumName;
        this._genre = genre;
        this._duration = duration;
        this._explicit = explicit;
    }
    
}
export default Tracks;