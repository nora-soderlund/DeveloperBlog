import { Component } from "react";

import Link from "next/link";

import Icons, { Icon, IconNames } from "./Icon";
import ProgrammerNetworkLink from "./ProgrammerNetworkLink";

import SyntaxHighlight from "./SyntaxHighlight";

import { copyLinkToClipboard } from "./../services/clipboard";

export default class Article extends Component {
    static months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];

    static getOrdinalNumber(number) {
        return number + (number > 0 ? ['th', 'st', 'nd', 'rd'][(number > 3 && number < 21) || number % 10 > 3 ? 0 : number % 10] : '');
    };

    componentDidUpdate() {
        if(customElements.get(SyntaxHighlight.name))
            return;

        if(!this.props.data)
            return;

        if(this.props.compact)
            return;
        
        const article = this.props.data.article;

        if(!article.content.includes(SyntaxHighlight.name))
            return;

        customElements.define(SyntaxHighlight.name, SyntaxHighlight.execute());
    };

    render() {
        if(!this.props.data) {
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

        const article = this.props.data.article;

        const date = new Date(article.timestamp);
        const month = (Article.months)[date.getMonth()];

        return (
            <article>
                <span className="article-date">{month} {Article.getOrdinalNumber(date.getDate())}, {date.getFullYear()}</span>

                {(this.props?.compact)?(
                    <Link href={`/articles/${article.slug}`}>
                        <h2 className="article-title">{article.title}</h2>
                    </Link>
                ):(
                    <h2 className="article-title article-title-link" onClick={() => copyLinkToClipboard(window.location.href.replace(window.location.hash, ""))}>
                        {article.title}

                        <Icon className="article-link" icon={Icons.fasLink}/>
                    </h2>
                )}

                <div dangerouslySetInnerHTML={{ __html: (this.props.compact)?(article.short):(article.content)}}></div>

                <div className="article-tags">
                    <div className="article-tags-content">
                        {article.tags.map((tag) => (
                            <Link href={`/tags/${tag.slug}`} key={tag.slug}>
                                <span className={`article-tag ${(tag.shimmer)?("article-tag-featured"):("")}`} style={tag.color && {
                                    color: tag.color,
                                    borderColor: tag.color
                                }}>
                                    {(tag.icon) && (<Icon className="article-tag-icon" icon={IconNames[tag.icon]}/>)}
                                    
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
                                <Icon icon={(article.feedback && article.feedback.positive)?(Icons.fasThumbsUp):(Icons.farThumbsUp)}/>
                            </div>

                            <div className="article-feedback-button" onClick={() => this.onFeedbackClick(false)}>
                                <Icon icon={(article.feedback && !article.feedback.positive)?(Icons.fasThumbsDown):(Icons.farThumbsDown)}/>
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
    }
};
