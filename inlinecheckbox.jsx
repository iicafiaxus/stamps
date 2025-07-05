const InlineCheckBox = function(props){
	const disabled = !(props.enabled ?? true);
	const smashed = props.smashed ?? false;
	const isRadio = !!props.name;
	return <label>
		<input
			type={isRadio ? "radio" : "checkbox"} name={props.name} className="checkbox-with-label"
			checked={!!props.checked} onChange={props.onChange} disabled={disabled}
		/>
		<span className={`checkbox-label-button ${disabled ? "disabled" : ""} ${smashed ? "smashed" : ""}`}>
			{props.children}
		</span>
	</label>
}