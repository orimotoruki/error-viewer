import React, { Component } from 'react';
import './App.css';

import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import IconButton from "material-ui/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Delete from '@material-ui/icons/Delete';

import Drawer from 'material-ui/Drawer';
import List from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { ListItem, ListItemText } from 'material-ui/List';

import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';

import { CookiesProvider, Cookies } from 'react-cookie';

let id = 0;
function createData(word, color) {
  id += 1;
  return { id, word, color };
}


class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDrawerOpen: false,
      isDialogOpen: false,
      data: {
               word: '',
               color: ''
             },
      all_data: [],
      display_data: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.dialogConfirm = this.dialogConfirm.bind(this);
    this.deleteCookie = this.deleteCookie.bind(this);


    //set default
    const cookies = new Cookies();
    var words = cookies.get("word");
    if (words === undefined){
      words = {}
    }
    this.state.all_data = words;
    var display_data = []
    for (var key in words){
      display_data.push(createData(key, words[key]));
    }
    this.state.display_data = display_data;
  }

  toggleDrawer = (open) => () => {
   this.setState({
     isDrawerOpen: open
   });
  };

  toggleDialog = (open) => () => {
   this.setState({
     isDialogOpen: open
   });
  };

  dialogConfirm(event){
    // close the dialog
    this.setState({
      isDialogOpen: false
    });
    // handler of super class
    this.props.handler();
  }

  handleChange(event) {
    // ネストされたオブジェクトのdataまでアクセスしておく
    var data = this.state.data;

    // eventが発火したname属性名ごとに値を処理
    switch (event.target.name) {
        case 'word':
            data.word = event.target.value;
            break;
        case 'color':
            data.color = event.target.value;
            break;
        default:
          break;
    }

    // 状態を更新
    this.setState({
        data: data
    });
  };

  handleSubmit(event) {
    event.preventDefault();

    // add cookie
    var words = this.state.all_data;
    words[this.state.data.word] = this.state.data.color;
    this.setState({all_data: words});
    var display_data = []
    for (var key in words){
      display_data.push(createData(key, words[key]));
    }
    this.setState({display_data: display_data});
    const cookies = new Cookies();
    cookies.set("word",
                words,
                { path: '/', maxAge: 2147483647 });
  };

  deleteCookie = function(word){
    this.props.handler();

    //remove Cookie
    var words = this.state.all_data;

    delete words[word];
    this.setState({all_data: words});
    var display_data = []
    for (var key in words){
      display_data.push(createData(key, words[key]));
    }
    this.setState({display_data: display_data});
    const cookies = new Cookies();
    cookies.set("word",
                words,
                { path: '/', maxAge: 2147483647 });

    // handler of super class
    this.props.handler();
  }

  render() {
    return (
      <CookiesProvider>
        <div className="Drawer">
          <AppBar position="static">
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="Menu"
              >
                <MenuIcon onClick={this.toggleDrawer(true)} />
              </IconButton>
              <Typography variant="title" color="inherit">
                Hello World
              </Typography>
            </Toolbar>
          </AppBar>

          <Drawer
            open={this.state.isDrawerOpen}
            onClose={this.toggleDrawer(false)}>
            <div
              tabIndex={0}
              role="button"
            >
            <div>
              <List><ListItem button>
                <ListItemText primary="Main Page"
                  onClick={this.toggleDrawer(false)}
                  onKeyDown={this.toggleDrawer(false)}/>
              </ListItem></List>
              <Divider />
              <List><ListItem button>
                <ListItemText primary="Settings"
                  onClick={this.toggleDialog(true)}
                  onKeyDown={this.toggleDialog(true)}/>
              </ListItem></List>
            </div>
          </div>
        </Drawer>

        <Dialog
          open={this.state.isDialogOpen}
          onClose={this.toggleDialog(false)}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address here. We will send
              updates occationally.
            </DialogContentText>


            <Paper>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Word</TableCell>
                    <TableCell>Color</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.display_data.map(n => {
                    return (
                  <TableRow key={n.id}>
                    <TableCell>{n.word}</TableCell>
                    <TableCell>{n.color}</TableCell>
                    <TableCell>
                      <Button onClick={() => this.deleteCookie(n.word)}  word={n.word} index={n.id} variant="raised" color="secondary">
                        Delete
                        <Delete/>
                      </Button>
                    </TableCell>
                  </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Paper>

            <form autoComplete="off"
              onSubmit={this.handleSubmit}>
              <TextField
                required
                id="word"
                name="word"
                label="word"
                margin="normal"
                value={this.state.name}
                onChange={this.handleChange}
              />
              <TextField
                required
                id="color"
                name="color"
                label="color"
                margin="normal"
                type="color"
                value={this.state.name}
                onChange={this.handleChange}
              />
              <Button type="submit" color="primary">追加</Button>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.dialogConfirm} color="primary">
              確定
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      </CookiesProvider>
    );
  }
}

export default Header;
