"REQUIRE inlinecheckbox.jsx";

const ColorSelector = function(props){
	const name = props.name || "color";
	const defaultColor = props.default || "#0a0";
	const enabled = props.enabled ?? true;
	const [colorCode, setColorCode] = React.useState(defaultColor);
	const colors = [
		{ name: "赤", code: "#f00" },
		{ name: "青", code: "#36f" },
		{ name: "黄色", code: "#fc3" },
		{ name: "緑", code: "#0a0" },
		{ name: "茶色", code: "#963" },
		{ name: "紫", code: "#93c" },
		{ name: "ピンク", code: "#f6c" },
		{ name: "水色", code: "#6cf" },
		{ name: "オレンジ", code: "#f90" },
		{ name: "黄緑", code: "#9c0" },
		{ name: "白", code: "#fff" },
		{ name: "グレー", code: "#888" },
		{ name: "黒", code: "#000" },
	]
	return <React.Fragment>
		{colors.map(color => 
			<InlineCheckBox name={name} key={color.code}
			onChange={() => setColorCode(color.code) + props.setColor(color.code)}
			checked={colorCode == color.code} enabled={enabled}>
				<span style={{ color: enabled ? color.code : "inherit" }}>■</span> {color.name}
			</InlineCheckBox>
		)}
	</React.Fragment>
}