import { useState, useEffect, useContext } from "react";
import { Context } from "../store";



function Sign() {
    
    const [isVisible, setIsVisible] = useState(false);
    
    const {
        userState,
        emailChangeHandler,
        passwordChangeHandler,
        submitHandler
    } = useContext(Context);

    const { email, password, notValidEmail, notValidPassword } = userState;
    
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            window.location.replace("/");
        }
    }, []);

    return (
        <div className="text-center">
            <main className="form-signin">
                <form onSubmit={submitHandler}>
                    <img
                        className="mb-4"
                        src="https://cdn.iconscout.com/icon/free/png-256/user-1648810-1401302.png"
                        alt=""
                        width="72"
                        height="57"
                    />
                    <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

                    <div className="form-floating">
                        <input
                            onChange={emailChangeHandler}
                            type="email"
                            value={email}
                            className="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                        />
                        <label htmlFor="floatingInput">Email address</label>
                        { notValidEmail && email && 
                                <div className="alert alert-danger" role="alert">
                                    {notValidEmail}
                                </div>
                        }
                    </div>
                    <div className="form-floating Password">
                        <input
                            onChange={passwordChangeHandler}
                            type={isVisible ? "text" : "password"}
                            value={password}
                            className="form-control"
                            id="floatingPassword"
                            placeholder="Password"
                        />
                        <span className="ShowPassword">
                        <i
                            onClick={() => setIsVisible(!isVisible)}
                            className="far fa-eye"
                        ></i>
                        </span>
                        <label htmlFor="floatingPassword">Password</label>
                    </div>
                    { notValidPassword && password && 
                        <div class="alert alert-danger" role="alert">
                            {notValidPassword}
                        </div>
                    }
                    <button
                        className="w-100 btn btn-lg btn-primary"
                        type="submit"
                    >
                        Sign In
                    </button>
                    <p className="mt-5 mb-3 text-muted">&copy; 2021</p>
                </form>
            </main>
        </div>
    );
}

export default Sign