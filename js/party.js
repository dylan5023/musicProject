function show(){
    $(".sideBar").slideToggle();
    console.log("True");
}

$(".hamburguerMenu").click(show);

let trackList = null;

$.getJSON("http://localhost:8070/tracks", (data)=>{
    trackList = data;
    console.log(trackList)
});
