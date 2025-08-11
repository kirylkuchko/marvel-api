import { Component } from "react";

export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
        }
    }

    componentDidCatch(error, errorInfo) {
        console.log(error, errorInfo);
        this.setState({
            error: true
        });
    }

    render() {
        const errorMessage = this.props.errorMessage || 'Something went wrong'

        if (this.state.error) {
            return <h2>{errorMessage}</h2>
        }

        return this.props.children;
    }
}