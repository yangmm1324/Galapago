import React, { useState, useEffect, Button } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/home";
import SignIn from "./components/sign-in/sign-in.component";
import SignUp from "./components/sign-up/sign-up.component";
import {auth} from "./components/Firebase/firebase";
import "./app.css";
const App = () => {
	const [currentUser, setCurrentUser] = useState(auth.currentUser);
	const [signInForm, setSignInForm] = useState(true);

	useEffect(() => {
		auth.onAuthStateChanged((user) =>{ setCurrentUser(user)});
	},[]);

	if(currentUser != null){
		return(<>
			<Home />

		</>);
	}
	if(signInForm){
		return (
			<>
				<div className="container-fluid">
					<div >
						<SignIn/>
							<div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
							  <p align="center"> Does not have an account? </p>
							</div>
							<div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
							 <button className="buttons" onClick={() => setSignInForm(false)}>
								Sign Up</button>
						  </div>
					</div>
				</div>
			</>
			);
	}else{
		return (
			<>
				<div className="container-fluid">
					<div >
						<SignUp/>
						<div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
							<p align="center"> Already Have a Account? </p>
						</div>
						<div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
							<button className="buttons" onClick={() => setSignInForm(true)}>
								Sign In</button>
						</div>
					</div>
				</div>
			</>
			);
	}
}
export default App;
