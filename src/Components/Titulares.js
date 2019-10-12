import React from 'react';
import {connect} from "react-redux";
import {SUPRIMER_TITULAIR} from "../stores/actions";
import soccer from '../styles/soccer.svg';
import Box from '@material-ui/core/Box';
import Draggable from 'react-draggable'; // The default
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';


class Titulares extends React.Component  {
    constructor(props){
        super(props)
        this.state = {
            activeDrags: 0,
            deltaPosition: {},
        };
    }

    handleDrag = (e, ui,id) => {
        const keyX = 'x'+id;
        const keyY = 'y'+id;
        if(!this.state.deltaPosition[keyX]){
            this.setState(previousState => ({
                deltaPosition: {
                    ...previousState.deltaPosition,
                    [keyX]:0,
                    [keyY]:0
                }
            }));
        }
        this.setState(previousState => ({
            deltaPosition: {
                ...previousState.deltaPosition,
                [keyX]: this.state.deltaPosition[keyX] + ui.deltaX,
                [keyY]: this.state.deltaPosition[keyY] + ui.deltaY,
            }
        }));
    };
    componentDidUpdate(){
        console.log('state',this.state)
    }

    onStart = () => {

        this.setState({activeDrags: ++this.state.activeDrags});
    };

    onStop = () => {
        this.setState({activeDrags: --this.state.activeDrags});
    };


    render() {
        return(
            <section>
                <h2>Titulaires</h2>
                <img style={{width:'100%'}} src={soccer} alt={"Soccer"}/>

                <div style={{display:'flex'}}
                      className="cancha">
                    {
                        this.props.titulaires.map((j) => (

                            <article
                                     key={j.id}
                                     className="titulaires">

                                <Draggable

                                    //axis="x"
                                    //handle=".handle"
                                    defaultPosition={{x:this.state.deltaPosition['x'+j.id],y:this.state.deltaPosition['y'+j.id]}}
                                    position={{x:this.state.deltaPosition['x'+j.id],y:this.state.deltaPosition['y'+j.id]}}
                                    grid={[20, 20]}
                                    scale={1}
                                    onDrag={(e,ui)=>this.handleDrag(e,ui,j.id)} >
                                    <Box  m={1}>
                                        <p style={{color:'red'}}> fkefkfl{j.nombre}  </p>

                                        <Badge
                                            overlap="circle"
                                            anchorOrigin={{vertical: 'bottom', horizontal: 'right',}}
                                            badgeContent={
                                                <HighlightOffIcon
                                                    onClick={()=>
                                                        this.props.removeTitulair(j)}
                                                    style={{color:'red'}}
                                                />
                                            }>
                                            <Avatar src={j.foto} alt={j.nombre} />
                                        </Badge>
                                    </Box>
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

export default connect(mapStateToProps,mapDispatchToProps)(Titulares);