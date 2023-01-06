import { library } from "@fortawesome/fontawesome-svg-core";
import { faThumbsUp as farThumbsUp, faThumbsDown as farThumbsDown } from "@fortawesome/free-regular-svg-icons";
import { faThumbsUp as fasThumbsUp, faThumbsDown as fasThumbsDown, faLink as fasLink, faWrench as fasWrench, faFire as fasFire, faShieldHalved as fasShieldHalved } from "@fortawesome/free-solid-svg-icons";
import { faGithub as fabGithub, faStackOverflow as fabStackOverflow, faLinkedin as fabLinkedin, faInstagram as fabInstagram, faGoogle as fabGoogle, faReact as fabReact } from "@fortawesome/free-brands-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default {
    farThumbsUp, farThumbsDown,
    fasThumbsUp, fasThumbsDown, fasLink, fasWrench, fasFire, fasShieldHalved,
    fabGithub, fabStackOverflow, fabLinkedin, fabInstagram, fabGoogle, fabReact,
};

export const IconNames = {
    "far-thumbs-up": farThumbsUp,
    "far-thumbs-down": farThumbsDown,
    "fas-thumbs-up": fasThumbsUp,
    "fas-thumbs-down": fasThumbsDown,
    "fas-link": fasLink,
    "fas-wrench": fasWrench,
    "fas-fire": fasFire,
    "fas-shield-halved": fasShieldHalved,
    "fab-github": fabGithub,
    "fab-stack-overflow": fabStackOverflow,
    "fab-linkedin": fabLinkedin,
    "fab-instagram": fabInstagram,
    "fab-google": fabGoogle,
    "fab-react": fabReact
};

export function Icon({ icon }) {
    return <FontAwesomeIcon icon={icon} height="1em"/>;
};
