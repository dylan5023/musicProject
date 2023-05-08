const Chart = /* html */ `
        <div class="warehouse">
            <div class = "top">
                <i id = "menuBtn" class = "fas fa-bars menu-btn"></i>
                <i id = "barSearcg" class = "fas fa-search"></i>
            </div>
            <div class = "cover-image"></div>
            <div class = "player-body"></div>

            <div class = "listWrapper">
                <table class = "list" id = "playlist">
                    <tr class = "song">
                        <td class = "no">
                            <h5>1</h5>
                        </td>
                        <td class = "nameOfSong">
                            <h6>Song Title</h6>
                        </td>
                        <td class = "length">
                            <h5>2:03</h5>
                        </td>
                        <td >
                            <i class = "fas fa-heart"></i>
                        </td>
                    </tr>
                </table> 
            </div>
            <div class= "info">
                <h2>song title</h2>
                <h3>artist</h3>
            </div>
            <div class = "controls">
                <i class = "fas fa-backward" id ="prev"></i>
                <i class = "fas fa-play" id ="playpause"></i>
                <i class = "fas fa-forward" id ="next"></i>
            </div>
            <div class = "more-controls">
                <i class = "fas fa-heart" id ="current-favourite"></i>
                <i class = "fas fa-random" id ="suffle"></i>
                <i class = "fas fa-repeat" id ="repeat"></i>
                <i class = "fas fa-gear" id ="options"></i>
            </div>

            <p class = "current-song-title">song title</p>
        </div>`;

export default Chart;
