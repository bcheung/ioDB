import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
// import './Home-page.css';
import Select from 'react-select';
import { Button } from 'reactstrap';
import { fetchListData } from '../fetchAPI';

class SearchBar extends Component {
    state = {
        instanceOptions: [],
        selectedInstance: null,
        selectedModel: this.props.selectedModel
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
        this.setState({ selectedModel, selectedInstance: null });
        const { tablename } = selectedModel;
        this.fetchInstances(tablename);
        this.props.setSelectedModel(selectedModel);
    };

    onSearchRequest = () => {
        const { selectedInstance, selectedModel } = this.state;
        if (selectedInstance !== null) {
            const { id } = selectedInstance;
            const { tablename, route } = selectedModel;
            this.props.history.push(`/${route}/${tablename}/${id}`);
        }
    };

    fetchInstances(tablename) {
        fetchListData(tablename).then(data => {
            this.setState({ instanceOptions: data });
        });
    }

    render() {
        const { instanceOptions, selectedInstance, selectedModel } = this.state;
        const { modelOptions } = this.props;
        return (
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
                <Select
                    className="dropDown"
                    options={modelOptions}
                    value={selectedModel}
                    onChange={this.handleModelChange}
                    isSearchable={false}
                    getOptionLabel={option => option.title}
                    getOptionValue={option => option.tablename}
                />
                <Button color="primary" onClick={this.onSearchRequest}>
                    Search
                </Button>
            </div>
        );
    }
}

const RoutingSearchBar = withRouter(SearchBar);
export { RoutingSearchBar };
