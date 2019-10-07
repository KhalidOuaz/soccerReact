import React from 'react';
import {connect} from "react-redux";
import {SUPRIMER_SUPLENT} from "../stores/actions";

class Suplentes extends React.Component  {
    constructor(props){
        super(props)
    }
    render() {
        return(
            <section>
                <h2>Suppléant</h2>
                <div className="cancha">
                    {
                        this.props.suplentes.map(j => (
                            <article key={j.id} className="titurales">
                                <div>
                                    <img  style={{height:100,width:100}} src={j.foto} alt={j.nombre}/>
                                    <button onClick={()=>{this.props.quitarSuplente(j)}} >X</button>
                                </div>
                                <p>{j.nombre}</p>
                            </article>
                        ))
                    }
                </div>
            </section>
        )
    }
}
const mapStateToProps = state => ({
    suplentes: state.suplentes
})
const mapDispatchToProps = dispatch => ({
    quitarSuplente(joueur){
        dispatch({
            type: SUPRIMER_SUPLENT,
            joueur
        })
    }
});

export  default connect(mapStateToProps,mapDispatchToProps)(Suplentes);