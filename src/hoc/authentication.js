import locationHelperBuilder from "redux-auth-wrapper/history4/locationHelper";
import { connectedRouterRedirect } from "redux-auth-wrapper/history4/redirect";

const locationHelper = locationHelperBuilder({});

export const userIsAuthenticated = connectedRouterRedirect({
    authenticatedSelector: state => state.account.isLoggedIn,
    wrapperDisplayName: 'UserIsAuthenticated',
    redirectPath: '/login'
});

export const userIsNotAuthenticated = connectedRouterRedirect({
    // Want to redirect the user when they are authenticated
    authenticatedSelector: state => !state.account.isLoggedIn,
    wrapperDisplayName: 'UserIsNotAuthenticated',
    redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/',
    allowRedirectBack: false
});

export const userIsAdmin = connectedRouterRedirect({
    authenticatedSelector: state => state.account.role === "Admin",
    wrapperDisplayName: 'UserIsAdmin',
    redirectPath: '/home'
});

export const userIsNotAdmin = connectedRouterRedirect({
    authenticatedSelector: state => state.account.role !== "Admin",
    wrapperDisplayName: 'UserIsNotAdmin',
    redirectPath: '/home'
});