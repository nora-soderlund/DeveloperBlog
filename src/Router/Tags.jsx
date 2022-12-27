import { Component } from "react";
import { useParams } from "react-router";
import App from "../App";

import Article from "../Components/Article";
import Articles from "../Services/API/Articles";

class TagsRouterComponent extends Component {
    componentDidMount() {
        if(!this.props.params.slug) {
            window.location.href = "/";

            return;
        }

        document.title = App.title;

        Articles.getFeedAsync(this.state?.start ?? 0, this.props.params.slug)
            .then((feed) => this.setState({ start: feed.end, articles: feed.articles, paginatable: feed.paginatable }));
    };

    onPaginate() {
        Articles.getFeedAsync(this.state?.start ?? 0, this.props.params.slug)
            .then((feed) => this.setState({ start: feed.end, articles: this.state.articles.concat(feed.articles), paginatable: feed.paginatable }));
    };

    render() {
        return (
            <div>
                {(!this.state || !this.state.articles)?(
                    <Article compact/>
                ):(
                    this.state.articles.map((slug) => (<Article key={slug} slug={slug} compact/>))
                )}
                
                {(this.state?.paginatable) && (
                    <p className="pagination" onClick={() => this.onPaginate()}>Load more articles</p>
                )}
            </div>
        );
    };
};

export default function TagsRouter(props) {
    return (<TagsRouterComponent {...props} params={useParams()}/>);
};
