import React, { Component } from 'react';
import { NavItem, NavLink } from 'reactstrap';
import { getModelRoutes } from '../constants';

const LinkedTitle = ({ id, title, tablename }) => (
    <NavLink href={`#/${getModelRoutes[tablename]}/${tablename}/${id}`}>
        <h1>{title}</h1>
    </NavLink>
);

export { LinkedTitle };
