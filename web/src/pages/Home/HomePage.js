import React, { Component } from 'react';
import './Home-page.css';
import Select from 'react-select';
import AutoSuggest from 'react-autosuggest';
import axios from 'axios';

const options = [
    { label: 'Industries', value: 'industries_3d' },
    { label: 'States', value: 'states' },
    { label: 'Occupations', value: 'occupations_major' }
];

const getSuggestions = word => {
    console.log(word.value);
    console.log(word.library);
    const inputValue = word.value
        .toString()
        .trim()
        .toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
        ? []
        : word.library.filter(suggestion => suggestion.label.toLowerCase().indexOf(inputValue) > -1);
};

const getSuggestionValue = suggestion => suggestion.label;

const renderSuggestion = suggestion => <div>{suggestion.label}</div>;

class HomePage extends Component {
    constructor() {
        super();
        this.state = {
            optionsvalue: '',
            value: '',
            library: [],
            suggestions: []
        };
    }

    onChange = (event, { newValue }) => {
        this.setState({
            value: newValue
        });
        // console.log(this.state.value);
    };

    handleChange = optionsvalue => {
        const proxyurl = 'https://cors-anywhere.herokuapp.com/';
        const url = optionsvalue.value;
        axios
            .get(`${proxyurl}http://www.iodb.info/api/list/${url}`)
            .then(res => {
                console.log('fetch request', res.data);
                this.setState(
                    {
                        library: res.data
                    }
                    // function() {
                    //     console.log(this.state.library);
                    // }.bind(this)
                );
            })
            .catch(error => {
                console.log(error.message);
            });
        this.setState({
            optionsvalue
        });
    };

    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: getSuggestions({ value, library: this.state.library })
        });
    };

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    render() {
        const { optionsvalue, value, suggestions } = this.state;

        const inputProps = {
            placeholder: 'Search ...',
            value,
            onChange: this.onChange
        };

        return (
            <div>
                <div>
                    <AutoSuggest
                        suggestions={suggestions}
                        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                        getSuggestionValue={getSuggestionValue}
                        renderSuggestion={renderSuggestion}
                        inputProps={inputProps}
                    />
                </div>
                <div>
                    <Select className="dropDown" options={options} value={optionsvalue} onChange={this.handleChange} />
                    <button>Press me!</button>
                </div>
            </div>
        );
    }
}

export default HomePage;
