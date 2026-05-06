import { useEffect } from "react";
import { ContactCard } from "../components/ContactCard";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const ContactList = () => {
    const { store, actions } = useGlobalReducer();

    const handleDelete = async (id) => {
        const shouldDelete = window.confirm("Are you sure you want to delete this contact?");

        if (!shouldDelete) {
            return;
        }

        actions.deleteContact(id);
    };

    useEffect(() => {
        actions.getInfoContacts();
    }, [actions]);

    return (
        <div className="bg-primary px-4 py-8 text-white min-h-screen overflow-x-hidden">
            <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-6">
                <div className="group text-center">
                    <h1 className="text-3xl text-[#FEE715] underline group-hover:scale-110 transition-transform duration-1000 font-bold">
                        Contacts Management
                    </h1>
                    <p className="group-hover:scale-110 text-[#FEE715] transition-transform duration-1000">
                        {store.listContacts.length ? "Manage your agenda" : "Start by adding a contact"}
                    </p>
                </div>

                {store.listContacts.length === 0 && (
                    <div className="w-full rounded-lg border border-white/50 bg-white/30 p-8 text-center">
                        <p className="text-lg text-[#FEE715] font-semibold">No contacts yet</p>
                        <p className="text-sm text-[#FEE715]">Use the Add Contact button in the header.</p>
                    </div>
                )}

                <div className="flex w-full flex-col gap-4">
                    {store.listContacts.map((contact) => (
                        <ContactCard
                            key={contact.id}
                            contact={contact}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}; 
