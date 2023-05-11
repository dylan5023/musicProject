import { node } from "prop-types";
import "../scss/style.scss";
import "../js/party"
import User from "./user.js";
import Chart from "./componets/Chart";
// import Profile from "./componets/Profile";
import CreateParty from "./componets/CreateParty";
// import Chart from "./componets/Chart";
// Single Page Aplication

const pages = [
	{ path: '#/page1', template: Chart },
	{ path: '#/page2', template: CreateParty },
	{ path: '#/page3', template: Profile },
];
const appEl = document.querySelector("#app");
const render = () => {
	const page = pages.find((page) => page.path === location.hash);
	appEl.innerHTML = page ? page.template : Chart;
};

window.addEventListener('popstate', render);

const navigateTo = (url) => {
  history.pushState(null, null, url);
  render();
};
render();

// login
// $("#mainPage").hide();
const mainPage = document.getElementById("mainPage");
const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = loginForm.querySelector('input[type="text"]').value;
  const password = loginForm.querySelector('input[type="password"]').value;

  fetch("http://localhost:8070/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.loginSuccess) {
        console.log(mainPage);
        $("#loginPage").hide();
        $("#mainPage").show();
      } else {
        setFormMessage(
          "#loginForm",
          "error",
          "Invalid email/password combination"
        );
      }
    })
    .catch((error) => {
      console.error(error);
    });
});

// sign up
const signupForm = document.getElementById("createAccountForm");
signupForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  let firstName = $(".input").eq(2).val();
  let lastName = $(".input").eq(3).val();
  let email = $(".input").eq(4).val();
  let password = $("#password1").val();
  let confirmPassword = $("#password2").val();
  console.log(`this is email: ${email}`);
  console.log(`this is firstName: ${firstName}`);
  console.log(`this is lastName: ${lastName}`);
  console.log(`this is pass: ${password}`);
  console.log(`this is confim: ${confirmPassword}`);

  // validate inputs
  //  Input error message
  if (password !== confirmPassword) {
    $(".form-message").text("Passwords do not match");
    $(".form-message").addClass("form-message-error");
    $(".form-message").show();
    return false;
  } else if (email === "" || password === "" || confirmPassword === "") {
    $(".form-message").text("Please fill out from");
    $(".form-message").addClass("form-message-error");
    $(".form-message").show();
    return false;
  } else {
    // create user object
    $(".form-message").hide();
    $(".form-message").removeClass("form-message-error");
    const user = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };

    try {
      // send user data to server
      const response = await fetch("http://localhost:8070/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();
      // console.log(data);

      if (data.error) {
        setFormMessage("#createAccountForm", "data.error", "fail to sign up");
      } else {
        // clear form inputs
        console.log(data);
        setFormMessage("#createAccountForm", "success", "success to sign up");
        // clear form inputs
        $(".input").eq(2).val("");
        $("#password1").val("");
        $("#password2").val("");
        $(".input").eq(3).val("");
        $(".input").eq(4).val("");
      }
    } catch (error) {
      console.error(error);
    }
  }
});

// Login Code
// const loginForm = $("#loginForm");
// const createAccount = $("#createAccountForm");
// let userList = new Map();
// let users = null;
// let userId = 1000;

// // Loading data from JSON file
// $.getJSON("http://localhost:8070/users", (data) => {
//   users = data;
//   console.log(users);
// });
// // Checking user's credentials

// loginForm.submit((e) => {
//   e.preventDefault();
//   users.forEach((user) => {
//     if (
//       user.email == $(".input").eq(0).val() &&
//       user.password == $(".input").eq(1).val()
//     ) {
//       $("#loginPage").hide();
//       $("#mainPage").show();
//     }
//     setFormMessage("#loginForm", "error", "Invalid email/password combination");
//   });
// });

// //Creating a new user
// createAccount.submit((e) => {
//   e.preventDefault();
//   const name = $(".input").eq(0).val();
//   const password = $(".input").eq(1).val();
//   const confirmPassword = $(".input").eq(2).val();
//   userId += userList.size;

//   //  Input error message
//   if ($("#password1").val() !== $("#password1").val()) {
//     $(".form-message").text("Passwords do not match");
//     $(".form-message").addClass("form-message-error");
//   } else if (name === "" || password === "" || confirmPassword === "") {
//     setFormMessage("#createAccountForm", "error", "Please fill up the form");
//   } else {
//     let newUser = new User(userId, name, password, confirmPassword);
//     userList.set(newUser);
//     $("#loginPage").hide();
//     $("#mainPage").show();
//     console.log(newUser);
//   }
// });

// Clear input error
$('.input').on('input', () => {0
	$('.form-message').hide('form-message-error');
});

// // Hide login and display create account form
$(".noaccount").click((e) => {
  e.preventDefault();
  $(loginForm).hide();
  $(signupForm).show();
});
// Hide create account and display login form
$(".account").click((e) => {
  e.preventDefault();
  $(signupForm).hide();
  $(loginForm).show();
});

// Setting the form message
function setFormMessage(formElement, type, message) {
	const messageElement = $(`${formElement} .form-message`);

	messageElement.text(message);
	messageElement.removeClass('form-message-success', 'form-message-error');
	messageElement.addClass(`form-message-${type}`);
}

//party popper
$(".partyForm").submit((e)=>{
  e.preventDefault();
  $("#mainPage").hide();
  $("#party").show();
});

