import API from "../services/api";

export default class SyntaxHighlight {
    static name = "syntax-highlight";
    
    static execute = () => {
        return class SyntaxHighlight extends HTMLElement {
            constructor() {
                super();

                this.test = this.innerHTML;
        
                //this.attachShadow({ mode: "open" });

                //this.pre = document.createElement("pre");
                //pre.innerHTML = this.innerHTML.replace(/[\u00A0-\u9999<>\&]/g, (i) => '&#' + i.charCodeAt(0) + ';');

                //this.shadowRoot.append(this.pre);
            };

            async connectedCallback() {
                this.classList.add("shimmer");

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
                    const body = this.test;

                    this.innerHTML = `<div style="height: ${this.getAttribute("lines") ?? body.split('\n').length}em"></div>`;
                    
                    const code = await API.getCodeByBody(body, this.getAttribute("language"));

                    this.innerHTML = code.html;

                    this.classList.remove("shimmer");
                }
            };
        }
    };
};
