import { Component } from "react";
import Head from "next/head";

import { ArticleResponse, ArticlesResponse } from "Types/Responses";

import Page from "Components/Page";
import Article from "Components/Article";

import API from "Services/API";

type IndexPageProps = {
    tag: string | null
};

type IndexPageState = {
    articles: (ArticleResponse | null)[]
};

export default class IndexPage extends Component<IndexPageProps, IndexPageState> {
    async componentDidMount(): Promise<void> {
        const pagination: ArticlesResponse | null = await API.getArticleSlugsByPagination(0, this.props.tag);

        if(pagination === null)
            return;

        const articles: (ArticleResponse | null)[] = await Promise.all(pagination.articles.map(async (slug) => await API.getArticleBySlug(slug)));

        this.setState({ articles });
    };

    render() {
        return (
            <>
                <Head>
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    <title>Nora Söderlund's Developer Blog</title>

                    <meta name="author" content="Nora Söderlund"/>
                    <meta name="theme-color" content="#1A202C"/>

                    <meta name="description" content="Welcome to my developer blog! I post articles surrondering the Google Maps Platform and other areas I'm passionate about! You can find me on LinkedIn: Nora Söderlund" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />

                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <Page>
                    {(this.state?.articles)?(
                        <>
                            {this.state?.articles.map((data) => (
                                <Article key={data?.article.slug} data={data} compact={true}/>
                            ))}
                        </>
                    ):(
                        <Article/>
                    )}
                </Page>
            </>
        );
    };
};
