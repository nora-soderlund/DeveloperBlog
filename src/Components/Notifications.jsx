import { Component } from "react";

export default class Notifications extends Component {
    count = 0;

    notificationListener = (event) => this.notification(event);
    
    componentDidMount() {
        window.addEventListener("notification", this.notificationListener);
    };

    componentWillUnmount() {
        window.removeEventListener("listener", this.notificationListener);
    };

    notification(event) {
        const notifications = this.state?.notifications ?? [];

        this.count++;

        const notification = { id: this.count, message: event.detail }
        notifications.push(notification);

        this.setState({ notifications });

        // TODO: add a fade out animation 
        setTimeout(() => {
            if(!this.state || !this.state.notifications)
                return;

            if(this.state.notifications.find((_notification) => _notification.id === notification.id))
                this.setState({ notifications: this.state.notifications.filter((_notification) => _notification.id != notification.id) });
        }, 2000);
    };

    render() {
        return (
            <div className="notifications">
                {this.state?.notifications.map((notification) => (
                    <div key={notification.id} className="notification" onClick={() => this.setState({ notifications: this.state.notifications.filter((_notification) => _notification.id != notification.id) })}>{notification.message}</div>
                ))}
            </div>
        );
    };
};
