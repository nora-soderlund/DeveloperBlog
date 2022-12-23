import { Component } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-regular-svg-icons";

import Header from "./Layouts/Header";

import Index from "./Router/Index";
import About from "./Router/About";
import ArticleRouter from "./Router/Article";
import TagsRouter from "./Router/Tags";

import "./Layouts/Styles/App.scss";

export default class App extends Component {
    componentDidMount() {
        library.add(faThumbsUp, faThumbsDown);
    };
    
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

                            <Route path="/tags">
                                <Route path="/tags/" element={<TagsRouter/>} />
                                <Route path="/tags/:slug" element={<TagsRouter/>} />
                            </Route>
                        </Route>
                    </Routes>
                </main>
            </BrowserRouter>
        );
    };
};
