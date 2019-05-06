import React, { Component } from 'react';

const styles = {
    divStyle: {}
};

const NewComponent = props => (
    <div style={styles.divStyle} className="NewComponent">
        <header className="NewComponent-header" />
    </div>
);

export { NewComponent };
