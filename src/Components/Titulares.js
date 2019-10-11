import React from 'react';
import {connect} from "react-redux";
import {SUPRIMER_TITULAIR} from "../stores/actions";
import soccer from '../styles/soccer.svg';

import Draggable from 'react-draggable'; // The default

class Titulares extends React.Component  {
    constructor(props){
        super(props)
        this.state = {
            activeDrags: 0,
            deltaPosition: {
                x: 0, y: 0
            },
        };
    }

    handleDrag = (e, ui) => {
        const {x, y} = this.state.deltaPosition;
        this.setState({
            deltaPosition: {
                x: x + ui.deltaX,
                y: y + ui.deltaY,
            }
        });
    };

    onStart = () => {
        this.setState({activeDrags: ++this.state.activeDrags});
    };

    onStop = () => {
        this.setState({activeDrags: --this.state.activeDrags});
    };


    render() {
        const dragHandlers = {onStart: this.onStart, onStop: this.onStop};
        return(
            <section>
                <h2>Titulaires</h2>
                <img src={soccer} alt={"Soccer"}/>
                <div  style={{    flexDirection: 'row', display: 'flex'}}
                      className="cancha">
                    {
                        this.props.titulaires.map((j) => (
                            <article style={{display: 'flex',alignItems: 'center',flexDirection: 'column'}}
                                     key={j.id}
                                     className="titulaires">
                                <Draggable onDrag={this.handleDrag} {...dragHandlers}>
                                    <div style={{color:'white'}} className="box">
                                        <img  style={{height:100,width:100}} src={j.foto} alt={j.nombre}/>
                                        <button onClick={()=>{this.props.removeTitulair(j)}}>X</button>
                                        <p>{j.nombre}</p>
                                    </div>
                                </Draggable>
                            </article>
                        ))
                    }
                </div>

            </section>
        )
    }
}
const mapStateToProps = state => ({
    titulaires: state.titulaires
});
const mapDispatchToProps = dispatch => ({
    removeTitulair(joueur){
        dispatch({
            type: SUPRIMER_TITULAIR,
            joueur
        })
    }
});

export  default connect(mapStateToProps,mapDispatchToProps)(Titulares);