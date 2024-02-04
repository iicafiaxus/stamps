const InlineCheckBox = function(props){
	const disabled = !(props.enabled ?? true);
	return <label>
		<input
			type={props.name ? "radio" : "checkbox"} name={props.name} className="checkbox-with-label"
			checked={!!props.checked} onChange={props.onChange} disabled={disabled}
		/>
		<span className={`checkbox-label-button ${disabled ? "disabled" : ""}`}>
			{props.children}
		</span>
	</label>
}