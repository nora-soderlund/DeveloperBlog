import { Component } from "react";
import { useParams } from "react-router";

import Article from "../Components/Article";

class ArticleRouterComponent extends Component {
    componentDidMount() {
        window.addEventListener("resize", () => this.onResize());

        this.onResize();
    };

    onResize() {
        const elements = document.getElementsByClassName("article-code");

        for(let index = 0; index < elements.length; index++)
            elements[index].style.width = "0px";

        for(let index = 0; index < elements.length; index++) {
            const parent = elements[index].parentElement;

            const width = parent.getBoundingClientRect().width;

            elements[index].style.width = `${width}px`;
        }
    };

    render() {
        return (
            <Article slug={this.props.params.slug}/>
        );
    };
};

export default function ArticleRouter(props) {
    return (<ArticleRouterComponent {...props} params={useParams()}/>);
};
