import { Component } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import Header from "./Layouts/Header";

import Index from "./Router/Index";
import About from "./Router/About";
import ArticleRouter from "./Router/Article";

import "./Layouts/Styles/App.scss";

export default class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Header/>

                <main>
                    <Routes>
                        <Route path="/">
                            <Route index element={<Index/>} />
                            <Route path="/about" element={<About/>} />

                            <Route path="/articles">
                                <Route path="/articles/:slug" element={<ArticleRouter/>} />
                            </Route>
                        </Route>
                    </Routes>
                </main>
            </BrowserRouter>
        );
    };
};
