const getState = ({ getStore, getActions, setStore }) => {
  const baseUrl = "https://playground.4geeks.com/contact/agendas";
  const getAgendaSlug = (agendaName) =>
    (agendaName || getStore().agendaSlug || "4geeks").trim();

  return {
    store: {
      agendaSlug: "",
      listContacts: [],
    },

    actions: {
      createUser: async (agendaName) => {
        const agendaSlug = getAgendaSlug(agendaName);

        try {
          const response = await fetch(`${baseUrl}/${agendaSlug}`, {
            method: "POST",
          });
          const data = await response.json();

          setStore({
            agendaSlug,
            listContacts: data.contacts || [],
          });

          console.log(data);
          return data;
        } catch (error) {
          console.log(error);
        }
      },

      getInfoContacts: async () => {
        const agendaSlug = getAgendaSlug();

        try {
          const response = await fetch(`${baseUrl}/${agendaSlug}/contacts`);

          if (response.status === 404) {
            await getActions().createUser(agendaSlug);
            return await getActions().getInfoContacts();
          }

          if (response.ok) {
            const data = await response.json();
            setStore({
              agendaSlug,
              listContacts: data.contacts,
            });
            return data.contacts;
          }
        } catch (error) {
          console.log(error);
        }
      },

      addContactToList: (contact) => {
        const store = getStore();
        setStore({ ...store, listContacts: [...store.listContacts, contact] });
      },

      createContact: async (payload) => {
        const agendaSlug = getAgendaSlug();

        try {
          const response = await fetch(`${baseUrl}/${agendaSlug}/contacts`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });

          if (!response.ok) {
            throw new Error("Error creating contact");
          }

          const data = await response.json();

          const actions = getActions();
          actions.addContactToList(data);

          console.log("Contact added:", data);
          return data;
        } catch (error) {
          console.log(error);
        }
      },

      deleteContact: async (id) => {
        const agendaSlug = getAgendaSlug();

        try {
          const response = await fetch(`${baseUrl}/${agendaSlug}/contacts/${id}`, {
            method: "DELETE",
          });

          if (response.ok) {
            const store = getStore();
            const updatedContacts = store.listContacts.filter(
              (contact) => contact.id !== id
            );

            setStore({ listContacts: updatedContacts });
            console.log(`Contact with ID ${id} deleted`);
          } else {
            console.log("Error deleting contact");
          }
        } catch (error) {
          console.log(error);
        }
      },

      editContact: async (id, contact) => {
        const agendaSlug = getAgendaSlug();

        try {
          const response = await fetch(`${baseUrl}/${agendaSlug}/contacts/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(contact),
          });

          if (!response.ok) {
            throw new Error("Error editing contact");
          }

          const data = await response.json();

          const store = getStore();
          const updatedList = store.listContacts.map((item) =>
            item.id === id ? data : item
          );

          setStore({ listContacts: updatedList });

          return data;
        } catch (error) {
          console.log(error);
        }
      },
    },
  };
};

export default getState;
