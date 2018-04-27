import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';


import TextField from 'material-ui/TextField';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textValue: null,
    };
  }


  handleChange(e) {
    // replace \n to <br>
    // it seems \n but it is \\n
    var str = e.target.value.replace(/\\n/g, '\n');
    this.setState({textValue: str});
  }

  render() {
    return (
      <div className="App">
        <div style={{ padding: 20 }}>
        <Grid container spacing={40}>
        <Grid item xs={12}>
          <Paper>Hello World</Paper>
        </Grid>
        <Grid item xs={12}>
          <TextField
            multiline={true}
            rows={10}
            rowsMax={10}
            fullWidth={true}
            label="こちらに貼ってください"
            onChange={this.handleChange.bind(this)}
          ></TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            multiline={true}
            rows={10}
            rowsMax={10}
            fullWidth={true}
            value={this.state.textValue}
          />
        </Grid>
      </Grid>
      </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
