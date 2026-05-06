import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<nav className="bg-[#FEE715] shadow-md px-6 py-4 flex justify-between items-center">

			<Link to="/" className="text-3xl font-bold font-outline-2 font-bold text-white">
				Agenda Management
			</Link>

			<Link to="/addcontact">
				<button className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg transition">
					Add Contact
				</button>
			</Link>

		</nav>
	);
};