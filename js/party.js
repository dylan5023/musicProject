import Tracks from "./tracks";
const trackFile = "http://localhost:8070/tracks";
let trackList = null;
let queue = new Array();
let names = [];
let library = [];
$.getJSON(trackFile, (data) => {
    trackList = data;
    trackList.forEach((track)=>{
        names.push(track.track_name)
    })
    function getUnique(array){
        var uniqueArray = [];
        
        for(var value of array){
            if(uniqueArray.indexOf(value) === -1){
                uniqueArray.push(value);
            }
        }
        return uniqueArray;
    }
    library = getUnique(names);
    console.log(library);
});

function showGuests() {
    $(".sideBar").slideToggle();
    console.log("True");
};

function addMusic(e) {
    e.preventDefault();
    let search = $(".musicInput").val().toLowerCase();

    for(let val of trackList){
        // console.log(val)
        let name = val.track_name.toLowerCase();
        if (search == name && search != "") {
            let tempTrack = new Tracks(val.track_id,val.artists,val.track_name,val.album_name,val.track_genre,val.duration_ms,val.explicit);
            queue.push(tempTrack);
            $(".queue").append(tempTrack.toQueue());
            return false;
        };
        $(".musicInput").val("");
    }
}


function filterLibrary(){

    // library.forEach((val)=>{

    // });

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
        // else {
        //     item.style.display = "none";
        // }
    });
    // if(search == "")
}
$(".musicInput").on("keyup",filterLibrary);
$(".hamburguerMenu").click(showGuests);
$(".musicAdd").submit(addMusic);
