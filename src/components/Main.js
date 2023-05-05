function MainPage(props) {
    return (
        <div id="mainPage">
            <main>
                <header>
                    <a href="#/" className="btnLeft">
                        Help
                    </a>
                    <aside>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </aside>
                    <article className="btnRight">
                        <a href="#/page1" className="home">
                            Home
                        </a>
                        <a href="#/page3" className="profile">
                            Profile
                        </a>
                    </article>
                </header>
                <div id="app">{props.currentPage}</div>
                <footer>
                    <a href="#/page2" className="btnBottom">
                        Create Playlist
                    </a>
                </footer>
            </main>
        </div>
    );
};
export default MainPage;