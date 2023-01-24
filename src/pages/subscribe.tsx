import { Component, FormEvent } from "react";
import Head from "next/head";

import { ArticleResponse, ArticlesResponse } from "Types/Responses";

import Page from "Components/Page";
import Article from "Components/Article";

import API from "Services/API";
import Link from "next/link";
import { Router, withRouter } from "next/router";

type SubscribePageProps = {
    router: Router;
};

type SubscribePageState = {
    showMore: boolean;
};

export default withRouter(class SubscribePage extends Component<SubscribePageProps, SubscribePageState> {
    componentDidMount(): void {
        this.setState({
            showMore: (this.props.router.asPath.includes('#'))?(this.props.router.asPath.split('#')[1].toLowerCase() === "show-more"):(false)
        });
    };

    componentDidUpdate(prevProps: Readonly<SubscribePageProps>, prevState: Readonly<SubscribePageState>, snapshot?: any): void {
        if(this.props.router.asPath !== prevProps.router.asPath) {
            this.setState({
                showMore: (this.props.router.asPath.includes('#'))?(this.props.router.asPath.split('#')[1].toLowerCase() === "show-more"):(false)
            });
        }
    };

    async submit(event: FormEvent) {
        event.preventDefault();

        const form = event.target as HTMLFormElement;

        form.classList.add("disabled");

        const formData = new FormData(form);

        const data: any = {};

        formData.forEach((value, key) => data[key] = value);

        const response = await fetch("/api/v1/subscribe", {
            method: "POST",
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if(result.errors) {
            result.errors.forEach(([ field, error ]: [ string, string ]) => {
                const label = form.querySelector(`.form-error[for="${field}"]`);

                if(label)
                    label.innerHTML = error;
            });

            form.classList.remove("disabled");

            return;
        }

        this.props.router.push("/subscribe/thank-you");
    };
    
    render() {
        return (
            <>
                <Head>
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    <title>Subscribe - Nora Söderlund's Developer Blog</title>

                    <meta name="description" content="Welcome to my developer blog! I post articles surrondering the Google Maps Platform and other areas I'm passionate about! You can find me on LinkedIn: Nora Söderlund" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />

                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <Page>
                    <form onSubmit={this.submit.bind(this)}>
                        <h2>Subscribe</h2>

                        <p>Thank you for wanting to subscribe to my developer blog! You can unsubscribe at any time very easily by clicking on a link in the footer of my emails.</p>

                        <fieldset>

                            <div style={{ display: "flex", flex: 1, flexDirection: "column", marginBottom: "auto" }}>
                                <input name="firstname" type="text" placeholder="Firstname (optional)" autoCapitalize={"true"} autoComplete="given-name"/>

                                <label className="form-error" htmlFor="firstname"></label>
                            </div>

                            <div style={{ display: "flex", flex: 1, flexDirection: "column", marginBottom: "auto" }}>
                                <input name="email" type="email" placeholder="Email address" autoComplete="email"/>

                                <label className="form-error" htmlFor="email"></label>
                            </div>
                        </fieldset>
                        
                        <p><small>If it&apos;s detected that you have not followed one of the links in 6 months, your email address will be deleted from the newsletter list. {!this.state?.showMore && (<Link href="/subscribe#show-more">Show more.</Link>)}</small></p>

                        {this.state?.showMore && (
                            <p><small>All emails are personally addressed to you and all blog links contain a <a href="https://en.wikipedia.org/wiki/Universally_unique_identifier" target="_blank" rel="noreferrer">universally unique identifier</a> that is connected to your subscription. This is used to track when to remove your subscription automatically. <Link href="/subscribe">Show less.</Link></small></p>
                        )}

                        <fieldset>
                            <input name="inactivity" id="inactivity" type="checkbox" style={{ flex: "initial" }}/>
                            <label htmlFor="inactivity"><small>Opt out and keep sending me emails until I unsubscribe.</small></label>
                        </fieldset>

                        <fieldset style={{ paddingRight: 0 }}>
                            <button style={{ marginLeft: "auto" }}>Submit</button>
                        </fieldset>
                    </form>
                </Page>
            </>
        );
    };
});
