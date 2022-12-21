import { Component } from "react";
import { Routes, Route, Router, BrowserRouter } from "react-router-dom";

import Header from "./Layouts/Header";

import Index from "./Router/Index";
import About from "./Router/About";
import Article from "./Router/Article";

import "./Layouts/Styles/App.scss";

export default class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Header>
                    <Routes>
                        <Route path="/">
                            <Route index element={<Index/>} />
                            <Route path="/about" element={<About/>} />

                            <Route path="/articles">
                                <Route path="/articles/restricting-a-google-maps-api" element={<Article/>} />
                            </Route>
                        </Route>
                    </Routes>
                </Header>
            </BrowserRouter>
        );
    };
};
