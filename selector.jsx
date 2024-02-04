"REQUIRE inlinecheckbox.jsx";

const Selector = function(props){
	const name = props.name || "selector";
	const options = props.options || [];
	const defaultValue = props.default || "";
	const [value, setValue] = React.useState(defaultValue);
	React.useEffect(() => {
		props.setValue(value);
	})
	return <React.Fragment>
		{options.map(option =>
			<InlineCheckBox name={name} key={option.value}
			onChange={() => setValue(option.value)}
			checked={value == option.value}
			enabled={option.enabled ?? true}
			>
				{option.title}
			</InlineCheckBox>
		)}
	</React.Fragment>
}