import {createStore,combineReducers,applyMiddleware} from 'redux';
import {Comments} from "./comments"
import {Promotions} from "./promotions"
import {Leaders} from "./leaders"
import {Dishes} from "./dishes"
import thunk from "redux-thunk"
import logger from "redux-logger"
import {createForms} from "react-redux-form"
import { InitialFeedBack } from './forms';


export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            dishes:Dishes,
            leaders:Leaders,
            promotions:Promotions,
            comments:Comments,
            ...createForms({
                feedback:InitialFeedBack
            })
        }),
        applyMiddleware(thunk,logger)
    );

    return store;
}