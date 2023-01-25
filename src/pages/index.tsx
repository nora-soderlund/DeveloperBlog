import { Component } from "react";

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
            <Page>
                {(this.state?.articles)?(
                    this.state?.articles.map((data) => (
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
