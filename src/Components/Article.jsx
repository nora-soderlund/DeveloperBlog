import { Component } from "react";

import Link from "next/link";

import { copyLinkToClipboard } from "Services/Clipboard";

import Dates from "Services/Dates";

import Icons, { Icon, IconNames } from "./Icons";
import ProgrammerNetworkLink from "./ProgrammerNetworkLink";
import SyntaxHighlight from "./SyntaxHighlight";
import API from "Services/API";
import ProgrammerNetworkIcon from "./ProgrammerNetworkIcon";

export default class Article extends Component {
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

        window.shiki = require("shiki");
        window.shiki.setCDN("/_next/static/shiki/");

        customElements.define(SyntaxHighlight.name, SyntaxHighlight.execute());
    };

    async feedbackDidUpdate(feedback) {
        await API.setArticleFeedbackBySlug(this.props.data.article.slug, feedback);

        this.setState({ feedback });
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
                        <span className="shimmer-content">Lorem ipsum; didum lip. Lorem ipsum; didum lip.</span>
                    </p>

                    <div className="article-tags">
                        <div className="article-tags-content">
                            <span className="article-tag article-tag-featured" style={{ color: "transparent", borderColor: "transparent" }}>A bit longer</span>
                            <span className="article-tag article-tag-featured" style={{ color: "transparent", borderColor: "transparent" }}>Shimmer</span>
                        </div>
                    </div>
                </article>
            );
        }

        const article = this.props.data.article;
        const feedback = (this.state && this.state.feedback !== undefined)?(this.state.feedback):(this.props.data.feedback);

        const date = new Date(article.timestamp);

        return (
            <article>
                <span className="article-date">{Dates.months[date.getMonth()]} {Dates.getOrdinalNumber(date.getDate())}, {date.getFullYear()}</span>

                {(this.props?.compact)?(
                    <Link href={`/articles/${article.slug}`}>
                        <h1 className="article-title">{article.title}</h1>
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
                            <Link href={article.network} rel="noreferrer" target="_blank"><ProgrammerNetworkIcon/></Link>
                        </div>
                    )}
                </div>

                {(!this.props.compact) && (
                    <div className="article-feedback">
                        {(feedback === null)?(
                            <p>Was this article useful for you?</p>
                        ):(
                            <p>Thank you for your feedback!</p>
                        )}

                        <div className="article-feedback-buttons">
                            <div className="article-feedback-button" onClick={() => this.feedbackDidUpdate((feedback !== true)?(true):(null))}>
                                <Icon icon={(feedback === true)?(Icons.fasThumbsUp):(Icons.farThumbsUp)}/>
                            </div>

                            <div className="article-feedback-button" onClick={() => this.feedbackDidUpdate((feedback !== false)?(false):(null))}>
                                <Icon icon={(feedback === false)?(Icons.fasThumbsDown):(Icons.farThumbsDown)}/>
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
