import { library } from "@fortawesome/fontawesome-svg-core";
import { faThumbsUp as farThumbsUp, faThumbsDown as farThumbsDown } from "@fortawesome/free-regular-svg-icons";
import { faThumbsUp as fasThumbsUp, faThumbsDown as fasThumbsDown, faLink as fasLink, faWrench as fasWrench, faFire as fasFire } from "@fortawesome/free-solid-svg-icons";
import { faGithub as fabGithub, faStackOverflow as fabStackOverflow, faLinkedin as fabLinkedin, faInstagram as fabInstagram, faGoogle as fabGoogle, faReact as fabReact } from "@fortawesome/free-brands-svg-icons";

library.add(farThumbsUp, farThumbsDown);
library.add(fasThumbsUp, fasThumbsDown, fasLink, fasWrench, fasFire);
library.add(fabGithub, fabStackOverflow, fabLinkedin, fabInstagram, fabGoogle, fabReact);
