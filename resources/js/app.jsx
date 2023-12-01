import "./bootstrap";
import "../css/app.css";

import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import cartReducer from "@/reducers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx")
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);
        const store = createStore(cartReducer);
        root.render(
            <Router>
                <Provider store={store}>
                    <App {...props} />
                    <ToastContainer />
                </Provider>
            </Router>
        );
    },
    progress: {
        color: "#6f58c9",
    },
});
