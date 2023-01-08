import { Component } from "react";
import Head from "next/head";

export default class OpenGraphAuthorPage extends Component {
    render() {
        return (
            <>
                <Head>
                    <meta property="og:profile:first_name" content="Nora"/>
                    <meta property="og:profile:last_name" content="Söderlund"/>
                    <meta property="og:profile:gender" content="female"/>
                </Head>
            </>
        );
    };
};
