import React from 'react';
import ReactDOM from 'react-dom/server';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// Server
import { renderFullPage } from '../../server/ssr-middleware';
import { addMobileToStore } from '../../server/utils';

// Redux
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from '../../redux/reducers/index';
import { baseState } from '../../redux/reducers/footprint-form-answers-reducer';
import updateCostsReducer from '../../redux/update-reducer-by-page';

// Pages
import CostsPages from '../../pages/Costs';
import costPages from '../../components/costs/pages-index';

export default (req, res) => {
    const page = req.params.page.toLowerCase();
    const costPagesKeys = Object.keys(costPages);
    if(costPagesKeys.indexOf(page) === -1) {
        return res.status(400).send({ message: 'Page not found :('});
    }
    const store = createStore(reducers);
    let currentState = store.getState();
    currentState = addMobileToStore(req, currentState);
    const updatedReducer = updateCostsReducer(currentState, page);
    updatedReducer.costsPage = page;
    const appMarkup = ReactDOM.renderToString(
        <Provider store={store}>
            <MuiThemeProvider>
                <CostsPages page={page} />
            </MuiThemeProvider>
        </Provider>
    );
    res.status(200).send(renderFullPage(appMarkup, updatedReducer, 'cost-pages')); 
};