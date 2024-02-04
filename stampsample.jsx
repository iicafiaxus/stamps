const StampSample = function(props){
	return <div className={`sample ${props.theme}`}>
		<p>
			これは本当に{props.stamp}です
			<br />
			<span className="stamp selected">{props.stamp} 1</span>
			<span className="stamp">{props.stamp} 1</span>
		</p>
	</div>
}
