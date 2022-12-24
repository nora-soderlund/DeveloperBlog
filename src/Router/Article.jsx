import { Component } from "react";
import { useParams } from "react-router";
import App from "../App";

import Article from "../Components/Article";

class ArticleRouterComponent extends Component {
    componentDidMount() {
        document.title = `${App.title}`;
    };

    onData(article) {
        document.title = `${article.title} - ${App.title}`;
    };

    render() {
        return (
            <Article slug={this.props.params.slug} onData={(data) => this.onData(data)}/>
        );
    };
};

export default function ArticleRouter(props) {
    return (<ArticleRouterComponent {...props} params={useParams()}/>);
};
