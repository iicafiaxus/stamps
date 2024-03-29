"REQUIRE inlinecheckbox.jsx";

const Checker = function(props){
	const title = props.title || "";
	const enabled = props.enabled ?? true;
	const defaultValue = !!props.default;
	const [value, setValue] = React.useState(defaultValue);
	return <InlineCheckBox
		onChange={(ev) => setValue(ev.target.checked) + props.setValue(ev.target.checked)}
		checked={value}
		enabled={enabled}
		>
			{title}
	</InlineCheckBox>
}