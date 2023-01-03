import { Component } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import App from "../App";
import Articles from "../Services/API/Articles";
import ProgrammerNetworkLink from "./ProgrammerNetworkLink";

export default class Article extends Component {
    static months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];

    static getOrdinalNumber(number) {
        return number + (number > 0 ? ['th', 'st', 'nd', 'rd'][(number > 3 && number < 21) || number % 10 > 3 ? 0 : number % 10] : '');
    };

    componentDidMount() {
        if(this.props?.slug) {
            Articles.getAsync(this.props.slug).then((article) => this.setState({ article }));
        }
    };

    hash = undefined;

    componentDidUpdate(previousProps, previousState) {
        if(previousState?.article !== this.state?.article && this.props?.onData)
            this.props.onData(this.state.article);

        const hash = window.location.hash.substring(1);

        if(hash !== this.hash) {
            this.resetPreviousTab();

            this.hash = hash;

            if(hash.length !== 0) {
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
        const article = this.state?.article ?? Articles.getCached(this.props.slug);

        if(!article) {
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

        const date = new Date(article.timestamp);
        const month = (Article.months)[date.getMonth()];

        return (
            <article>
                <span className="article-date">{month} {Article.getOrdinalNumber(date.getDate())}, {date.getFullYear()}</span>

                {(this.props?.compact)?(
                    <Link to={`/articles/${this.props.slug}`}>
                        <h2 className="article-title">{article.title}</h2>
                    </Link>
                ):(
                    <h2 className="article-title article-title-link" onClick={() => App.copyToClipboard(window.location.href.replace(window.location.hash, ""))}>
                        {article.title}

                        <FontAwesomeIcon className="article-link" icon={["fas", "link"]}/>
                    </h2>
                )}

                <div dangerouslySetInnerHTML={{ __html: (this.props.compact)?(article.short):(article.content)}}></div>

                <div className="article-tags">
                    <div className="article-tags-content">
                        {article.tags.map((tag) => (
                            <Link to={`/tags/${tag.slug}`} key={tag.slug}>
                                <span className={`article-tag ${(tag.shimmer)?("article-tag-featured"):("")}`} style={tag.color && {
                                    color: tag.color,
                                    borderColor: tag.color
                                }}>
                                    {(tag.icon) && (<FontAwesomeIcon className="article-tag-icon" icon={[ tag.icon.substring(0, tag.icon.indexOf('-')), tag.icon.substring(tag.icon.indexOf('-') + 1) ]}/>)}
                                    
                                    {tag.text}
                                </span>
                            </Link>
                        ))}
                    </div>

                    {(this.props.compact && article.network) && (
                        <div className="article-tags-links">
                            <ProgrammerNetworkLink href={article.network} text={null}/>
                        </div>
                    )}
                </div>

                {(!this.props.compact) && (
                    <div className="article-feedback">
                        {(!article.feedback)?(
                            <p>Was this article useful for you?</p>
                        ):(
                            <p>Thank you for your feedback!</p>
                        )}

                        <div className="article-feedback-buttons">
                            <div className="article-feedback-button" onClick={() => this.onFeedbackClick(true)}>
                                <FontAwesomeIcon icon={[(article.feedback && article.feedback.positive)?("fas"):("far"), "thumbs-up"]}/>
                            </div>

                            <div className="article-feedback-button" onClick={() => this.onFeedbackClick(false)}>
                                <FontAwesomeIcon icon={[(article.feedback && !article.feedback.positive)?("fas"):("far"), "thumbs-down"]}/>
                            </div>
                        </div>
                    </div>
                )}

                {(!this.props.compact && article.network) && (
                    <p className="article-network">
                        Join the discussion on <ProgrammerNetworkLink href={article.network}/> with other developers!
                    </p>
                )}
            </article>
        );
    };
};
