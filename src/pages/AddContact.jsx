import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const emptyContact = {
  name: "",
  email: "",
  phone: "",
  address: "",
};

const fields = [
  { name: "name", label: "Full Name", type: "text", placeholder: "David Evora" },
  { name: "email", label: "Email", type: "email", placeholder: "evoradavid17@gmail.com" },
  { name: "phone", label: "Phone", type: "tel", placeholder: "+34 600 000 000" },
  { name: "address", label: "Address", type: "text", placeholder: "Calle Bilbao" },
];

export const AddContact = () => {
  const { store, actions } = useGlobalReducer();
  const { contactId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [saving, setSaving] = useState(false);
  const isEditing = Boolean(contactId);
  const currentContact = store.listContacts.find((contact) => contact.id === Number(contactId));

  useEffect(() => {
    if (!isEditing) {
      return;
    }

    if (store.listContacts.length === 0) {
      actions.getInfoContacts();
    }
  }, [actions, isEditing, store.listContacts.length]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);

    const payload = {
      name: formData.name ?? currentContact?.name ?? emptyContact.name,
      email: formData.email ?? currentContact?.email ?? emptyContact.email,
      phone: formData.phone ?? currentContact?.phone ?? emptyContact.phone,
      address: formData.address ?? currentContact?.address ?? emptyContact.address,
    };

    let savedContact;

    if (isEditing) {
      savedContact = await actions.editContact(contactId, payload);
    } else {
      savedContact = await actions.createContact(payload);
    }

    setSaving(false);

    if (savedContact) {
      navigate("/");
    }
  };

  return (
    <div className="bg-primary px-4 py-8 text-white min-h-screen">
      <div className="mx-auto w-full max-w-3xl">
        <div className="mb-6">
          <h1 className="text-3xl text-[#FEE715] font-bold underline">
            {isEditing ? "Edit Contact" : "Add a New Contact"}
          </h1>
          <p className="mt-2 text-[#FEE715]">
            {isEditing ? "Update the contact details below." : "Fill in the contact details below."}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-lg bg-[#FEE715] border border-white/15 p-6 shadow-lg backdrop-blur"
        >
          <div className="grid gap-5">
            {fields.map((field) => (
              <label key={field.name} className="grid gap-2 text-left">
                <span className="text-white font-outline-2 font-bold">{field.label}</span>
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name] ?? currentContact?.[field.name] ?? ""}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  required
                  className="w-full rounded-lg border border-white/20 bg-primary px-4 py-3 text-white outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300"
                />
              </label>
            ))}
          </div>

          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
            <Link
              to="/"
              className="rounded-lg bg-indigo-500 hover:bg-indigo-600 border border-white/20 px-4 py-3 text-center font-semibold text-white transition"
            >
              Back home
            </Link>

            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-indigo-500 px-5 py-3 font-semibold text-white transition hover:bg-indigo-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save Contact"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
