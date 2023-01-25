import API from "Services/API";

const replacements = [
    {
        expression: "API_KEY",
        replacement: () => `<span class="tag-api_key" title="This is your Google Maps API key.">API_KEY</span>`
    }
];

export default class SyntaxHighlight {
    static name = "syntax-highlight";
    
    static execute = () => {
        return class SyntaxHighlight extends HTMLElement {
            async connectedCallback() {
                if(this.hasAttribute("inline"))
                    this.classList.add("inline");

                if(this.hasAttribute("font"))
                    this.style.fontFamily = this.getAttribute("font");

                if(this.hasAttribute("code")) {
                    if(this.hasAttribute("lines"))
                        this.innerHTML = `<div style="height: ${this.getAttribute("lines")}em"></div>`;

                    const code = await API.getCodeById(parseInt(this.getAttribute("code")));

                    this.innerHTML = code.html;

                    this.classList.remove("shimmer");
                }
                else if(this.innerHTML.length != 0) {
                    this.innerHTML = this.innerHTML.replaceAll('<', '&lt;').replaceAll('>', '&gt;');

                    let body = this.textContent.replaceAll(/^(?:[\t ]*(?:\r?\n|\r))+/gm, "").split('\n');


                    let index = 0;

                    while(body[0][index] == ' ' && index < body[0].length)
                        index++;

                    if(index > 0)
                        body = body.map((line) => line.substring(index, line.length));

                    this.innerHTML = `<pre><code></code></pre>`;
                    this.firstChild.firstChild.textContent = `${body.join('\n')}`;
                    
                    const code = await API.getCodeByBody(body.join('\n'), this.getAttribute("language"));

                    replacements.forEach((item) => {
                        code.html = code.html.replaceAll(item.expression, item.replacement.bind(this));
                    });

                    this.innerHTML = code.html;
                }
            };
        }
    };
};
