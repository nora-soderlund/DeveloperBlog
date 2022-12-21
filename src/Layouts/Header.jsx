import { Component } from "react";
import { Link } from "react-router-dom";

export default class Header extends Component {
    render() {
        return (
            <main>
                <Link to="/">
                    <header>
                        <p>Welcome to</p>
                        <h1>Nora Söderlund's</h1>
                        <p>developer blog!</p>
                    </header>
                </Link>

                {/*<nav>
                    <NavLink activeClassName="active" to="/">Home</NavLink>
                    <NavLink activeClassName="active" to="/about-me">About me</NavLink>
                </nav>*/}

                {this.props.children}
            </main>
        );
    };
};
