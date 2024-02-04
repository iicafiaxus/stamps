"REQUIRE inlinecheckbox.jsx";

const ColorSelector = function(props){
	const [colorCode, setColorCode] = React.useState("#0a0f");
	const colors = [
		{ name: "黒", code: "#000f" },
		{ name: "赤", code: "#f00f" },
		{ name: "青", code: "#36ff" },
		{ name: "黄色", code: "#fc3f" },
		{ name: "緑", code: "#0a0f" },
		{ name: "茶色", code: "#963f" },
		{ name: "紫", code: "#93cf" },
		{ name: "ピンク", code: "#f6cf" },
		{ name: "水色", code: "#6cff" },
		{ name: "オレンジ", code: "#f90f" },
	]
	React.useEffect(() => {
		props.setColor(colorCode);
	})
	return <React.Fragment>
		{colors.map(color => 
			<InlineCheckBox name="color" key={color.code}
			onChange={() => setColorCode(color.code)}
			checked={colorCode == color.code}>
				<span style={{color: color.code}}>■</span> {color.name}
			</InlineCheckBox>
		)}
	</React.Fragment>
}