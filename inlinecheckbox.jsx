const InlineCheckBox = function(props){
	return <label>
		<input
			type={props.name ? "radio" : "checkbox"} name={props.name} className="checkbox-with-label"
			checked={!!props.checked} onChange={props.onChange}
		/>
		<span className="checkbox-label-button">
			{props.children}
		</span>
	</label>
}