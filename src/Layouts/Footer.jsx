import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Component } from "react";

export default class Footer extends Component {
    render() {
        return (
            <footer>
                <div className="footer-links">
                    <a className="footer-link-linkedin" href="https://www.linkedin.com/in/nora-soderlund/" target="_blank" rel="noreferrer">
                        <FontAwesomeIcon icon={["fab", "linkedin"]}/>

                        <span className="print-only">Nora Söderlund</span>
                    </a>

                    <a className="footer-link-github" href="https://github.com/nora-soderlund" target="_blank" rel="noreferrer">
                        <FontAwesomeIcon icon={["fab", "github"]}/>

                        <span className="print-only">nora-soderlund</span>
                    </a>
                    
                    <a className="footer-link-stack-overflow" href="https://stackoverflow.com/users/20073186/nora-s%c3%b6derlund" target="_blank" rel="noreferrer">
                        <FontAwesomeIcon icon={["fab", "stack-overflow"]}/>

                        <span className="print-only">Nora Söderlund</span>
                    </a>
                </div>
            </footer>
        );
    };
};
