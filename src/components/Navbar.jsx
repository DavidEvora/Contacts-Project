import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<nav className="bg-gray-900 shadow-md px-6 py-4 flex justify-between items-center">

			<Link to="/" className="text-xl font-bold text-gray-300">
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