import { createContext, useReducer } from "react";

const DBUsers = [
  {
    email: "max@gmail.com",
    password: "1234",
  },
  {
    email: "tommy@gmail.com",
    password: "123a",
  },
];

// CREATE CONTEXT
const Context = createContext({
    email: "",
    notValidEmail: "",
    password: "",
    notValidPassword: "",
    submitHandler: () => {},
    emailChangeHandler: (e) => {},
    passwordChangeHandler: (e) => {},
});

// ACTION TYPES
const EMAIL_VALUE = "EMAIL_VALUE";
const PASSWORD_VALUE = "PASSWORD_VALUE";
const NOT_VALID_EMAIL = "NOT_VALID_EMAIL";
const NOT_VALID_PASSWORD = "NOT_VALID_PASSWORD";

// CREATE REDUCER

const initialState = {
    email: '',
    password: '',
    notValidEmail: '',
    notValidPassword: ''
};

function reducer(state, action) {
    switch (action.type) {
        case EMAIL_VALUE:
            return { ...state, email: action.payload };
        
        case NOT_VALID_EMAIL:
            return { ...state, notValidEmail: action.payload };
        
        case PASSWORD_VALUE:
            return { ...state, password: action.payload };
        
        case NOT_VALID_PASSWORD:
            return { ...state, notValidPassword: action.payload };
        
        default:
            return state;
    }
}


const Provider = (props) => {

    const [userState, dispatchUserState] = useReducer(reducer, initialState) 

    const emailChangeHandler = (e) => {
        dispatchUserState({
            type: EMAIL_VALUE,
            payload: e.target.value.trim().toLowerCase()
        })
    };

    const passwordChangeHandler = (e) => {
        dispatchUserState({
            type: PASSWORD_VALUE,
            payload: e.target.value.trim()
        })
    };

    const submitHandler = (e) => {
        e.preventDefault();

        let user = DBUsers.find( user => user.email === userState.email);
        
        if (!user) {
            dispatchUserState({
                type: NOT_VALID_EMAIL,
                payload: 'User not found ...!'
            })
            
            setTimeout(() => {
                window.location.reload();
            }, 3000)
            

        } else {

            if (user.password === userState.password) {
                localStorage.setItem("token", true);
                window.location.replace('/');

            } else {
                dispatchUserState({
                    type: NOT_VALID_PASSWORD,
                    payload: 'Check your Password...!'
                })
                
                setTimeout(() => {
                    window.location.reload();
                }, 3000)
               
            }
        }
    };
    
    return (
        <Context.Provider
        value={{
            userState,
            submitHandler,
            emailChangeHandler,
            passwordChangeHandler,
        }}
        >
            {props.children}
        </Context.Provider>
    );
};

export { Context, Provider };
