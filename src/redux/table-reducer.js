import { UsersAPI } from "../api/api";

const SET_USERS = 'SET_USERS';
const SET_SORT_USERS = 'SET_SORT_USERS';
const SET_SETTINGS = 'SET_SETTINGS';
const SET_PAGE_COUNT = 'SET_PAGE_COUNT';
const ADD_USERS = 'ADD_USERS';


let initialState = {
    users: [],
    bigData: '?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}',
    smallData: '?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}',
    sortSettings: {
        sortId: false,
        sortFirstName: false,
        sortLastName: false,
        sortEmail: false,
        sortPhone: false,
    },
    start: 0,
    end: 30,
    pageCount: 1,
    portionSize: 30,
    addUser: {
        address: {
            city: "",
            state: "",
            streetAddress: "",
            zip: "",
        },
        description: "",
        email: "",
        firstName: "",
        id: null,
        lastName: "",
        phone: ""
    }
}
const tableReducer = (state = initialState, action) => {

    switch (action.type) {

        case `'ADD_USERS'`:
            return { ...state, addUser: action.user }
        case `SET_PAGE_COUNT`:
            return { ...state, pageCount: action.count, start: (action.count - 1) * state.portionSize, end: action.count * state.portionSize }
        case `SET_USERS`:
            return { ...state, users: action.users }
        case `SET_SETTINGS`:
            let setting = state.sortSettings
            for (let key in setting) {
                if (key === action.key) {
                    setting[key] = !setting[key]
                } else {
                    setting[key] = false
                }
            }
            return { ...state, sortSettings: setting }

        case `SET_SORT_USERS`:
            let usersSort = [...state.users.sort((prev, next) => {
                let valueALowerCase;
                let valueBLowerCase;
                if (action.key === "sortLastName") {
                    valueALowerCase = prev.lastName.toLowerCase();
                    valueBLowerCase = next.lastName.toLowerCase();
                } else if (action.key === "sortFirstName") {
                    valueALowerCase = prev.firstName.toLowerCase();
                    valueBLowerCase = next.firstName.toLowerCase();
                } else if (action.key === "sortEmail") {
                    valueALowerCase = prev.email.toLowerCase();
                    valueBLowerCase = next.email.toLowerCase();
                } else if (action.key === "sortId") {
                    valueALowerCase = Number(prev.id)
                    valueBLowerCase = Number(next.id)
                } else if (action.key === "sortPhone") {
                    valueALowerCase = Number(prev.phone.match(/\d/g).join(''))
                    valueBLowerCase = Number(next.phone.match(/\d/g).join(''))
                }

                if (state.sortSettings[action.key]) {
                    if (valueALowerCase < valueBLowerCase) {
                        return -1;
                    }
                    else if (valueBLowerCase > valueALowerCase) {
                        return 1;
                    } else if (valueBLowerCase === valueALowerCase) { return 0 }
                } else if (!state.sortSettings[action.key]) {
                    if (valueALowerCase > valueBLowerCase) {
                        return -1;
                    }
                    else if (valueBLowerCase < valueALowerCase) {
                        return 1;
                    } else if (valueBLowerCase === valueALowerCase) { return 0 }

                }
            })]
            return { ...state, users: usersSort }
        default: return state;
    }
}
// action creator
export const setUsers = (users) => ({ type: SET_USERS, users });
export const setSettings = (key) => ({ type: SET_SETTINGS, key });
export const setSortUsers = (key) => ({ type: SET_SORT_USERS, key });
export const setPageCount = (count) => ({ type: SET_PAGE_COUNT, count });
export const addedUser = (user) => ({ type: ADD_USERS, user });

// thunk creator
export const getUsersThunkCreator = (value) => async (dispatch) => {
    let data = await UsersAPI.getUsers(value)
    dispatch(setUsers(data.data));

}


export default tableReducer;

