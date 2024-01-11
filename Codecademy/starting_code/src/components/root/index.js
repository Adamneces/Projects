import React from 'react';
import Navigation from '../navigation';
import { Outlet, useParams } from 'react-router-dom';


const Root = () => {
    return (
        <>
            <Navigation/>
            <Outlet />
        </>
    );
};

export default Root;