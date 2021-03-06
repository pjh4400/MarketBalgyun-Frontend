import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        minHeight: '100%',
        background: 'linear-gradient(180deg, #C3E47C 0%, #4EAE4E 100%)',
        backgroundSize: 'cover',
        flexDirection: 'column',
        alignItems: 'center',
    },
    paper: {
        background: '#FFFFFF',
        margin: theme.spacing(10),
        padding: theme.spacing(3),
        width: '80%',
        flexDirection: 'column',
        alignItems: 'center',
    },
    header: {
        margin: theme.spacing(3, 0, 2),
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    checkbox: {
        color: '#4EAE4E',
    },
    menuitem: {
        width: 'fit-content',
    },
    submit: {
        background: '#DCF5D4',
        width: '100%',
        margin: theme.spacing(3, 0, 2),
    },
    next: {
        background: '#4EAE4E',
        color: 'white',
        margin: theme.spacing(1),
    },
    item: {
        margin: theme.spacing(2),
        padding: theme.spacing(3),
    },
    button: {
        '&:hover': {
            background: '#FFFFFF',
            color: '#4EAE4E',
        },
    },
    avatar: {
        padding: theme.spacing(1),
        margin: theme.spacing(1),
        alignItems: 'center',
        display: 'inline',
    },
    card: {
        width: "100%",
    },
    cardDetails: {
        flex: 1,
    },
    right: {
        alignItems: 'flex-end',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    inlineComponents: {
        display: 'inline-flex',
        padding: 10,
    }
}));

export default useStyles;