import { Component } from "react";

import Link from "next/link";

import { Roboto } from "@next/font/google";

import Icons, { Icon } from "../components/Icon";

const roboto = Roboto({
    style: [ "normal", "italic" ],
    weight: [ "400", "500" ],
    subsets: [ "latin" ],
    display: "swap"
});

export default class Page extends Component {
    render() {
        return (
            <main className={roboto.className}>
                <header>
                    <Link href="/">
                        <p>Welcome to</p>
                        <h1>Nora Söderlund&apos;s</h1>
                        <p>developer blog!</p>
                    </Link>
                </header>

                <section>
                    {this.props.children}
                </section>

                <footer>
                    <div className="footer-links">
                        <a className="footer-link-linkedin" href="https://www.linkedin.com/in/nora-soderlund/" target="_blank" rel="noreferrer">
                            <Icon icon={Icons.fabLinkedin}/>

                            <span className="print-only">Nora Söderlund</span>
                        </a>

                        <a className="footer-link-github" href="https://github.com/nora-soderlund" target="_blank" rel="noreferrer">
                            <Icon icon={Icons.fabGithub}/>

                            <span className="print-only">nora-soderlund</span>
                        </a>
                        
                        <a className="footer-link-stack-overflow" href="https://stackoverflow.com/users/20073186/nora-s%c3%b6derlund" target="_blank" rel="noreferrer">
                            <Icon icon={Icons.fabStackOverflow}/>

                            <span className="print-only">Nora Söderlund</span>
                        </a>
                    </div>
                </footer>
            </main>
        );
    };
};