import React, { Component } from 'react';
<<<<<<< HEAD
// import './Home-page.css';
import Select from 'react-select';
import axios from 'axios';
import { Button } from 'reactstrap';

const modelOptions = [
    { title: 'Industries', id: 'industries_3d' },
    { title: 'States', id: 'states' },
    { title: 'Occupations', id: 'occupations_major' }
];

const proxyurl = 'https://cors-anywhere.herokuapp.com/';
=======
import { Link } from 'react-router-dom';
import { Jumbotron, Container, Row, Col, Image, Button } from 'react-bootstrap';
import './Home-page.css';
>>>>>>> industryUI

class HomePage extends Component {
    state = {
        instanceOptions: [],
        selectedInstance: null,
        selectedModel: modelOptions[0]
    };

    componentDidMount() {
        const { selectedModel } = this.state;
        console.log(selectedModel);
        const tablename = selectedModel.id;
        this.fetchInstances(tablename);
    }

    handleInstanceChange = selectedInstance => {
        this.setState({ selectedInstance });
    };

    handleModelChange = selectedModel => {
        this.setState({ selectedModel });
        const tablename = selectedModel.id;
        this.fetchInstances(tablename);
    };

    onSearchRequest = async () => {
        const { selectedInstance, selectedModel } = this.state;
        if (selectedInstance !== null) {
            const tablename = selectedModel.id;
            const url = `${proxyurl}http://iodb.info/api/instance/${tablename}/${selectedInstance.id}`;

            const response = await fetch(url);
            const data = await response.json();
            console.log('onSearchRequest', data);
            // data.forEach(issue => {
            // const username = issue.user.login;
            // });

            // this.setState({ issuesTotal });
        }
    };

    fetchInstances(tablename) {
        axios
            .get(`${proxyurl}http://www.iodb.info/api/list/${tablename}`)
            .then(res => {
                console.log('fetch request', res.data);
                this.setState({ instanceOptions: res.data });
            })
            .catch(error => {
                console.log(error.message);
            });
    }

    render() {
<<<<<<< HEAD
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
                        getOptionValue={option => option.id}
                    />
                    <Button color="primary" onClick={this.onSearchRequest}>
                        Search
                    </Button>
                </div>
            </div>
=======
        return (
            <Container>
                <Jumbotron>
                    <h2>Welcome to the Home page</h2>
                </Jumbotron>
            </Container>
>>>>>>> industryUI
        );
    }
}

export default HomePage;
