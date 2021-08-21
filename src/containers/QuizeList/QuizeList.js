import React, {Component} from 'react';
import {NavLink} from 'react-router-dom'
import classes from './QuizeList.css';
// import Axios from "../../axios/axios-db";
import Loader from "../../components/UI/Loader/Loader";
import {connect} from 'react-redux';
import {fetchQuizes} from "../../store/Actions/ActionQuize";

class QuizeList extends Component {
    // state = {
    //     quizes: [],
    //     loading: true
    // };
    //
    // renderQuizes() {
    //     return this.state.quizes.map((quize) => {
    //         return (
    //             <li
    //                 key={quize.id}
    //             >
    //                 <NavLink to={'/quize/' + quize.id}>{quize.name}</NavLink>
    //             </li>
    //         )
    //     })
    // }

    //Redux
    renderQuizes() {
        return this.props.quizes.map((quize) => {
            return (
                <li
                    key={quize.id}
                >
                    <NavLink to={'/quize/' + quize.id}>{quize.name}</NavLink>
                </li>
            )
        })
    }

    // async componentDidMount() {
    //     try {
    //         const response = await Axios.get('/quizes.json');
    //         const quizes = [];
    //         Object.keys(response.data).forEach((key, index) => {
    //             quizes.push({
    //                 id: key,
    //                 name: `Test # ${index + 1}`
    //             })
    //         });
    //         this.setState({
    //             quizes,
    //             loading: false
    //         });
    //         // console.log(response.data)
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }

    componentDidMount() {
        this.props.fetchQuizes()
    }

    render() {
        return (
            <div className={classes.QuizeList}>
                <div className={classes.QuizeWrapper}>
                    <h1>Список тестов</h1>
                    {
                        // this.state.loading
                        this.props.loading && this.props.quizes.length !== 0
                            ? <Loader/>
                            : <ul>
                                {this.renderQuizes()}
                            </ul>
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        quizes: state.quize.quizes,
        loading: state.quize.loading,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizes: () => dispatch(fetchQuizes())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizeList);
