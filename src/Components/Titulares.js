import React from 'react';
import {connect} from "react-redux";
import {SUPRIMER_TITULAIR} from "../stores/actions";
import soccer from '../styles/soccer.svg';

class Titulares extends React.Component  {
    constructor(props){
        super(props)
    }
    render() {
        return(
            <section>
                <h2>Titulaires</h2>
                {console.log('fff',this.props)}
                <div className="cancha">
                    {
                        this.props.titulaires.map((j) => (
                            <article key={j.id} className="titulaires">
                                <div>
                                    <img  style={{height:100,width:100}} src={j.foto} alt={j.nombre}/>
                                    <button onClick={()=>{this.props.removeTitulair(j)}}>X</button>
                                </div>
                                <p>{j.nombre}</p>
                            </article>
                        ))
                    }
                    <img src={soccer} alt={"Soccer"}/>
                </div>
            </section>
        )
    }
}
const mapStateToProps = state => ({
    titulaires: state.titulaires
})
const mapDispatchToProps = dispatch => ({
    removeTitulair(joueur){
        dispatch({
            type: SUPRIMER_TITULAIR,
            joueur
        })
    }
})

export  default connect(mapStateToProps,mapDispatchToProps)(Titulares);