export const Footer = () => (
	<footer className="bg-[#FEE715] font-bold font-outline-2 text-white py-4 mt-auto border-t border-gray-700">
		<div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-3">

			<span className="text-sm">
				© {new Date().getFullYear()} Agenda Management by David Evora
			</span>

			<div className="flex gap-4 text-sm">
				<a href="#" className="hover:text-gray-400 transition">
					Privacy
				</a>
				<a href="#" className="hover:text-gray-400 transition">
					Terms
				</a>
				<a
					href="https://github.com/davidevora"
					target="_blank"
					rel="noopener noreferrer"
					className="hover:text-gray-400 transition"
				>
					GitHub
				</a>
			</div>

		</div>
	</footer>
);