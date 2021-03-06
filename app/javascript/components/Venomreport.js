import React from "react"
import PropTypes from "prop-types"
import Report from "./Report";
import Alert from "./svgs/Alert";

class Venomreport extends React.Component {
    constructor(props) {
        super(props);
        let auth_token = document.querySelector("meta[name='csrf-token']").content;
        this.state = {csrf: auth_token, submitted: false, active: false};
        this.post = this.post.bind(this);
        this.activate = this.activate.bind(this);
        this.deactivate = this.deactivate.bind(this);
    }


    shouldComponentUpdate(next_props, next_state) {
        // Update when submitted changes state or props change
        if ((next_props.photo_id != this.props.photo_id) || (next_state.submitted == true && this.state.submitted == false)
            || (this.state.active != next_state.active)
            || (this.state.submitted != next_state.submitted)) {
            this.state.submitted = false;
            return true
        } else {
            return false
        }
    }

    activate() {
        this.setState({active: true})
    }

    deactivate() {
        this.setState({active: false})
    }


    post(arg) {
        if (this.state.submitted != false) {
            alert('Report already submitted');
            return;
        }
        this.setState({submitted: arg});
        let auth_token = document.querySelector("meta[name='csrf-token']").content;
        this.setState({mode: 'loading'});
        fetch('/reports?type=VenomReport&photo_id=' + this.props.photo_id + '&venomous=' + arg, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRF-Token': auth_token,
                'X-Requested-With': 'XMLHttpRequest',
            },
            credentials: 'same-origin',

        }).then(res => res.json()).then((result) => {
        })
    }


    render() {

        let msg = "";
        let venomous_class = "";
        if (this.state.submitted == "venomous") {
            venomous_class = "submitted";
            nonvenmous_class = "disabled";
            unknown_class = "disabled";
            msg = "Submitted Thanks!";
        }
        let nonvenmous_class = "";
        if (this.state.submitted == "nonvenomous") {
            nonvenmous_class = "submitted";
            venomous_class = "disabled";
            unknown_class = "disabled";
            msg = "Submitted Thanks!";
        }
        let unknown_class = "";
        if (this.state.submitted == "unknown") {
            unknown_class = "submitted";
            nonvenmous_class = "disabled";
            venomous_class = "disabled";
            msg = "Submitted Thanks!";
        }

        if (this.state.active) {
            return (
                <div>
                    <div className={"center"}>
                        <button onClick={function () {
                            this.post("venomous")
                        }.bind(this)} className={['small', venomous_class].join(" ")}>Venomous
                        </button>
                        <button onClick={function () {
                            this.post("nonvenomous")
                        }.bind(this)} className={['small', nonvenmous_class].join(" ")}>Nonvenmous
                        </button>
                        <button onClick={function () {
                            this.post("unknown")
                        }.bind(this)} className={['small', unknown_class].join(" ")}>Unknown
                        </button>
                        <button onClick={this.deactivate} className={'small'}>Cancel ✗
                        </button>
                    </div>
                    {msg}
                </div>)

        } else {
            return (
                <div className="center">
                    <button onClick={this.activate} className={'small'}>+ Venomous/Not + </button>
                </div>
            );
        }
    }
}

export default Venomreport

Report.propTypes = {
    photo_id: PropTypes.number,
};
