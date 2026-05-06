import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Agenda = () => {
  const { store, actions } = useGlobalReducer();
  const navigate = useNavigate();
  const [agendaName, setAgendaName] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (store.agendaSlug) {
      navigate("/contacts");
    }
  }, [navigate, store.agendaSlug]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!agendaName.trim()) {
      return;
    }

    setSaving(true);
    await actions.createUser(agendaName);
    setSaving(false);
    navigate("/contacts");
  };

  return (
    <div className="px-4 py-20 text-white min-h-screen overflow-x-hidden">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-6">
        <div className="group text-center">
          <h1 className="text-4xl text-[#FEE715] underline group-hover:scale-110 transition-transform duration-1000 font-bold">
            Create New Agenda
          </h1>

          <form
            onSubmit={handleSubmit}
            className="rounded-lg bg-[#FEE715] mt-15 w-150 border border-white/15 p-6 shadow-lg backdrop-blur"
          >
            <input
              value={agendaName}
              onChange={(event) => setAgendaName(event.target.value)}
              placeholder="Name"
              required
              className="w-full bg-primary rounded-lg border border-white/20 px-4 py-3 text-white outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300"
            />

            <div className="mt-10 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

              <button
                type="submit"
                disabled={saving}
                className="rounded-lg bg-primary px-10 py-3 font-semibold text-white transition hover:bg-indigo-600 disabled:cursor-not-allowed disabled:opacity-60"
              >{saving ? "Creating..." : "Create!"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Agenda;
