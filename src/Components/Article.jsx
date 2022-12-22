import { Component } from "react";
import { Link } from "react-router-dom";
import SyntaxHighlighter from "react-syntax-highlighter";
import { vs2015 } from "react-syntax-highlighter/dist/esm/styles/hljs";

import javascript from "./../Images/javascript.png";

export default class Article extends Component {
    static months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];

    static getOrdinalNumber(number) {
        return number + (number > 0 ? ['th', 'st', 'nd', 'rd'][(number > 3 && number < 21) || number % 10 > 3 ? 0 : number % 10] : '');
    };

    componentDidMount() {
        if(this.props?.slug) {
            fetch(`http://localhost:3001/api/v1/article?slug=${this.props.slug}`)
                .then((response) => response.json())
                .then((result) => this.setState({ article: result }));
        }
    };

    render() {
        if(!this.state?.article) {
            return (
                <article>
                    <span className="article-date shimmer"></span>
                        
                    <h2 className="shimmer"> </h2>

                    <p className="shimmer">
                        <span className="shimmer-content">Lorem ipsum; didum lip. Lorem ipsum; didum lip. Lorem ipsum; didum lip. Lorem ipsum; didum lip.</span>
                    </p>
                    
                    <p className="shimmer">
                        <span className="shimmer-content">Lorem ipsum; didum lip. Lorem ipsum; didum lip. Lorem ipsum; didum lip. Lorem ipsum; didum lip.</span>
                    </p>

                    <span className="shimmer"></span>
                </article>
            );
        }

        const date = new Date(this.state.article.timestamp);
        const month = (Article.months)[date.getMonth()];

        console.log(this.state.article);

        return (
            <article>
                <span className="article-date">{month} {Article.getOrdinalNumber(date.getDate())}, {date.getFullYear()}</span>

                {(this.props?.compact)?(
                    <Link to={`/articles/${this.props.slug}`}>
                        <h2>{this.state.article.title}</h2>
                    </Link>
                ):(
                    <h2>{this.state.article.title}</h2>
                )}

                <div dangerouslySetInnerHTML={{ __html: (this.props.compact)?(this.state.article.short):(this.state.article.content)}}></div>

                {this.state.article.tags.map((tag) => (
                    <Link to={`/tags/${tag.slug}`} key={tag.slug}>
                        <span className="article-tag">{tag.text}</span>
                    </Link>
                ))}
            </article>
        );
    };
};
