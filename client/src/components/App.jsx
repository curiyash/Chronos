import React from "react";

// Define routes of application
import { Route, Routes } from "react-router-dom";

// Import components
// import NoteList from "./Notes";
import ArticleList from "./Articles";
import Authorized from "./Authorized";
import DisplayCards from "./Card";

const App = () => {
    return (
        <div>
            <Routes>
                <Route exact path="/" element={<ArticleList />} />
                <Route exact path="/card" element={<DisplayCards />}></Route>
                <Route path="/authorized/:req_token" element={<Authorized />} />
            </Routes>
        </div>
    );
};

export default App;