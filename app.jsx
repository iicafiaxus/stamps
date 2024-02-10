"REQUIRE stamp.jsx";
"REQUIRE colorselector.jsx";
"REQUIRE stampsample.jsx";
"REQUIRE selector.jsx";
"REQUIRE checker.jsx";

const App = function(props){
	let textareaRef = React.useRef(null);
	const [text, setText] = React.useState("");
	const [isDownloading, setIsDownloading] = React.useState(false);
	const [color, setColor] = React.useState("#0a0");
	const [backgroundColor, setBackgroundColor] = React.useState("#000");
	const [transparency, setTransparency] = React.useState("0");
	const [paddingStyle, setPaddingStyle] = React.useState("none");
	const [spacingPolicy, setSpacingPolicy] = React.useState("normal");
	const [compressionLimit, setCompressionLimit] = React.useState(2.5);
	const [fontFamily, setFontFamily] = React.useState("BIZ UDPMincho");
	const [stamp, setStamp] = React.useState(<img />);
	const [showsConfig, setShowsConfig] = React.useState(false);

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
				<div className="config-item">
					<h3>文字の色</h3>
					<p><ColorSelector name="color" setColor={setColor} default="#0a0" /></p>
				</div>
				{showsConfig || <React.Fragment>
					<div className="config-rule">
						<button onClick={() => setShowsConfig(true)}>詳細設定...</button>
					</div>
				</React.Fragment>}
				{showsConfig && <React.Fragment>
					<div className="config-item">
						<h3>フォント</h3>
						<p><Selector name="font-family" setValue={setFontFamily} default="BIZ UDPMincho" options={[
							{ value: "BIZ UDPMincho", title: "明朝" },
							{ value: "BIZ UDPGothic", title: "ゴシック" }
						]} /></p>
					</div>
					<div className="config-item">
						<h3>背景</h3>
						<p><Selector name="transparency" setValue={setTransparency} default="0" options={[
							{ value: "0", title: "透明" },
							{ value: "8", title: "半透明" },
							{ value: "f", title: "不透明" }
						]} /></p>
						<p><ColorSelector name="backgroundColor" setColor={setBackgroundColor} default="#000" /></p>
					</div>
					<div className="config-item">
						<h3>余白</h3>
						<p><Selector name="padding-style" setValue={setPaddingStyle} default="none" options={[
							{ value: "none", title: "なし" },
							{ value: "normal", title: "四角" },
							{ value: "round", title: "角丸" }
						]} /></p>
					</div>
					<div className="config-item">
						<h3>改行調整</h3>
						<p><Selector name="compression-limit" setValue={setCompressionLimit} default={1.25} options={[
							{ value: 1.0, title: "しない" },
							{ value: 1.25, title: "弱" },
							{ value: 2.0, title: "中" },
							{ value: 3.0, title: "強" },
							{ value: 10.0, title: "最強" },
						]} /></p>
					</div>
					<div className="config-item">
						<h3>詰め方</h3>
						<p><Selector name="spacing-policy" setValue={setSpacingPolicy} default="normal" options={[
							{ value: "normal", title: "普通" },
							{ value: "proportional", title: "比率固定" },
							{ value: "hard", title: "激詰め(未実装)", enabled: false },
						]} /></p>
					</div>
					<div className="config-rule">
						<button onClick={() => setShowsConfig(false)}>詳細設定を閉じる</button>
					</div>
				</React.Fragment>}
			</div>
			<div className="result">
				<h3>結果</h3>
				<p>
					<Stamp text={text} fontFamily={fontFamily} policy={spacingPolicy} compressionLimit={compressionLimit}
						width={128} height={128} padding={paddingStyle != "none" ? 12 : 0} paddingStyle={paddingStyle}
						color={color + "f"} backgroundColor={backgroundColor + transparency}
						downloading={isDownloading} setStamp={setStamp} />
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