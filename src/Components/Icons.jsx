import { library } from "@fortawesome/fontawesome-svg-core";
import { faThumbsUp as farThumbsUp, faThumbsDown as farThumbsDown } from "@fortawesome/free-regular-svg-icons";
import { faThumbsUp as fasThumbsUp, faThumbsDown as fasThumbsDown, faLink as fasLink } from "@fortawesome/free-solid-svg-icons";
import { faGithub as fabGithub, faStackOverflow as fabStackOverflow, faLinkedin as fabLinkedin, faInstagram as fabInstagram, faGoogle as fabGoogle } from "@fortawesome/free-brands-svg-icons";

library.add(farThumbsUp, farThumbsDown);
library.add(fasThumbsUp, fasThumbsDown, fasLink);
library.add(fabGithub, fabStackOverflow, fabLinkedin, fabInstagram, fabGoogle);
