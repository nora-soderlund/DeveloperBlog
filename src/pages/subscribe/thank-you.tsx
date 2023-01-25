import { Component, FormEvent } from "react";
import Head from "next/head";

import { ArticleResponse, ArticlesResponse } from "Types/Responses";

import Page from "Components/Page";

import Link from "next/link";

export default class SubscribePage extends Component {
    render() {
        return (
            <Page>
                <Head>
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    <title>Thank you - Nora Söderlund's Developer Blog</title>
                </Head>

                <h2>Thank you!</h2>

                <p>Thank you for subscribing to my news letter. You can at any time unsubscribe through the link that is sent in every email.</p>

                <p><Link href="/">Return to home page.</Link></p>
            </Page>
        );
    };
};
