import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
// import './Home-page.css';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { Button, Container, Row, Col } from 'reactstrap';
import { fetchListData } from '../fetchAPI';

const styles = {
    dropDown: {
        width: 150
    },
    containerStyle: {
        margin: 30
    }
};
class SearchBar extends Component {
    state = {
        instanceOptions: [],
        selectedInstance: null,
        thisSelectedModel: this.props.selectedModel
    };

    componentDidMount() {
        const { thisSelectedModel } = this.state;
        console.log(thisSelectedModel);
        const { tablename } = thisSelectedModel;
        this.fetchInstances(tablename);
    }

    handleInstanceChange = selectedInstance => {
        this.setState({ selectedInstance });
    };

    handleModelChange = thisSelectedModel => {
        this.setState({ thisSelectedModel, selectedInstance: null });
        const { tablename } = thisSelectedModel;
        const { setSelectedModel } = this.props;
        this.fetchInstances(tablename);
        setSelectedModel(thisSelectedModel);
    };

    onSearchRequest = () => {
        const { selectedInstance, thisSelectedModel } = this.state;
        const { history } = this.props;
        if (selectedInstance !== null) {
            const { id } = selectedInstance;
            const { tablename, route } = thisSelectedModel;
            history.push(`/${route}/${tablename}/${id}`);
        }
    };

    fetchInstances(tablename) {
        fetchListData(tablename).then(data => {
            this.setState({ instanceOptions: data });
        });
    }

    render() {
        const { instanceOptions, selectedInstance, thisSelectedModel } = this.state;
        const { modelOptions } = this.props;
        console.log('modelOptions', modelOptions);
        return (
            <Container style={styles.containerStyle}>
                <Row>
                    <Col>
                        <Select
                            className="dropDown"
                            options={instanceOptions}
                            value={selectedInstance}
                            onChange={this.handleInstanceChange}
                            getOptionLabel={option => option.title}
                            getOptionValue={option => option.id}
                            placeholder={`Search ${thisSelectedModel.title}`}
                        />
                    </Col>
                    <Col md="2">
                        <Select
                            className="dropDown"
                            options={modelOptions}
                            value={thisSelectedModel}
                            onChange={this.handleModelChange}
                            isSearchable={false}
                            getOptionLabel={option => option.title}
                            getOptionValue={option => option.tablename}
                        />
                    </Col>
                    <Col md="1">
                        <Button color="primary" onClick={this.onSearchRequest}>
                            Search
                        </Button>
                    </Col>
                </Row>
            </Container>
        );
    }
}

const RoutingSearchBar = withRouter(SearchBar);

SearchBar.propTypes = {
    setSelectedModel: PropTypes.func,
    history: PropTypes.objectOf(
        PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.func, PropTypes.objectOf(PropTypes.string)])
    ),
    modelOptions: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string))
};

export { RoutingSearchBar };
