import React, { Component } from 'react';
import requireAuth from './requireAuth';

class Feature extends Component {
    render() {
        return (
            <div>
                this is the Feature !
            </div>
        );
    }
}

export default requireAuth(Feature);