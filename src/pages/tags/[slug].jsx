import { withRouter } from "next/router";
import { Component } from "react";

import IndexPage from "../index";

class TagsSlugPage extends Component {
    static async getInitialProps({ query }) {
        return { slug: query.slug };
    };

    render() {
        return (<IndexPage tag={this.props.slug}/>);
    };
};

export default withRouter(TagsSlugPage);
