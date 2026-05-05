import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { ContactList } from "./pages/ContactList";
import { Contact } from "./pages/Contact";
import { AddContact } from "./pages/AddContact";
import { Agenda } from "./pages/Agenda";

export const router = createBrowserRouter(
  createRoutesFromElements(

    <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >
      <Route index element={<Agenda />} />

      <Route path="/contact/:theId" element={<Contact />} />
      <Route path="/addcontact" element={<AddContact />} />
      <Route path="/contacts" element={<ContactList />} />
      <Route path="/addcontact/:contactId" element={<AddContact />} />
    </Route>
  )
);
