import React, {useEffect, useState} from 'react'
import {
    Typography,
    Paper,
    Button,
    AppBar,
    Toolbar,
    FormControl,
    InputLabel,
    Input,
    InputAdornment,
    Grid
} from '@material-ui/core'
import withStyles from '@material-ui/core/styles/withStyles'
import {withRouter} from 'react-router-dom'

import {deleteToken, createTransaction, getAllTransactions} from '../../common/api';
import InputAutoComplete from '../../Components/InputAutoComplete';

const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: '100%',
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paperText: {
        textAlign: 'center',
        color: theme.palette.text.secondary,
        marginTop: '30px',
    },
    paper: {
        marginTop: '65px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
    toolbar: {
        display: 'flex',
    },
    title: {
        color: 'white',
        paddingRight: '30px',
    },
    titleBalance: {
        color: 'red',
        paddingRight: '30px',
    },
    button: {
        marginLeft: 'auto',
    }
});

const Dashboard = (props) => {
    const {classes, getInfo, userInfo, checkError} = props;
    const [activeName, setActiveName] = useState('');
    const [amount, setAmount] = useState(0);
    const [errorAmount, setErrorAmount] = useState(false);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        setButtonState();
    }, [amount, activeName]);

    useEffect ( () => {
        getAllTransactions().then((response) => setTransactions(response.trans_token));
    }, []);

    const logOut = () => {
        deleteToken();
        props.setIsAuth(false);
    };

    const onChangeAmount = (e) => {
        setAmount(e.target.value);
        const stateError = e.target.value > userInfo.balance;
        setErrorAmount(stateError);
    };
    const onSubmit = async () => {

        const response = await createTransaction({name: activeName, amount});
        if (response.errorState) {
            checkError(response.error);
        } else {
            await getInfo();
            const response = await getAllTransactions();
            setTransactions(response.trans_token);
            setAmount(0);
        }
    };
    const onRetry = async (data, isRetry) => {
        const response = await createTransaction({name: data.username, amount: isRetry ? Math.abs(data.amount): data.amount});
        if (response.errorState) {
            checkError(response.error);
        } else {
            await getInfo();
            const response = await getAllTransactions();
            setTransactions(response.trans_token);
            setAmount(0);
        }
    };
    const setButtonState = () => {
        if (!amount) {
            return true
        }
        if (errorAmount) {
            return true
        }
        return activeName === '';
    };

    return (
        <main className={classes.main}>
            <AppBar position="fixed">
                <div>
                    <AppBar position="static">
                        <Toolbar className={classes.toolbar}>
                            <Typography variant="h6" className={classes.title}>{userInfo.name}</Typography>
                            <Typography className={classes.title} variant="h6">email: {userInfo.email}</Typography>
                            <Typography className={classes.title} variant="h6" noWrap>
                                balance:
                            </Typography>
                            <Typography className={classes.titleBalance} variant="h5" noWrap>
                                {userInfo.balance}
                            </Typography>
                            <Button className={classes.button} onClick={logOut}>log Out</Button>
                        </Toolbar>
                    </AppBar>
                </div>
            </AppBar>
            <Paper className={classes.paper}>
                <InputAutoComplete checkError={checkError} setActiveName={setActiveName}/>
                <FormControl error={errorAmount} fullWidth>
                    <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
                    <Input
                        id="standard-adornment-amount"
                        value={amount}
                        required
                        type="number"
                        onChange={onChangeAmount}
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    />
                </FormControl>
                <Button
                    type="submit"
                    fullWidth
                    disabled={setButtonState()}
                    variant="contained"
                    onClick={onSubmit}
                    color="primary"
                    className={classes.submit}>
                    Amount now
                </Button>
                <Grid container spacing={1}>
                    {transactions.map(transaction => (
                        <Grid key={transaction.id} item xs={12}>
                            <Paper className={classes.paperText}>Date/Time of the
                                transaction: {transaction.date} Correspondent
                                Name: {transaction.username} Transaction amount, (Debit/Credit for PW
                                transferred): {transaction.amount} Resulting balance: {transaction.balance}
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    onClick={() => onRetry(transaction, true)}
                                    color="primary"
                                    >
                                    retry
                                </Button>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    onClick={() => onRetry(transaction)}
                                    color="secondary"
                                    >
                                    return this amount
                                </Button>

                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Paper>
        </main>
    )
};

export default withRouter(withStyles(styles)(Dashboard))
