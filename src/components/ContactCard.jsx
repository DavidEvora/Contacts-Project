import { Link } from "react-router-dom";

export const ContactCard = ({ contact, onDelete }) => {
  return (
    <article className="w-full rounded-lg border border-black bg-[#FEE715] p-5 text-left text-white shadow-lg backdrop-blur">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary text-2xl font-bold text-gray-200">
            {contact.name?.charAt(0)?.toUpperCase() || "?"}
          </div>

          <div className="min-w-0 space-y-1">
            <h2 className="break-words text-xl font-bold font-outline-2">{contact.name}</h2>
            <p className="break-words text-md text-white font-outline-1">{contact.address}</p>
            <p className="break-words text-md text-white font-outline-1">{contact.phone}</p>
            <p className="break-words text-md text-white font-outline-1">{contact.email}</p>
          </div>
        </div>

        <div className="flex shrink-0 gap-2 self-end sm:self-center">
          <Link
            to={`/contact/${contact.id}`}
            className="rounded-lg bg-green-700 border border-white/20 px-3 py-2 text-sm text-white transition hover:bg-green-500"
            aria-label={`View ${contact.name}`}
          >
            View
          </Link>
          <Link
            to={`/addcontact/${contact.id}`}
            className="rounded-lg bg-indigo-500 px-3 py-2 text-sm text-white transition hover:bg-indigo-600"
            aria-label={`Edit ${contact.name}`}
          >
            Edit
          </Link>
          <button
            type="button"
            onClick={() => onDelete(contact.id)}
            className="rounded-lg bg-red-500 px-3 py-2 text-sm text-white transition hover:bg-red-600"
            aria-label={`Delete ${contact.name}`}
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  );
};
