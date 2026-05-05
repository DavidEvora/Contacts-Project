import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Contact = () => {
  const { store, actions } = useGlobalReducer();
  const { theId } = useParams();
  const contact = store.listContacts.find((item) => item.id === Number(theId));

  useEffect(() => {
    if (store.listContacts.length === 0) {
      actions.getInfoContacts();
    }
  }, [actions, store.listContacts.length]);

  return (
    <div className="bg-primary px-4 py-8 text-white min-h-screen">
      <div className="mx-auto w-full max-w-3xl rounded-lg border border-white/15 bg-white/10 p-6 shadow-lg backdrop-blur">
        {!contact && (
          <div className="space-y-4 text-center">
            <h1 className="text-3xl font-bold">Contact not found</h1>
            <p className="text-gray-100">This contact is not available in your agenda.</p>
          </div>
        )}

        {contact && (
          <div className="space-y-5">
            <div>
              <h1 className="break-words text-3xl font-bold underline">{contact.name}</h1>
              <p className="mt-2 break-words text-gray-100">{contact.email}</p>
            </div>

            <div className="grid gap-3 text-left">
              <p className="break-words">
                <span className="font-semibold">Phone:</span> {contact.phone}
              </p>
              <p className="break-words">
                <span className="font-semibold">Address:</span> {contact.address}
              </p>
            </div>
          </div>
        )}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          {contact && (
            <Link
              to={`/addcontact/${contact.id}`}
              className="rounded-lg bg-indigo-500 px-4 py-3 text-center font-semibold text-white transition hover:bg-indigo-600"
            >
              Edit Contact
            </Link>
          )}
          <Link
            to="/"
            className="rounded-lg border border-white/20 px-4 py-3 text-center font-semibold text-white transition hover:bg-white/10"
          >
            Back home
          </Link>
        </div>
      </div>
    </div>
  );
};
