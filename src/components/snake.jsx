import React, { Component } from 'react';

function getXY(loc,consts){
    return {
        X:Math.floor(loc/consts.height),
        Y:loc%consts.height,
    };
}

class Snake extends Component {
    state = {  }
    render() { 
        return ( 
            this.props.snake.map((loc)=>{
                return  (
                    <div style={{
                        position: 'absolute',
                        left: getXY(loc,this.props.consts).X*this.props.consts.unit,
                        top: getXY(loc,this.props.consts).Y*this.props.consts.unit,
                        width: 1*this.props.consts.unit,
                        height: 1*this.props.consts.unit,
                        backgroundColor: (loc==this.props.snake[0]) ? 'red' : 'green',
                    }}>

                    </div>
                )
            })
         );
    }
}
 
export default Snake;