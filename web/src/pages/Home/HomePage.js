import React, { Component } from 'react';
// import './Home-page.css';
import Select from 'react-select';
import AutoSuggest from 'react-autosuggest';
import axios from 'axios';
import { Button } from 'reactstrap';

const options = [
    { label: 'Industries', value: 'industries_3d' },
    { label: 'States', value: 'states' },
    { label: 'Occupations', value: 'occupations_major' }
];

const proxyurl = 'https://cors-anywhere.herokuapp.com/';

class HomePage extends Component {
    state = {
        searchBtnDisabled: true,
        instance: null,
        selectedOption: options[0],
        searchInput: '',
        library: [],
        suggestions: []
    };

    componentDidMount() {
        const { selectedOption } = this.state;
        console.log(selectedOption);
        const tablename = selectedOption.value;
        this.fetchLibrary(tablename);
    }

    onChange = (event, { newValue, method }) => {
        console.log('onChange', method);
        if (method === 'type') {
            this.setState({ searchBtnDisabled: true, instance: null, searchInput: newValue });
        } else {
            this.setState({ searchInput: newValue });
        }
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
        this.setState({ searchBtnDisabled: false, instance: suggestion });
        return suggestion.title;
    };

    handleSelectChange = selectedOption => {
        this.setState({
            instance: {},
            selectedOption
        });
        const tablename = selectedOption.value;
        this.fetchLibrary(tablename);
    };

    onSearchRequest = async () => {
        const { searchBtnDisabled } = this.state;
        if (!searchBtnDisabled) {
            const { instance, selectedOption } = this.state;
            const tablename = selectedOption.value;
            const url = `${proxyurl}http://iodb.info/api/instance/${tablename}/${instance.id}`;

            const response = await fetch(url);
            const data = await response.json();
            console.log('onSearchRequest', data);
            // data.forEach(issue => {
            // const username = issue.user.login;
            // });

            // this.setState({ issuesTotal });
        }
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
        const { selectedOption, searchInput, suggestions, searchBtnDisabled } = this.state;

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
                        isSearchable={false}
                    />
                    <Button color="primary" onClick={this.onSearchRequest} disabled={searchBtnDisabled}>
                        Search
                    </Button>
                </div>
            </div>
        );
    }
}

export default HomePage;
