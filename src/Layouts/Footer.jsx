import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Component } from "react";

export default class Footer extends Component {
    render() {
        return (
            <footer>
                <div className="footer-links">
                    <a class="footer-link-linkedin" href="https://www.linkedin.com/in/nora-soderlund/" target="_blank" rel="noreferrer">
                        <FontAwesomeIcon icon={["fab", "linkedin"]}/>
                    </a>

                    <a class="footer-link-github" href="https://github.com/nora-soderlund" target="_blank" rel="noreferrer">
                        <FontAwesomeIcon icon={["fab", "github"]}/>
                    </a>
                    
                    <a class="footer-link-stack-overflow" href="https://stackoverflow.com/users/20073186/nora-s%c3%b6derlund" target="_blank" rel="noreferrer">
                        <FontAwesomeIcon icon={["fab", "stack-overflow"]}/>
                    </a>
                </div>
            </footer>
        );
    };
};
