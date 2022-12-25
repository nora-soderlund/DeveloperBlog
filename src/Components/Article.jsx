import { Component } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import App from "../App";

export default class Article extends Component {
    static months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];

    static getOrdinalNumber(number) {
        return number + (number > 0 ? ['th', 'st', 'nd', 'rd'][(number > 3 && number < 21) || number % 10 > 3 ? 0 : number % 10] : '');
    };

    componentDidMount() {
        if(this.props?.slug) {
            fetch(`${process.env.REACT_APP_API ?? ""}/api/v1/article?slug=${this.props.slug}`)
                .then((response) => response.json())
                .then((result) => this.setState({ article: result }));
        }
    };

    hash = undefined;

    componentDidUpdate(previousProps, previousState) {
        if(previousState?.article != this.state?.article && this.props?.onData)
            this.props.onData(this.state.article);

        const hash = window.location.hash.substring(1);

        if(hash != this.hash) {
            this.resetPreviousTab();

            this.hash = hash;

            if(hash.length != 0) {
                const tabElement = document.querySelector(`.article-tab[href="#${hash}"]`);

                if(tabElement != null) {
                    tabElement.classList.add("active");

                    const element = document.getElementById(hash);

                    element.classList.add("active");
                }
            }
            else {
                const defaultElement = document.querySelector(".article-tab[default]");
        
                if(defaultElement) {
                    defaultElement.classList.add("active");

                    const element = document.getElementById(defaultElement.getAttribute("href").substring(1));

                    element.classList.add("active");
                }
            }
        }
    };

    resetPreviousTab() {
        const previousElement = document.querySelector(".article-tab.active");
   
        if(previousElement) {
            previousElement.classList.remove("active");

            const element = document.getElementById(previousElement.getAttribute("href").substring(1));

            element.classList.remove("active");
        }
    };

    onFeedbackClick(positive) {
        fetch(`${process.env.REACT_APP_API ?? ""}/api/v1/article/feedback?slug=${this.props.slug}&positive=${positive}`)
            .then((response) => response.json())
            .then((result) => this.setState({ article: { ...this.state.article, feedback: result } }));
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
                        <h2 className="article-title">{this.state.article.title}</h2>
                    </Link>
                ):(
                    <h2 className="article-title">
                        {this.state.article.title}

                        <FontAwesomeIcon className="article-link" icon={["fas", "link"]} onClick={() => App.copyToClipboard(window.location.href.replace(window.location.hash, ""))}/>
                    </h2>
                )}

                <div dangerouslySetInnerHTML={{ __html: (this.props.compact)?(this.state.article.short):(this.state.article.content)}}></div>

                <p>
                    {this.state.article.tags.map((tag) => (
                        <Link to={`/tags/${tag.slug}`} key={tag.slug}>
                            <span className="article-tag">{tag.text}</span>
                        </Link>
                    ))}
                </p>

                {(!this.props.compact) && (
                    <div className="article-feedback">
                        {(!this.state.article.feedback)?(
                            <p>Was this article useful for you?</p>
                        ):(
                            <p>Thank you for your feedback!</p>
                        )}

                        <div className="article-feedback-buttons">
                            <div className="article-feedback-button" onClick={() => this.onFeedbackClick(true)}>
                                <FontAwesomeIcon icon={[(this.state.article.feedback && this.state.article.feedback.positive)?("fas"):("far"), "thumbs-up"]}/>
                            </div>

                            <div className="article-feedback-button" onClick={() => this.onFeedbackClick(false)}>
                                <FontAwesomeIcon icon={[(this.state.article.feedback && !this.state.article.feedback.positive)?("fas"):("far"), "thumbs-down"]}/>
                            </div>
                        </div>
                    </div>
                )}
            </article>
        );
    };
};
