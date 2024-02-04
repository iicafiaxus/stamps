"REQUIRE inlinecheckbox.jsx";

const ColorSelector = function(props){
	const name = props.name || "color";
	const defaultColor = props.default || "#0a0f";
	const [colorCode, setColorCode] = React.useState(defaultColor);
	const colors = [
		{ name: "赤", code: "#f00f" },
		{ name: "青", code: "#36ff" },
		{ name: "黄色", code: "#fc3f" },
		{ name: "緑", code: "#0a0f" },
		{ name: "茶色", code: "#963f" },
		{ name: "紫", code: "#93cf" },
		{ name: "ピンク", code: "#f6cf" },
		{ name: "水色", code: "#6cff" },
		{ name: "オレンジ", code: "#f90f" },
		{ name: "白", code: "#ffff" },
		{ name: "うすい白", code: "#fff9" },
		{ name: "グレー", code: "#888f" },
		{ name: "うすいグレー", code: "#8889" },
		{ name: "黒", code: "#000f" },
		{ name: "うすい黒", code: "#0009" },
		{ name: "透明", code: "#0000" },
	]
	React.useEffect(() => {
		props.setColor(colorCode);
	})
	return <React.Fragment>
		{colors.map(color => 
			<InlineCheckBox name={name} key={color.code}
			onChange={() => setColorCode(color.code)}
			checked={colorCode == color.code}>
				<span style={{color: color.code}}>■</span> {color.name}
			</InlineCheckBox>
		)}
	</React.Fragment>
}