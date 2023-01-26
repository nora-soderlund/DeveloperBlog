import { Component } from "react";

import { ArticleResponse, ArticlesResponse } from "Types/Responses";

import Page from "Components/Page";
import Article from "Components/Article";

import API from "Services/API";
import { GithubNotification } from "Types";

import style from "Styles/Modules/index.module.scss";
import Link from "next/link";
import moment from "moment";
import Image from "next/image";

type IndexPageProps = {
    tag: string | null
};

type IndexPageState = {
    articles: (ArticleResponse | null)[],
    github: GithubNotification[]
};

export default class IndexPage extends Component<IndexPageProps, IndexPageState> {
    async componentDidMount(): Promise<void> {
        API.getArticleSlugsByPagination(0, this.props.tag).then((pagination: ArticlesResponse | null) => {
            if(pagination === null)
                return;
    
            Promise.all(pagination.articles.map(async (slug) => await API.getArticleBySlug(slug))).then((articles: (ArticleResponse | null)[]) => {
                this.setState({
                    articles
                });
            });
        });

        API.getGithubNotifications().then((githubNotifications: GithubNotification[]) => {
            this.setState({
                github: githubNotifications
            });
        });
    };

    render() {
        return (
            <Page>
                {(this.state?.articles)?(
                    this.state?.articles.slice(0, 1).map((data) => (
                        <Article key={data?.article.slug} data={data} compact={true}/>
                    ))
                ):(
                    Array(1).fill(null).map((_, index) => (
                        <Article key={index} compact={true}/>
                    ))
                )}

                <h4>My latest activity</h4>

                <div className={style.github}>
                    {(this.state?.github)?(
                        this.state.github.map((notification) => (
                            <div key={notification.id} className={style.notification}>
                                <div className={style.repository}>
                                    <Link href={notification.repository_url} className={style.image}>
                                        <Image alt={notification.repository_name} src={notification.repository_owner_avatar} width={64} height={64}/>
                                    </Link>

                                    <Link href={notification.subject_url} className={style.name} title={notification.repository_full_name}>{notification.repository_name}</Link>
                                </div>

                                <p className={style.title} title={notification.subject_title}>{notification.subject_title}</p>

                                <small className={style.time}>{moment(notification.updated_at).fromNow()}</small>
                            </div>
                        ))
                    ):(
                        Array(3).fill(null).map((_, index) => (
                            <div key={index} className={style.notification}>
                                <div className={style.repository}>
                                    <div className={`${style.image} shimmer`}></div>

                                    <div className={`${style.name} shimmer`}></div>
                                </div>

                                <div className={`${style.title} shimmer`}></div>

                                <small className={`${style.time} shimmer`}></small>
                            </div>
                        ))
                    )}
                </div>


                {(this.state?.articles)?(
                    this.state?.articles.slice(1, this.state?.articles.length).map((data) => (
                        <Article key={data?.article.slug} data={data} compact={true}/>
                    ))
                ):(
                    Array(3).fill(null).map((_, index) => (
                        <Article key={index} compact={true}/>
                    ))
                )}
            </Page>
        );
    };
};
