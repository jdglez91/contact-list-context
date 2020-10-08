const getState = ({ getStore, setStore }) => {
	return {
		store: {
			//Your data structures, A.K.A Entities
			contacts: []
		},
		actions: {
			//(Arrow) Functions that update the Store
			// Remember to use the scope: scope.state.store & scope.setState()
			loadContacts: () => {
				fetch("https://assets.breatheco.de/apis/fake/contact/agenda/JoseDavid_GonzalezGarcia")
					.then(function(response) {
						if (!response.ok) {
							throw Error(response.statusText);
						}
						// Read the response as json.
						return response.json();
					})
					.then(function(responseAsJson) {
						// Do stuff with the JSON
						console.log("responseAsJson", responseAsJson);
						setStore({ contacts: responseAsJson });
					})
					.catch(function(error) {
						console.log("Looks like there was a problem: \n", error);
					});
			},
			addContact: (name, email, phone, address) => {
				fetch("https://assets.breatheco.de/apis/fake/contact/", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						agenda_slug: "JoseDavid_GonzalezGarcia",
						full_name: name,
						email: email,
						phone: phone,
						address: address
					})
				})
					.then(response => response.json())
					.then(() => {
						fetch("https://assets.breatheco.de/apis/fake/contact/agenda/JoseDavid_GonzalezGarcia")
							.then(response => response.json())
							.then(data => setStore({ contacts: data }));
						console.log("created");
					});
			},
			deleteContact: id => {
				fetch(`https://assets.breatheco.de/apis/fake/contact/${id}`, {
					method: "DELETE",
					headers: { "Content-Type": "application/json" }
				})
					.then(response => response.json())
					.then(() => {
						fetch("https://assets.breatheco.de/apis/fake/contact/agenda/JoseDavid_GonzalezGarcia")
							.then(response => response.json())
							.then(data => setStore({ contacts: data }));
						console.log("deleted");
					});
			},
			editContact: (name, email, phone, address) => {
				fetch("https://assets.breatheco.de/apis/fake/contact/" + id, {
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						agenda_slug: "JoseDavid_GonzalezGarcia",
						full_name: name,
						email: email,
						phone: phone,
						address: address
					})
				})
					.then(response => response.json())
					.then(() => {
						fetch("https://assets.breatheco.de/apis/fake/contact/agenda/JoseDavid_GonzalezGarcia")
							.then(response => response.json())
							.then(data => setStore({ contacts: data }));
						console.log("created");
					});
			}
		}
	};
};

export default getState;
