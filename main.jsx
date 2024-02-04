"REQUIRE app.jsx";
"REQUIRE app.jsx";

(function(){
	const dom = document.createElement("div");
	dom.className = "root";
	const root = ReactDOM.createRoot(dom);
	document.body.appendChild(dom);
	root.render(<App />);
})();