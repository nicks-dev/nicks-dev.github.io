import React from "react";
import "src/assets/styles/app.scss";
import background from "src/assets/images/background@2x.png";
import Layout from "./components/Layout/Layout";
import {Provider} from "react-redux";
import store, {useSelector} from "./store/store";
import {fetchUsers} from "./store/thunks/users-thunk";
import {fetchComments} from "./store/thunks/comments-thunk";

const App = () => {
    store.dispatch(fetchUsers());
    store.dispatch(fetchComments());

    return (
        <Provider store={store}>
            <main className="app">
                <div className="app__background">
                    <img src={background} alt={""} />
                </div>
                <Layout />
            </main>
        </Provider>
    );
};

export default App;
