import React, { Component } from 'react';
import './App.css';

import TextField from 'material-ui/TextField';
import Grid from 'material-ui/Grid';

import { CookiesProvider, Cookies } from 'react-cookie';

import Header from './Header';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textValue: [],
      wordData: {},
    };

    this.handleCookieChange = this.handleCookieChange.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state.wordData = this.loadCookies();
  }

  handleChange(e) {
    // replace \n to <br>
    // it seems \n but it is \\n
    var str = e.target.value.replace(/\\n/g, '\n');
    var sentences = str.split("\n");
    var result = [];

    for (var idx in sentences){
      var color = '#FFFFFF';
      var sentence = sentences[idx]
      for (var key in this.state.wordData){
        if (sentence.includes(key)){
          color = this.state.wordData[key];
          break;
        }
      }
      result.push({color: color, sentence: sentence})
    }
    this.setState({textValue: result});
  }

  loadCookies(){
    console.log("loadCookies");
    //reload cookies
    const cookies = new Cookies();
    var words = cookies.get("word");
    if (words === undefined){
      words = {}
    }
    return words;
  }

  handleCookieChange(){
    console.log("handleCookieChange");
    //reload cookies
    var words = this.loadCookies();
    this.setState({wordData: words});
  }

  render() {
    return (

      <div className="App">
      <CookiesProvider>
      <Header handler= {this.handleCookieChange} />


        <div style={{ padding: 20 }}>
        <Grid container spacing={40}>
        <Grid item xs={12}>
          <TextField
            multiline={true}
            rows={10}
            rowsMax={10}
            fullWidth={true}
            label="こちらに貼ってください"
            onChange={this.handleChange}
          ></TextField>
        </Grid>
        <Grid item xs={12}>
          <div className="message">
            {this.state.textValue.map((value, index) => <div key={index} style={{backgroundColor: value.color}}>{value.sentence}</div>)}
          </div>
        </Grid>
      </Grid>
      </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        </CookiesProvider>
      </div>

    );
  }
}

export default App;
