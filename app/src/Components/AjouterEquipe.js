import React from 'react';
import { makeStyles,useTheme } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import { useSelector,useDispatch } from 'react-redux'
import {AJOUTER_JOUEUR} from "../stores/actions";
import MobileStepper from '@material-ui/core/MobileStepper';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

function rand() {
    return Math.round(Math.random() * 20) - 10;
}


function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}
const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: 400,
        flexGrow: 1,
    },
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    dense: {
        marginTop: theme.spacing(2),
    },
    menu: {
        width: 200,
    },
    button: {
        display: 'flex',
        margin: 'auto'
    },
}));


function AjouterEquipe() {
    const classes = useStyles();
    const theme = useTheme();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const dispatch = useDispatch();
    const [activeStep, setActiveStep] = React.useState(0);
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const [values, setValues] = React.useState({
        id: '',
        nombre: '',
        foto: '',
    });

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const handleAddJoueur = (e,b) => {
        values.id = new Date(); // ID
        const data = [];
        data.push(values);



        console.log(data);
        dispatch({ type: AJOUTER_JOUEUR, payload: data});


        e.preventDefault();
    }

    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    return (
        <div>

            <Button variant="contained" color="primary" onClick={handleOpen} className={classes.button}>
                Ajouter les équipes
            </Button>
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={open}
                onClose={handleClose}
            >
                <div style={modalStyle} className={classes.paper}>

                    <MobileStepper
                        variant="progress"
                        steps={2}
                        position="static"
                        activeStep={activeStep}
                        className={classes.root}
                        backButton={
                            <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                                Equipe 1
                            </Button>
                        }
                        nextButton={
                            <Button size="small" onClick={handleNext} disabled={activeStep === 1}>
                                Equipe 2
                                {classes.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                            </Button>
                        }

                    />


                    <div>
                        {activeStep === 0 ?
                            <div>

                                <TextField
                                    id="outlined-full-width"
                                    fullWidth
                                    label="Equipe 1"
                                    className={classes.textField}
                                    type="text"
                                    autoComplete="current-password"
                                    margin="normal"
                                    variant="outlined"
                                />
                                <Button style={{float: 'right'}} size="small" onClick={handleNext} disabled={activeStep === 1}>
                                    Suivant
                                    {classes.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                                </Button>

                            </div>:null}

                    </div>

                    <div>
                    {activeStep === 1 ?
                        <div>

                            <TextField
                                id="outlined-full-width"
                                fullWidth
                                label="Equipe 1"
                                className={classes.textField}
                                type="text"
                                autoComplete="current-password"
                                margin="normal"
                                variant="outlined"
                            />
                            <Button  variant="contained" color="primary" style={{float: 'left'}} size="small" onClick={handleNext} disabled={activeStep === 0}>
                                Valider
                                {classes.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                            </Button>
                        </div>:null}
                    </div>


                </div>
            </Modal>
        </div>
    );
}

export default AjouterEquipe;