<article>
                <span className="article-date">{month} {Article.getOrdinalNumber(date.getDate())}, {date.getFullYear()}</span>
                    
                <h2>Restricting a Google Maps API key</h2>

                <p>I often see developers not understanding the importance of managing their Google Maps API key properly.</p>
                
                <p contentEditable={true}>Think of it as a password. You wouldn't want to be throwing your password around to anybody, would you?</p>

                <p contentEditable={true}>Essentially, an API key is a password - but it's even more powerful! You don't need an user name or e-mail to identify yourself with an API key, you only need the key.</p>
                
                <p contentEditable={true}>This is why it's good practice to always keep your key private. It should be straight-forward, right? Unfortunately it can be a bit confusing for newer developers because the context matters!</p>

                <p contentEditable>If you're using the JavaScript API, Android SDK, iOS SDK, or the Embed API: then you must create a public API key and if you don't restrict it properly, you can end up with a massive bill from Google...</p>

                <div className="article-image">
                    <img alt="" src="https://i.imgur.com/rkfCpWA.png"/>

                    <p>
                        <span className="article-image-alt">Yikes! This person got a €10,000 bill!</span>
                        <span className="article-image-source">Source: <a href="https://www.reddit.com/r/googlecloud/comments/lagnic/comment/hs2lgau/?utm_source=share&utm_medium=web2x&context=3">reddit.com</a></span>
                    </p>
                </div>

                <p contentEditable>With that said, you should always restrict your API keys properly, whether it's public or not. The Google Maps documentation has great coverage on restricting keys but the Google Cloud console can be a bit frightening to use, so I will do my best to guide you through the most common case uses!</p>

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