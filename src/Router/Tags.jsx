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

        fetch(`${process.env.REACT_APP_API}/api/v1/articles?tags=${this.props.params.slug}`)
            .then((response) => response.json())
            .then((result) => this.setState({ articles: result }));
    };

    render() {
        return (
            <div>
                {(!this.state || !this.state.articles)?(
                    <Article compact/>
                ):(
                    this.state.articles.map((slug) => (<Article key={slug} slug={slug} compact/>))
                )}
            </div>
        );
    };
};

export default function TagsRouter(props) {
    return (<TagsRouterComponent {...props} params={useParams()}/>);
};
