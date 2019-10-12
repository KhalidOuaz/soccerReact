import { createStore} from "redux"
import {AJOUTER_JOUEUR,AJOUTER_TITULAIR,AJOUTER_SUPLENT,SUPRIMER_TITULAIR,SUPRIMER_SUPLENT} from './actions';


const devtools = (process.browser && window.__REDUX_DEVTOOLS_EXTENSION__)
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : f => f;

const initialState = {
    joueurs: [
        {
            id: 1,
            nombre: "Khalid Ouazari",
            foto: "https://media.licdn.com/dms/image/C4D03AQEu8i4sslSlEA/profile-displayphoto-shrink_200_200/0?e=1575504000&v=beta&t=j1oa4-5Q0f4b3HHkL4T7Cz400m38oK8m9gQwg-yTHaU"
        },
        {
            id: 2,
            nombre: "Juan carlitos",
            foto: "https://cdn.pixabay.com/photo/2017/06/13/12/53/profile-2398782_960_720.png"

        },
        {
            id: 3,
            nombre: "Khalid Easy",
            foto: "http://www.web-soluces.net/webmaster/avatar/GetAvataaarsCom-Femme.png"
        },
        ],
    titulaires: [],
    remplacants: []
}

const reducerEntrenador = (state = initialState, action) => {
    switch (action.type) {
        case AJOUTER_JOUEUR:
            return {
                ...state,
                joueurs: state.joueurs.concat(action.payload)
            };
        case AJOUTER_TITULAIR:
            //console.log('>>>>',state.jugadores[0].id);
            //console.log('****',action.jugador.id);
            return {
                ...state,
                titulaires: state.titulaires.concat(action.joueurs),
                joueurs: state.joueurs.filter(j => j.id !== action.joueurs.id)
            };
        case AJOUTER_SUPLENT:
            //console.log('>>>>',state.jugadores[0].id);
            //console.log('****',action.jugador.id);
            return {
                ...state,
                remplacants: state.remplacants.concat(action.joueurs),
                joueurs: state.joueurs.filter(j => j.id !== action.joueurs.id)
            };
        case SUPRIMER_TITULAIR:
            //console.log('>>>>',state.jugadores[0].id);
            //console.log('****',action.jugador.id);
            return {
                ...state,
                titulaires: state.titulaires.filter(j => j.id !== action.joueur.id),
                joueurs: state.joueurs.concat(action.joueur)
            };
        case SUPRIMER_SUPLENT:
            //console.log('>>>>',state.jugadores[0].id);
            //console.log('****',action.jugador.id);
            return {
                ...state,
                remplacants: state.remplacants.filter(j => j.id !== action.joueur.id),
                joueurs: state.joueurs.concat(action.joueur)

            };
        default:
            break;
    }
    console.log(action);
    return state;
}

export default createStore(reducerEntrenador,devtools)