// get out of the party
$(".back").click((e)=>{
  $("#party").hide();
  $("#mainPage").show();
});

// ----------------------------------------------------------------
// Chart
let albums = null;
let albumAndArtists = null;
let songs = [];

$.getJSON("http://localhost:8070/tracks").then((data) => {
  albums = data;
  albumAndArtists = getAlbumAndArtists(albums);
  songs.push(...albumAndArtists);
  init();
  // console.log(songs);
});

function getAlbumAndArtists(data) {
  const albumAndArtists = [];

  for (let i = 0; i < 50; i++) {
    const title = data[i].album_name;
    const artist = data[i].artists;
    const img_src = "1.jpg";
    const src = "comedy.mp4";
    albumAndArtists.push({ title, artist, img_src, src });
  }

  return albumAndArtists;
}
console.log(songs);
const menuBtn = document.querySelector(".menu-btn");
const warehouse = document.querySelector(".warehouse");
menuBtn.addEventListener("click", () => {
  warehouse.classList.toggle("active");
});
let playing = false;
let currentSong = 0;
let favourites = [];
let audio = new Audio();

const playlistContainer = document.querySelector("#playlist");
const infoWrapper = document.querySelector(".info");
const coverImage = document.querySelector(".cover-image");
const currentSongTitles = document.querySelector(".current-song-title");
const currentFavourite = document.querySelector("#current-favourite");
function init() {
  updatePlaylist(songs);
  loadSong(currentSong);
}
function updatePlaylist(songs) {
  playlistContainer.innerHTML = "";
  songs.forEach((song, index) => {
    const { title, src } = song;
    const isFavourite = favourites.includes(index);
    const tr = document.createElement("tr");
    tr.classList.add("song");
    tr.innerHTML = /* html */ `
      <td class = "no">
        <h5>${index + 1}</h5> 
      </td>
      <td class = "title">
        <h6>${title}</h6>
      </td>
      <td class = "length">
        <h5>2:03</h5>
      </td>
      <td>
        <i class = "fas fa-heart ${isFavourite ? "active" : ""}"></i>
      </td> 
    `;
    playlistContainer.append(tr);
    tr.addEventListener("click", (e) => {
      if (e.target.classList.contains("fa-heart")) {
        console.log(e.target);
        addTofavourites(index);
        e.target.classList.toggle("active");
        return;
      }
      currentSong = index;
      loadSong(currentSong);
      audio.play();
      warehouse.classList.remove("active");
      playPauseBtn.classList.replace("fa-play", "fa-pause");
      playing = true;
    });

    const audioForDuration = new Audio(`data/${src}`);
    audioForDuration.addEventListener("loadedmetadata", () => {
      const duration = audioForDuration.duration;

      let songDuration = formatTime(duration);
      tr.querySelector(".length h5").innerText = songDuration;
    });
  });
}

function formatTime(time) {
  let minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);

  seconds = seconds < 10 ? `0${seconds}` : seconds;
  return `${minutes}:${seconds}`;
}

function loadSong(num) {
  if (songs[num]) {
    infoWrapper.innerHTML = `
      <h2>${songs[num].title}</h2>
      <h3>${songs[num].artist}</h3>
    `;

    currentSongTitles.innerHTML = songs[num].title;
    coverImage.style.backgroundImage = `url(data/${songs[num].img_src})`;

    audio.src = `data/${songs[num].src}`;

    if (favourites.includes(num)) {
      currentFavourite.classList.add("active");
    } else {
      currentFavourite.classList.remove("active");
    }
  } else {
    console.log(`Error: song ${num} does not exist`);
  }
}
const playPauseBtn = document.querySelector("#playpause");
const nextBtn = document.querySelector("#next");
const prevBtn = document.querySelector("#prev");

playPauseBtn.addEventListener("click", () => {
  if (playing) {
    playPauseBtn.classList.replace("fa-pause", "fa-play");
    playing = false;
    audio.pause();
  } else {
    playPauseBtn.classList.replace("fa-play", "fa-pause");
    playing = true;
    audio.play();
  }
});

function nextSong() {
  if (currentSong < songs.length - 1) {
    currentSong++;
  } else {
    currentSong = 0;
  }
  loadSong(currentSong);

  if (playing) {
    audio.play();
  }
}

nextBtn.addEventListener("click", nextSong);

function preveSong() {
  if (currentSong > 0) {
    currentSong--;
  } else {
    currentSong = songs.length - 1;
  }
  loadSong(currentSong);

  if (playing) {
    audio.play();
  }
}
prevBtn.addEventListener("click", preveSong);

function addTofavourites(index) {
  if (favourites.includes(index)) {
    favourites = favourites.filter((item) => item !== index);
    currentFavourite.classList.remove("active");
  } else {
    favourites.push(index);
  }

  if (index === currentSong) {
    currentFavourite.classList.add("active");
  }

  updatePlaylist(songs);
}

currentFavourite.addEventListener("click", () => {
  currentFavourite.classList.toggle("active");
  addTofavourites(currentSong);
});
// ----------------------------------------------------------------

// get data from server
// async function getData() {
//   try {
//     const response = await fetch("http://localhost:8070/users");
//     const userList = await response.json();
//     return userList;
//     // do something with the data
//   } catch (error) {
//     console.log(error);
//   }
// }
// getData()
//   .then((userList) => {
//     console.log(userList);
//   })
//   .catch((error) => {
//     console.log(error);
//   });
