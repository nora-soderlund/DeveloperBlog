import { Component } from "react";

import Head from "next/head";
import { withRouter } from "next/router";
import { WithRouterProps } from "next/dist/client/with-router";

import { ArticleResponse } from "Types/Responses";

import API from "Services/API";

import Page from "Components/Page";
import Article from "Components/Article";
import { ArticleMeta } from "Types";


type ArticlePageProps = WithRouterProps & {
    slug: string,
    meta: ArticleMeta
};

type ArticlePageState = {
    data: ArticleResponse | null
};

class ArticlePage extends Component<ArticlePageProps, ArticlePageState> {
    async componentDidMount(): Promise<void> {
        const article: ArticleResponse | null = await API.getArticleBySlug(this.props.slug);

        this.setState({ data: article }, () => {
            window.addEventListener("hashchange", this.hashDidUpdateListener);

            this.hashDidUpdate();
        });
    };

    componentWillUnmount(): void {
        window.removeEventListener("hashchange", this.hashDidUpdateListener);
    };

    hash: string | undefined = undefined;

    hashDidUpdate(): void {
        const hash = window.location.hash.substring(1);

        if(hash !== this.hash) {
            this.resetPreviousTab();

            this.hash = hash;

            if(hash.length !== 0) {
                const tabElement = document.querySelector(`.article-tab[href="#${hash}"]`);

                if(tabElement != null) {
                    tabElement.classList.add("active");

                    const element = document.getElementById(hash);

                    if(element !== null)
                        element.classList.add("active");
                }
            }
            else {
                const defaultElement = document.querySelector(".article-tab[default]");
        
                if(defaultElement) {
                    defaultElement.classList.add("active");

                    const href: string | null = defaultElement.getAttribute("href");

                    if(href !== null) {
                        const element = document.getElementById(href.substring(1));
                        
                        if(element !== null)
                            element.classList.add("active");
                    }
                }
            }
        }
    };

    hashDidUpdateListener: () => void = () => this.hashDidUpdate();

    resetPreviousTab() {
        const previousElement = document.querySelector(".article-tab.active");
   
        if(previousElement) {
            previousElement.classList.remove("active");

            const href: string | null = previousElement.getAttribute("href");

            if(href === null)
                return;

            const element = document.getElementById(href.substring(1));

            if(element === null)
                return;

            element.classList.remove("active");
        }
    };

    render() {
        return (
            <Page>
                <Head>
                    <title>{`${this.props.meta.title} - Nora Söderlund's Developer Blog`}</title>

                    <meta name="description" content={this.props.meta.description}/>
                    <meta name="keywords" content={this.props.meta.tags.join(',')}/>
                    
                    <meta property="og:site_name" content="Nora Söderlund's Developer Blog"/>
                    <meta property="og:title" content={`${this.props.meta.title}`}/>
                    <meta property="og:description" content={this.props.meta.description}/>
                    <meta property="og:type" content="article"/>
                    <meta property="og:url" content={`https://nora-soderlund.se/articles/${this.props.slug}`}/>
                    <meta property="og:image" content={`https://nora-soderlund.se/api/v1/articles/${this.props.slug}/thumbnail.png`}/>
                    <meta property="og:image:secure_url" content={`https://nora-soderlund.se/api/v1/articles/${this.props.slug}/thumbnail.png`}/>

                    <meta property="og:article:published_time" content={new Date(this.props.meta.timestamp).toISOString()}/>
                    <meta property="og:article:section" content="Programming"/>
                    {(this.props.meta.tags.map((tag) => 
                        <meta key={tag} property="og:article:tag" content={tag}/>
                    ))}
                    <meta property="og:article:author" content="https://nora-soderlund.se/og/author"/>

                    <meta name="twitter:card" content="summary_large_image"/>
                    <meta name="twitter:description" content={this.props.meta.description}/>
                    <meta name="twitter:title" content={`${this.props.meta.title}`}/>
                    <meta name="twitter:image" content={`https://nora-soderlund.se/api/v1/articles/${this.props.slug}/thumbnail.png`}/>
                </Head>

                {(this.state?.data)?(
                    <Article data={this.state.data}/>
                ):(
                    <Article/>
                )}
            </Page>
        );
    };
};

export default withRouter(ArticlePage);

export async function getServerSideProps({ req, query }: any) {
    const Articles = (await import("Services/Database/Articles")).default;
    
    const forwarded = req.headers['x-forwarded-for'];
    const ip = typeof forwarded === 'string' ? forwarded.split(/, /)[0] : req.socket.remoteAddress;

    Articles.addArticleRequest(query.slug as string, ip);

    const articleMeta: ArticleMeta | null = await Articles.getArticleMetaBySlug(query.slug as string);

    if(articleMeta === null) {
        return {
            props: {
                slug: query.slug,
                meta: null
            }
        };
    }

    return {
        props: {
            slug: query.slug,
            meta: { ...articleMeta, tags: [ ...articleMeta.tags ] }
        }
    };
};
