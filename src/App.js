import React, {Component} from 'react';
import {Route,Switch,Redirect,withRouter} from 'react-router-dom'
import Layout from "./hoc/Layout/Leyout";
import Quize from "./containers/Quize/Quize";
import Auth from "./containers/Auth/Auth";
import QuizeCreator from "./containers/QuizeCreator/QuizeCreator";
import QuizeList from "./containers/QuizeList/QuizeList";
import {connect} from "react-redux";
import {autoLogin} from "./store/Actions/ActionAuth";
import Logout from "./components/Logout/Logout";
import AppTest from "./Testes/AppTest";


class App extends Component {

    // state = {
    //     isLoggedIn: false
    // };

    componentDidMount() {
        this.props.autoLogin()
    }


    render() {
        let routes = (

                <Switch>
                    <Route path='/auth'  component={Auth}/>
                    <Route path='/quize/:id'  component={Quize}/>
                    <Route path='/' exact component={QuizeList}/>
                    <Redirect to='/'/>
                </Switch>
        );

        if(this.props.isAuthenticated){
            routes = (
                <Switch>
                    <Route path='/quize-creator'  component={QuizeCreator}/>
                    <Route path='/quize/:id'  component={Quize}/>
                    <Route path='/logout'  component={Logout}/>
                    <Route path='/' exact  component={QuizeList}/>
                    <Redirect to='/'/>
                </Switch>
            );
        }
        return (
           <Layout>
               <AppTest/>
               {/*<hr/>*/}
               {/*<div>*/}
               {/*    <h3>Is logged in {this.state.isLoggedIn ? 'true': 'false'}</h3>*/}
               {/*    <button onClick={() => this.setState({isLoggedIn: true})}>login</button>*/}
               {/*</div>*/}
               {/*<hr/>*/}
               {/*<Switch>*/}
               {/*    <Route path='/' exact component={QuizeList}/>*/}
               {/*    <Route path='/auth' exact component={Auth}/>*/}
               {/*    <Route path='/quize-creator' exact component={QuizeCreator}/>*/}
               {/*    <Route path='/quize/:id' exact component={Quize}/>*/}
               {/*    /!*{this.state.isLoggedIn ? <Route path='/about' component={About}/>: null}*!/*/}
               {/*    /!*<Route path='/cars/:name' exact component={CarDetail}/>*!/*/}
               {/*    /!*<Route render={() => <h1>404</h1>}/>*!/*/}
               {/*    /!*<Redirect to={'/'}/>*!/*/}
               {/*</Switch>*/}
               { routes }
           </Layout>
        );
    }
}

function mapStateToProps(state) {
    return {
        isAuthenticated : !!state.auth.token
    }
}
function mapDispatchToProps(dispatch) {
    return {
        autoLogin: () => dispatch(autoLogin())
    }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App))
