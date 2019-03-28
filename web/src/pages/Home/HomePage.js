import React, { Component } from 'react';
import './Home-page.css';
import Select from 'react-select';
import AutoSuggest from 'react-autosuggest';
import axios from 'axios';
import { Button } from 'reactstrap';

const options = [
    { label: 'Industries', value: 'industries_3d' },
    { label: 'States', value: 'states' },
    { label: 'Occupations', value: 'occupations_major' }
];

class HomePage extends Component {
    constructor() {
        super();
        this.state = {
            selectedOption: '',
            value: '',
            library: [],
            suggestions: []
        };
    }

    // also get id
    getSuggestionValue = suggestion => {
        console.log(suggestion.id);
        return suggestion.title;
    };

    renderSuggestion = suggestion => <div>{suggestion.title}</div>;

    onChange = (event, { newValue }) => {
        this.setState({
            value: newValue
        });
        // console.log(this.state.value);
    };

    onSuggestionsFetchRequested = ({ value }) => {
        const { library } = this.state;
        console.log(value);
        const inputValue = value
            .toString()
            .trim()
            .toLowerCase();
        const inputLength = inputValue.length;

        const suggestions =
            inputLength === 0
                ? []
                : library.filter(suggestion => suggestion.title.toLowerCase().indexOf(inputValue) > -1);

        this.setState({ suggestions });
    };

    onSuggestionsClearRequested = () => {
        this.setState({ suggestions: [] });
    };

    onSearchRequest = async () => {
        const { selectedOption } = this.state;
        const tablename = selectedOption.id;
        const url = `http://iodb.info/instance/${tablename}/`;

        const response = await fetch(url);
        const data = await response.json();
        data.forEach(issue => {
            // const username = issue.user.login;
        });

        // this.setState({ issuesTotal });
    };

    handleSelectChange = option => {
        const proxyurl = 'https://cors-anywhere.herokuapp.com/';
        const tablename = option.value;
        axios
            .get(`${proxyurl}http://www.iodb.info/api/list/${tablename}`)
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
            selectedOption: option
        });
    };

    render() {
        const { selectedOption, value, suggestions } = this.state;

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
                        getSuggestionValue={this.getSuggestionValue}
                        renderSuggestion={this.renderSuggestion}
                        inputProps={inputProps}
                    />
                </div>
                <div>
                    <Select
                        className="dropDown"
                        options={options}
                        value={selectedOption}
                        onChange={this.handleSelectChange}
                    />
                    <Button color="primary" oonClick={this.onSearchRequest}>
                        Search
                    </Button>
                </div>
            </div>
        );
    }
}

export default HomePage;
