import { Component } from "react";
import App from "../App";

import Article from "../Components/Article";
import Articles from "../Services/API/Articles";

export default class Index extends Component {
    componentDidMount() {
        document.title = App.title;

        Articles.getFeedAsync(this.state?.start ?? 0)
            .then((feed) => this.setState({ feed }));
    };

    onPaginate() {
        Articles.getFeedAsync(this.state?.start ?? 0)
            .then((feed) => this.setState({ feed }));
    };

    render() {
        const feed = this.state?.feed ?? Articles.getCachedFeed(this.state?.start ?? 0);

        return (
            <div>
                {(!this.state || !feed.articles)?(
                    <Article compact/>
                ):(feed.articles.map((slug) => (<Article key={slug} slug={slug} compact/>)))}

                {(feed?.paginatable) && (
                    <p className="pagination" onClick={() => this.onPaginate()}>Load more articles</p>
                )}
            </div>
        );
    };
};
