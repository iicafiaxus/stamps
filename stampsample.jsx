const StampSample = function(props){
	return <div className={`sample ${props.theme}`}>
		<p>
			これは本当に{props.stamp}ですね。よろしくお願いします{
			}<span className="stamp-group">{props.stamp}{props.stamp}</span>
			<br />
			よろしくお願いします。
			<br />
			<span className="stamp selected">{props.stamp} 1</span>
			<span className="stamp">{props.stamp} 1</span>
		</p>
	</div>
}
