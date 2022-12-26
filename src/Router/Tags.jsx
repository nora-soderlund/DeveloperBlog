import { Component } from "react";
import { useParams } from "react-router";
import App from "../App";

import Article from "../Components/Article";

class TagsRouterComponent extends Component {
    componentDidMount() {
        if(!this.props.params.slug) {
            window.location.href = "/";

            return;
        }

        document.title = App.title;

        fetch(`${process.env.REACT_APP_API ?? ""}/api/v1/articles?tags=${this.props.params.slug}&start=${this.state?.start ?? 0}`)
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
                ):(
                    this.state.articles.map((slug) => (<Article key={slug} slug={slug} compact/>))
                )}
                
                {(this.state?.paginatable) && (
                    <p className="articles-paginate" onClick={() => this.onPaginate()}>Load more articles</p>
                )}
            </div>
        );
    };
};

export default function TagsRouter(props) {
    return (<TagsRouterComponent {...props} params={useParams()}/>);
};
