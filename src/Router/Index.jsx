import { Component } from "react";
import App from "../App";

import Article from "../Components/Article";

export default class Index extends Component {
    componentDidMount() {
        document.title = App.title;

        fetch(`${process.env.REACT_APP_API ?? ""}/api/v1/articles?start=${this.state?.start ?? 0}`)
            .then((response) => response.json())
            .then((result) => this.setState({ start: result.end, articles: result.articles, paginatable: result.paginatable }));
    };

    onPaginate() {
        fetch(`${process.env.REACT_APP_API ?? ""}/api/v1/articles?start=${this.state?.start ?? 0}`)
            .then((response) => response.json())
            .then((result) => this.setState({ start: result.end, articles: this.state.articles.concat(result.articles), paginatable: result.paginatable }));
    };

    render() {
        return (
            <div>
                {(!this.state || !this.state.articles)?(
                    <Article compact/>
                ):(this.state.articles.map((slug) => (<Article key={slug} slug={slug} compact/>)))}

                {(this.state?.paginatable) && (
                    <p className="pagination" onClick={() => this.onPaginate()}>Load more articles</p>
                )}
            </div>
        );
    };
};
