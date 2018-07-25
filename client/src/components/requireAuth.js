import React, { Component } from 'react';
import { connect } from 'react-redux';

export default (ChildComponent) => {
    class ComposedComponent extends Component {

        // Our component just got rendered
        componentDidMount(){
            this.shouldNavigateAway();
        }

        // Component receive a new set of props
        componentDidUpdate(){
            this.shouldNavigateAway();
        }

        shouldNavigateAway(){
            if(!this.props.auth){
                this.props.history.push('/');
            }
        }

        render(){
            return <ChildComponent {...this.props} />            
        }

    }

    function mapStateToProps(state){
        return { auth: state.auth.authenticated };        
    }

    return connect(mapStateToProps)(ComposedComponent);

}