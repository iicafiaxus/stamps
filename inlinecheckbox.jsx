const InlineCheckBox = function(props){
	const disabled = !(props.enabled ?? true);
	const isRadio = !!props.name;
	return <label>
		<input
			type={isRadio ? "radio" : "checkbox"} name={props.name} className="checkbox-with-label"
			checked={!!props.checked} onChange={props.onChange} disabled={disabled}
		/>
		<span className={`checkbox-label-button ${disabled ? "disabled" : ""}`}>
			{props.children}
		</span>
	</label>
}