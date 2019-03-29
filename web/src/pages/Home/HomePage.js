import React, { Component } from 'react';
// import './Home-page.css';
import Select from 'react-select';
import AutoSuggest from 'react-autosuggest';
import axios from 'axios';
import { Button } from 'reactstrap';

const options = [
    { label: 'Industries', id: 'industries_3d' },
    { label: 'States', id: 'states' },
    { label: 'Occupations', id: 'occupations_major' }
];

const proxyurl = 'https://cors-anywhere.herokuapp.com/';

class HomePage extends Component {
    state = {
        instance: {},
        selectedOption: options[0],
        searchInput: '',
        library: [],
        suggestions: []
    };

    componentDidMount() {
        const { selectedOption } = this.state;
        const tablename = selectedOption.id;
        // this.fetchLibrary(tablename);
    }

    onChange = (event, { newValue }) => {
        this.setState({ searchInput: newValue });
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

    getSuggestionValue = suggestion => {
        console.log('getSuggestionValue', suggestion);
        this.setState({ instance: suggestion });
        return suggestion.title;
    };

    handleSelectChange = option => {
        this.setState({
            instance: {},
            selectedOption: option
        });
        const tablename = option.id;
        this.fetchLibrary(tablename);
    };

    onSearchRequest = async () => {
        const { instance, selectedOption } = this.state;
        const tablename = selectedOption.id;
        const url = `${proxyurl}http://iodb.info/api/instance/${tablename}/${instance.id}`;
        console.log('onSearchRequest', instance);

        const response = await fetch(url);
        const data = await response.json();
        console.log('onSearchRequest', data);
        // data.forEach(issue => {
        // const username = issue.user.login;
        // });

        // this.setState({ issuesTotal });
    };

    fetchLibrary(tablename) {
        axios
            .get(`${proxyurl}http://www.iodb.info/api/list/${tablename}`)
            .then(res => {
                console.log('fetch request', res.data);
                this.setState({ library: res.data });
            })
            .catch(error => {
                console.log(error.message);
            });
    }

    renderSuggestion = suggestion => <div>{suggestion.title}</div>;

    render() {
        const { selectedOption, searchInput, suggestions } = this.state;

        const inputProps = {
            placeholder: 'Search ...',
            value: searchInput,
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
                    <Button color="primary" onClick={this.onSearchRequest}>
                        Search
                    </Button>
                </div>
            </div>
        );
    }
}

export default HomePage;
