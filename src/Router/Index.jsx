import { Component } from "react";
import { Link } from "react-router-dom";

export default class Index extends Component {
    render() {
        return (
            <article>
                <span className="article-date">December 21st, 2022</span>
                    
                <Link to="/articles/restricting-a-google-maps-api">
                    <h2>Restricting a Google Maps API key</h2>

                    <p>I often see developers not understanding the importance of managing their Google Maps API key properly.</p>
                    <p>Read more on how to properly manage your Google Maps API keys.</p>
                </Link>

                <Link to="/tags/google-maps">
                    <span className="article-tag">Google Maps</span>
                </Link>
            </article>
        );
    };
};
