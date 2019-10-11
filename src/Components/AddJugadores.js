import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

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
}));

export default function AddJugadores() {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const [values, setValues] = React.useState({
        nom: '',
        prenom: '',
        lien: '',
        currency: 'EUR',
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

    return (
        <div>

            <Button variant="contained" color="primary" onClick={handleOpen} className={classes.button}>
                Ajouter un joueur
            </Button>
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={open}
                onClose={handleClose}
            >
                <div style={modalStyle} className={classes.paper}>

                    <form className={classes.container} noValidate autoComplete="off">
                        <p style={{color:'black'}}>AJOUTER VOTRE JOUEUR</p>
                        <TextField
                            id="outlined-name"
                            label="Nom"
                            className={classes.textField}
                            value={values.nom}
                            onChange={handleChange('nom')}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            id="outlined-name"
                            label="Prenom"
                            className={classes.textField}
                            value={values.prenom}
                            onChange={handleChange('prenom')}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            id="outlined-name"
                            label="Lien de l'image(Avatar)"
                            className={classes.textField}
                            value={values.lien}
                            onChange={handleChange('lien')}
                            margin="normal"
                            variant="outlined"
                        />

                    </form>

                </div>
            </Modal>
        </div>
    );
}