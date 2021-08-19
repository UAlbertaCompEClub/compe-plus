import React, { FC } from 'react';
import { Provider } from 'react-redux';

import volunteerStore from '../redux/substores/volunteeer/volunteerStore';

const VolunteerApp: FC = () => {
    return (
        <Provider store={volunteerStore}>
            <p>🚧 Work in progress 🚧</p>
        </Provider>
    );
};

export default VolunteerApp;
