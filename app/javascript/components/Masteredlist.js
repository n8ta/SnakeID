import React from "react"
import Chevron from "./Chevron";
import Taxon from "./Taxon";
import PropTypes from "prop-types"
import Check from "./svgs/Check";


class Masteredlist extends React.Component {

    constructor(props) {
        super(props);
        this.state = {mode: ""};
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        let mastered_list = document.getElementById('mastered_list');
        let mastered_list_ul = document.getElementById('mastered_list_ul');

        if (this.state.mode == "") {
            this.setState({mode: "is-active"});
            mastered_list.style.height = '100vh';
            setTimeout(function () {
                if (this.state.mode == "") {

                } else {
                    // mastered_list_ul.style.display = "none";
                    mastered_list.style.height = 'auto';
                    mastered_list.style.minHeight = "100vh"
                }
            }.bind(this), 700);
        } else {
            mastered_list_ul.style.display = "static";
            mastered_list.style.height = mastered_list.clientHeight.toString() + "px";
            mastered_list.style.minHeight = "unset";
            setTimeout(function () {
                mastered_list.style.height = '0px';
            }, 10);
            this.setState({mode: ""});
        }
    }

    render() {
        let mastered_items = [];
        for (let i = 0; i < this.props.mastered.length; i++) {
            let txn = this.props.mastered[i];
            mastered_items.push(
                <Taxon key={txn.id} taxon={txn} reset_func={this.props.reset_func}></Taxon>
            )
        }
        let msg = "";
        let inner_msg = <li></li>;
        if (this.props.mastered.length == 0) {
            inner_msg = <li>None yet!</li>
        }

        let active = "";
        if (this.state.mode == "is-active") {
            msg = "Hide Mastered Species";
            active = "active"
        } else {
            msg = "Show Mastered Species";
        }

        return (
            <div id={'mastered_list_wrap'}>
                <div className={'center'}>
                    <a className={'dropdown_link ' + active} onClick={this.toggle.bind(this)}>{msg} <Chevron/></a>
                </div>
                <div id={'mastered_list'} className={'drop_down_menu'}>
                    <ul id={'mastered_list_ul'}>{mastered_items}{inner_msg}</ul>

                </div>
            </div>
        );
    }
}


Masteredlist.propTypes = {
    mastered: PropTypes.array,
    reset_func: PropTypes.func,
};


export default Masteredlist