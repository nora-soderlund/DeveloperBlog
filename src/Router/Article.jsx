import { Component } from "react";
import { useParams } from "react-router";

import Article from "../Components/Article";

class ArticleRouterComponent extends Component {
    render() {
        return (
            <Article slug={this.props.params.slug}/>
        );
    };
};

export default function ArticleRouter(props) {
    return (<ArticleRouterComponent {...props} params={useParams()}/>);
};
