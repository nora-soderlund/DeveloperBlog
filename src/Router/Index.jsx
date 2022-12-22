import { Component } from "react";

import Article from "../Components/Article";

export default class Index extends Component {
    componentDidMount() {
        fetch("http://localhost:3001/api/v1/articles")
            .then((response) => response.json())
            .then((result) => this.setState({ articles: result }));
    };

    render() {
        return (
            <div>
                {(!this.state || !this.state.articles)?(
                    <Article compact/>
                ):(this.state.articles.map((slug) => (<Article key={slug} slug={slug} compact/>)))}
            </div>
        );
    };
};
