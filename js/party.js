import Tracks from "./tracks";
const trackFile = "http://localhost:8070/tracks";
let trackList = null;
let queue = new Array();
$.getJSON(trackFile, (data) => {
    trackList = data;
    console.log(trackList)
});
function showGuests() {
    $(".sideBar").slideToggle();
    console.log("True")
}

function addMusic(e) {
    e.preventDefault();
    let search = $(".musicInput").val().toLowerCase();

    for(let val of trackList){
        // console.log(val)
        let name = val.track_name.toLowerCase();
        if (search == name && search != "") {
            let tempTrack = new Tracks(val.track_id,val.artists,val.track_name,val.album_name,val.track_genre,val.duration_ms,val.explicit)
            queue.push(tempTrack);
            $(".queue").append(tempTrack.toQueue())
            return false;
        };
        $(".musicInput").val("")
    }
}

$(".hamburguerMenu").click(showGuests);
$(".musicAdd").submit(addMusic);
