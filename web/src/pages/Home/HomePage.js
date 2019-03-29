import React, { Component } from 'react';
import { Route } from 'react-router-dom';
// import './Home-page.css';
import Select from 'react-select';
import axios from 'axios';
import { Button } from 'reactstrap';
import { fetchListData } from '../../fetchAPI';

const modelOptions = [
    { title: 'Industries', tablename: 'industries_3d', route: 'industry' },
    { title: 'States', tablename: 'states', route: 'location' },
    { title: 'Occupations', tablename: 'occupations_major', route: 'occupation' }
];

const proxyurl = 'https://cors-anywhere.herokuapp.com/';

class HomePage extends Component {
    state = {
        instanceOptions: [],
        selectedInstance: null,
        selectedModel: modelOptions[0]
    };

    componentDidMount() {
        const { selectedModel } = this.state;
        console.log(selectedModel);
        const { tablename } = selectedModel;
        this.fetchInstances(tablename);
    }

    handleInstanceChange = selectedInstance => {
        this.setState({ selectedInstance });
    };

    handleModelChange = selectedModel => {
        this.setState({ selectedModel });
        const { tablename } = selectedModel;
        this.fetchInstances(tablename);
    };

    onSearchRequest = history => {
        const { selectedInstance, selectedModel } = this.state;
        if (selectedInstance !== null) {
            const { id } = selectedInstance;
            const { tablename, route } = selectedModel;
            history.push(`/${route}/${tablename}/${id}`);
        }
    };

    fetchInstances(tablename) {
        fetchListData(tablename).then(data => {
            this.setState({ instanceOptions: data });
        });
    }

    render() {
        const { instanceOptions, selectedInstance, selectedModel } = this.state;

        return (
            <div>
                <div>
                    <Select
                        className="dropDown"
                        options={instanceOptions}
                        value={selectedInstance}
                        onChange={this.handleInstanceChange}
                        getOptionLabel={option => option.title}
                        getOptionValue={option => option.id}
                        placeholder={`Search ${selectedModel.title}`}
                    />
                </div>
                <div>
                    <Select
                        className="dropDown"
                        options={modelOptions}
                        value={selectedModel}
                        onChange={this.handleModelChange}
                        isSearchable={false}
                        getOptionLabel={option => option.title}
                        getOptionValue={option => option.tablename}
                    />
                    <Route
                        render={({ history }) => (
                            <Button color="primary" onClick={this.onSearchRequest(history)}>
                                Search
                            </Button>
                        )}
                    />
                </div>
            </div>
        );
    }
}

export default HomePage;
