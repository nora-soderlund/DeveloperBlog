import { Component } from "react";
import { Link } from "react-router-dom";
import SyntaxHighlighter from "react-syntax-highlighter";
import { vs2015 } from "react-syntax-highlighter/dist/esm/styles/hljs";

import javascript from "./../Images/javascript.png";

export default class Article extends Component {
    componentDidMount() {
        window.addEventListener("resize", () => this.onResize());

        this.onResize();
    };

    onResize() {
        const elements = document.getElementsByClassName("article-code");

        for(let index = 0; index < elements.length; index++)
            elements[index].style.width = "0px";

        for(let index = 0; index < elements.length; index++) {
            const parent = elements[index].parentElement;

            const width = parent.getBoundingClientRect().width;

            elements[index].style.width = `${width}px`;
        }
    };

    render() {
        return (
            <article>
                <span className="article-date">December 21st, 2022</span>
                    
                <h2>Restricting a Google Maps API key</h2>

                <p>I often see developers not understanding the importance of managing their Google Maps API key properly.</p>
                
                <p contentEditable={true}>Think of it as a password. You wouldn't want to be throwing your password around to anybody, would you?</p>

                <p contentEditable={true}>Essentially, an API key is a password - but it's even more powerful! You don't need an user name or e-mail to identify yourself with an API key, you only need the key.</p>
                
                <p contentEditable={true}>This is why it's good practice to always keep your key private. It should be straight-forward, right? Unfortunately it can be a bit confusing for newer developers because the context matters!</p>

                <p contentEditable>If you're using the JavaScript API, Android SDK, iOS SDK, or the Embed API: then you must create a public API key and if you don't restrict it properly, you can end up with a massive bill from Google...</p>

                <div className="article-images-3" style={{ height: "200px" }}>
                    <img alt="" src="https://i.imgur.com/T2wJoYC.png"/>
                    <img alt="" src="https://i.imgur.com/fsQufhF.png"/>
                    <img alt="" src="https://i.imgur.com/5rnT0Ov.png"/>
                </div>

                <p contentEditable>edit</p>

                <div className="article-code">
                    <SyntaxHighlighter language="javascript" style={vs2015} showLineNumbers={false} lineNumberContainerStyle={false}>
{`function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
    });
}`}
                    </SyntaxHighlighter>

                    <img alt="JavaScript" src={javascript}/>
                </div>

                <p contentEditable={true}>Nec sollicitudin sem rhoncus quis. Curabitur sed blandit ex, sit amet convallis dui. Aliquam pretium suscipit erat eget malesuada. Sed vitae pretium odio, non varius lorem. Maecenas feugiat ligula urna, in fringilla diam molestie nec. Morbi ut tincidunt erat.</p>
                
                <p contentEditable={true}>Vivamus mollis turpis vel sapien sagittis porta. Praesent scelerisque nec velit id dictum. Donec facilisis libero nec felis convallis lacinia. Aenean commodo metus turpis, nec venenatis diam scelerisque vel. Sed velit nibh, dignissim ac ullamcorper sit amet, volutpat ac nisl. Quisque et tortor eu dolor ultrices sagittis non et ante.</p>
                
                <div className="article-code">
                    <SyntaxHighlighter language="html" style={vs2015} showLineNumbers={false} lineNumberContainerStyle={false}>
{`<script
      src="https://maps.googleapis.com/maps/api/js?key=API_KEY&callback=initMap&v=weekly"
      defer
    ></script>`}
                    </SyntaxHighlighter>

                    <img alt="JavaScript" src={javascript}/>
                </div>

                <p>Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus consequat, nisl ac ornare gravida, augue arcu interdum ligula, eget accumsan leo quam a sapien. Curabitur vehicula congue libero, sit amet aliquet eros sagittis a.</p>

                <Link to="/tags/google-maps">
                    <span className="article-tag">Google Maps</span>
                </Link>
            </article>
        );
    };
};
