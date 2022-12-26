import { Component } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import Index from "./Router/Index";
import About from "./Router/About";
import ArticleRouter from "./Router/Article";
import TagsRouter from "./Router/Tags";

import Header from "./Layouts/Header";
import Footer from "./Layouts/Footer";

import "./Components/Icons";

import "./Styles/App.scss";

export default class App extends Component {
    static title = document.querySelector(`meta[name="title"]`).getAttribute("content");

    static async copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            alert("Copied link to clipboard!");
        }, (error) => {
            alert("Couldn't copy to clipboard: " + error);
        });
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

                <Footer/>
            </BrowserRouter>
        );
    };
};
