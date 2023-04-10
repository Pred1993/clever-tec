import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import {HashRouter} from 'react-router-dom';

import {AppComponent} from './app/app-component';
import {store} from './app/store';

import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <Provider store={store}>
            <HashRouter>
                <AppComponent/>
            </HashRouter>
    </Provider>
);
