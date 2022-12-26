import { Component } from "react";
import { Link } from "react-router-dom";

export default class Header extends Component {
    render() {
        return (
            <header>
                <Link to="/">
                    <p>Welcome to</p>
                    <h1>Nora Söderlund's</h1>
                    <p>developer blog!</p>
                </Link>

                {/*<nav>
                    <NavLink activeClassName="active" to="/">Home</NavLink>
                    <NavLink activeClassName="active" to="/about-me">About me</NavLink>
                </nav>*/}
            </header>
        );
    };
};
