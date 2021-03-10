import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import * as CountryUtil from './countryUtil.js';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.handleFilterInput = this.handleFilterInput.bind(this);
    this.state = {
      countries: props.countries,
      name: ''
    }
  }

  handleFilterInput(name) {
    this.setState({
      countries: this.state.countries,
      name: name
    })
  }

  render() {
    const countries = CountryUtil.filterCountry(this.state.countries, this.state.name);
    return(
      <div>
        <div className="title">
          <h1>COVID MONITORING</h1>
        </div>
        <SearchFilter handleFilterInput={this.handleFilterInput}/>
        <div className="dataTable">
          <table className="table table-stripped table-hover">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Country</th>
                <th>Positive</th>
                <th>Recovered</th>
                <th>Death</th>
              </tr>
            </thead>
            <tbody className="table-light ">
              <BuildRows countries={countries}/>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

class SearchFilter extends React.Component {
  constructor(props) {
    super(props);
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(e) {
    this.props.handleFilterInput(e.target.value);
  }

  render() {
    return (
      <div className="input-group rounded">
        <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search"
          aria-describedby="search-addon" 
          onChange={this.handleInput}
          />
      </div>
    )
  }
}

function BuildRows(props) {
  let countries = props.countries;
  let index = 0;//This will serve as the row count and as the list key as well.
  return(
    countries.map((country) =>
      <tr key={index}>
        <td>{++index}</td>
        <td>{country.name}</td>
        <td>100</td>
        <td>100</td>
        <td>100</td>
      </tr>
    )
  )
}

ReactDOM.render(
  <Main countries={CountryUtil.getCountries()}/>,
  document.getElementById('root')
);

