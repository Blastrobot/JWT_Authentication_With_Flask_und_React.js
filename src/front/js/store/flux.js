const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
		},
		actions: {
			// Use getActions to call a function within a fuction

			syncSession: () => {
				const token = localStorage.getItem("token");
				console.log("App loaded, synching the local storage token.")
				if(token && token != "" && token != undefined) setStore({token: token});
			},

			logout: () => {
				localStorage.removeItem("token");
				console.log("Logging out succeed.")
				setStore({token: null});
			},

			login: async (email, password) => {
				const options = {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						"email": email,
						"password": password
					}),
					redirect: "follow"
				}
		
				try{
					const response = await fetch('https://3001-4geeksacade-reactflaskh-o5gt5hbtsmn.ws-eu99.gitpod.io/api/login', options)
					if (response.status !== 200){
						alert("There has been an error");
						return false;
					}
					const result = await response.json();
					console.log("This came from the backend", result);
					localStorage.setItem("token", result.access_token);
					setStore({token: result.access_token})
					return true;
				}
				catch(error){
					console.log("There has been an error login in", error)
				}
			},

			signup: async (email, password) => {
				const options = {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						"email": email, 
						"password": password,
						"is_active": true
					}),
				}
				try {
					const response = await fetch("https://3001-4geeksacade-reactflaskh-o5gt5hbtsmn.ws-eu99.gitpod.io/api/signup", options)
					if (response.status !== 200){
						alert("There has been an error");
						return false;
					}
					const result = await response.json();
					console.log("Signup from the backend", result);
					return true;
				}
				catch(error){
					console.log("There has been an error signing up", error)
				}
			}
		}
	};
};

export default getState;
