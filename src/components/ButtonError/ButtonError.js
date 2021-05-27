import React, { Component } from 'react';

const buttonStyles = {
    borderRadius: '10px',
    background: '#118ab2',
    padding: '8px  '
}

class ButtonError extends Component {
    state = { throwError: false };

    handleThrowError = () => {
        this.setState({ throwError: true  });
    }

    render(){
        if (this.state.throwError) {
            throw new Error('Throwing Error for catching');
        }

        return <button style={buttonStyles} onClick={this.handleThrowError}>Throw Error!</button>
  }
}

export default ButtonError;