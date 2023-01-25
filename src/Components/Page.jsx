import { Component } from "react";
import Link from "next/link";
import { Fira_Code, Roboto } from "@next/font/google";

import Icons, { Icon } from "./Icons";
import Notifications from "./Notifications";
import Head from "next/head";

const roboto = Roboto({
    style: [ "normal", "italic" ],
    weight: [ "400", "500" ],
    subsets: [ "latin" ],
    display: "swap"
});

const firaCode = Fira_Code({
    style: [ "normal" ],
    weight: [ "400" ],
    subsets: [ "latin" ],
    display: "swap",
    variable: "--fira-code"
});

export default class Page extends Component {
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

                <main className={`${roboto.className} ${firaCode.variable}`} style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                    <header>
                        <Link href="/">
                            <svg viewBox="0 0 240 80" xmlns="http://www.w3.org/2000/svg">
                                <text x="6" y="14" class="small" alignmentBaseline="hanging">Welcome to</text>

                                {/*eslint-disable-next-line react/no-unescaped-entities*/}
                                <text x="120" y="40" class="large" alignmentBaseline="central" textAnchor="middle">Nora Söderlund's</text>
                                
                                <text x="234" y="66" class="small" alignmentBaseline="ideographic" textAnchor="end">developer blog!</text>
                            </svg>
                        </Link>
                    </header>

                    <section style={{ flex: 1 }}>
                        {this.props.children}
                    </section>

                    <footer>
                        <Link href="/subscribe">Subscribe to my newsletters!</Link>

                        <div className="footer-links">
                            <a className="footer-link-stack-overflow" href="https://stackoverflow.com/users/20073186/nora-s%c3%b6derlund" target="_blank" rel="noreferrer">
                                <Icon icon={Icons.fabStackOverflow}/>

                                <span className="print-only">Nora Söderlund</span>
                            </a>

                            <a className="footer-link-linkedin" href="https://www.linkedin.com/in/nora-soderlund/" target="_blank" rel="noreferrer">
                                <Icon icon={Icons.fabLinkedin}/>

                                <span className="print-only">Nora Söderlund</span>
                            </a>

                            <a className="footer-link-github" href="https://github.com/nora-soderlund" target="_blank" rel="noreferrer">
                                <Icon icon={Icons.fabGithub}/>

                                <span className="print-only">nora-soderlund</span>
                            </a>
                        </div>
                    </footer>

                    <Notifications/>
                </main>
            </>
        );
    };
};
