"REQUIRE stamp.jsx";
"REQUIRE colorselector.jsx";
"REQUIRE stampsample.jsx";

const App = function(props){
	let textareaRef = React.useRef(null);
	const [text, setText] = React.useState("");
	const [isDownloading, setIsDownloading] = React.useState(false);
	const [color, setColor] = React.useState("#000f");
	const [stamp, setStamp] = React.useState(<img />);
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
	}, [text])
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
				<p>
					<Stamp text={text} color={color} downloading={isDownloading} setStamp={setStamp} />
				</p>
				{!!text.length && <React.Fragment>
					<p><button onClick={downloadStamp}>ダウンロード</button></p>
					<h3>サンプル</h3>
					<div className="sample-list">
						<StampSample theme="light" stamp={stamp} />
						<StampSample theme="dark" stamp={stamp} />
					</div>
				</React.Fragment>}
			</div>
		</div>
	</div>
}