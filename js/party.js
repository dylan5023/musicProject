import { element } from "prop-types";
import Tracks from "./tracks";
const trackFile = "http://localhost:8070/tracks";
let trackList = null;
let queue = [];
let names = [];
let library = [];
$.getJSON(trackFile, (data) => {
    trackList = data;
    trackList.forEach((track)=>{
        names.push(track.track_name)

    });
    library = [...new Set(names)];
    console.log(trackList);
    // console.log(names);
});

function showGuests() {
    $(".sideBar").slideToggle();
    console.log("True");
};

function addMusic(e) {
    e.preventDefault();
    let search = $(".musicInput").val().toLowerCase();

    for(let val of trackList){
        let name = val.track_name.toLowerCase();
        if (search == name && search != "" && queue.length < 10) {
            let tempTrack = new Tracks(val.track_id,val.artists,val.track_name,val.album_name,val.track_genre,val.duration_ms,val.explicit);
            queue.push(tempTrack);
            $(".queue").append(tempTrack.toQueue());
            return false;
        };
        $(".musicInput").val("");
        
    }
}


function filterLibrary(){

    let search = $(".musicInput").val().toLowerCase();
    let counter = 0;
    $(".filter").empty();
    library.forEach((item)=>{
        let text = item;
        // console.log(text)
        if(text.toLowerCase().includes(search) && search != "" && counter < 10){
            let div = $("<div></div>");
            div.text(item);
            div.on("click",()=>{
                $(".musicInput").val(text);
                $(".filter").empty();
            })
            $(".filter").append(div);
            counter++;
        }
    });
}

$(".musicInput").on("keyup",filterLibrary);
$(".hamburguerMenu").click(showGuests);
$(".musicAdd").submit(addMusic);
