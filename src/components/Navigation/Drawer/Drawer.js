import React, {Component} from 'react';
import classes from './Drawer.css';
import BackDrop from "../../UI/BackDrop/BackDrop";
import {NavLink} from 'react-router-dom'

class Drawer extends Component {
    clickHandler = () => {
            this.props.onClose()
    };
    renderLinks(links) {
        return links.map((link, index) => {
            return (
                <li key={index}>
                    <NavLink
                        to={link.to}
                        activeClassName={classes.active}
                        exact={link.exact}
                        onClick={this.clickHandler}
                    >
                        {link.label}
                    </NavLink>
                </li>
            )
        })
    }

    render() {
        const cls = [
            classes.Drawer
        ];
        if (!this.props.isOpen) {
            cls.push(classes.close)
        }

        let links = [
            {to: '/', label: 'Список', exact: true},
        ];
        console.log('AUth', this.props.isAuthenticated)
        if(this.props.isAuthenticated){
            links.push({to: '/quize-creator', label: 'Создать тест', exact: false});
            links.push({to: '/logout', label: 'Выйти', exact: false});
        } else {
            links.push({to: '/auth', label: 'Авторизация', exact: false});
        }
        return (
            <React.Fragment>
                <nav className={cls.join(' ')}>
                    <ul>
                        {this.renderLinks(links)}
                    </ul>
                </nav>
                {this.props.isOpen ? <BackDrop onClick={this.props.onClose}/> : null}
            </React.Fragment>
        );
    }
}

export default Drawer;
