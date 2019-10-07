import React from 'react';
import {connect} from "react-redux";
import {AJOUTER_SUPLENT, AJOUTER_TITULAIR} from "../stores/actions";

class Jugadores extends React.Component  {
    constructor(props){
        super(props)
    }
    render() {
        return(
            <section>
                <h2>Joueurs</h2>
                {console.log('thisprops->Jugadores ',this.props)}
                <div className="contenedor-jugadores">
                    {
                        this.props.joueurs.map(j => (
                            <article key={j.id} className="jugador">
                                <img  style={{height:100,width:100}} src={j.foto} alt={j.nombre}/>
                                <h3>{j.nombre}</h3>
                                <div>
                                    <button onClick={()=> this.props.agregarTitular(j)} >Joueurs</button>
                                    <button onClick={()=> this.props.agregarSuplente(j)}>Suplente</button>
                                </div>
                            </article>
                        ))
                    }
                </div>
            </section>
        )
    }
}
const mapStateToProps = state => ({
    joueurs: state.joueurs
})
const mapDispatchToProps = dispatch => ({
    agregarTitular(joueurs) {
        dispatch({
            type: AJOUTER_TITULAIR,
            joueurs
        })
    },
    agregarSuplente(joueurs) {
        dispatch({
            type: AJOUTER_SUPLENT,
            joueurs
        })
    }
});

export  default connect(mapStateToProps,mapDispatchToProps)(Jugadores);