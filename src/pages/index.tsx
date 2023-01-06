import { Component } from "react";

import Head from "next/head";

// Types
import { ArticlesResponse } from "./api/v1/articles";
import { ArticleResponse } from "./api/v1/articles/[slug]";

// Components
import Page from "./../components/Page";
import Article from "./../components/Article";

// Services
import API from "../services/api";

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
                    <title>Nora Söderlund&apos;s Developer Blog</title>

                    <meta name="description" content="Generated by create next app" />
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
