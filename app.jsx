"REQUIRE stamp.jsx";
"REQUIRE colorselector.jsx";

const App = function(props){
	let textareaRef = React.useRef(null);
	const [text, setText] = React.useState("");
	const [isDownloading, setIsDownloading] = React.useState(false);
	const [color, setColor] = React.useState("#000f");
	const handleChangeText = (ev) => {
		setText(ev.target.value);
	}
	const downloadStamp = () => {
		setIsDownloading(true);
	}
	React.useEffect(() => {
		if(isDownloading){
			setIsDownloading(false);
		}
	})
	React.useEffect(() => {
		textareaRef.current?.focus();
	})
	return <div className="app">
		<h1>激詰め組版</h1>
		<div className="main">
			<div className="source">
				<h3>組版する文字列</h3>
				<p><textarea onChange={handleChangeText} ref={textareaRef} /></p>
				<h3>設定</h3>
				<p><ColorSelector setColor={setColor} /></p>
			</div>
			<div className="result">
				<h3>結果</h3>
				<p><Stamp text={text} color={color} downloading={isDownloading} /></p>
				<p><button onClick={downloadStamp}>ダウンロード</button></p>
				<h3>サンプル</h3>
				<div className="sample-list">
					<div className="sample light">
						<p>
							これは本当に<Stamp text={text} color={color} width={24} height={24} />です
							<br />
							<span className="stamp"><Stamp text={text} color={color} width={24} height={24} /> 1</span>
						</p>
					</div>
					<div className="sample dark">
						<p>
							これは本当に<Stamp text={text} color={color} width={24} height={24} />です
							<br />
							<span className="stamp"><Stamp text={text} color={color} width={24} height={24} /> 1</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
}