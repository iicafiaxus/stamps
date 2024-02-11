"REQUIRE stamp.jsx";
"REQUIRE colorselector.jsx";
"REQUIRE stampsample.jsx";
"REQUIRE selector.jsx";
"REQUIRE checker.jsx";

const App = function(props){
	let textareaRef = React.useRef(null);
	const [text, setText] = React.useState("激詰め\n組版");
	const [isDownloading, setIsDownloading] = React.useState(false);
	const [color, setColor] = React.useState("#f00");
	const [backgroundColor, setBackgroundColor] = React.useState("#000");
	const [opacity, setOpacity] = React.useState("0");
	const [paddingStyle, setPaddingStyle] = React.useState("none");
	const [spacingPolicy, setSpacingPolicy] = React.useState("normal");
	const [compressionLimit, setCompressionLimit] = React.useState(1.25);
	const [kerningRatio, setKerningRatio] = React.useState(0.05);
	const [fontFamily, setFontFamily] = React.useState("BIZ UDPMincho");
	const [stamp, setStamp] = React.useState(<img />);
	const [showsConfig, setShowsConfig] = React.useState(false);
	const [time, setTime] = React.useState(0);

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
				<div className="config-item">
					<h3>組版する文字列</h3>
					<p><textarea onChange={handleChangeText} ref={textareaRef} value={text} /></p>
				</div>
				<div className="config-item">
					<h3>文字の色</h3>
					<p><ColorSelector name="color" setColor={setColor} default={color} /></p>
				</div>
				{showsConfig || <React.Fragment>
					<div className="config-rule">
						<button onClick={() => setShowsConfig(true)}>詳細設定...</button>
					</div>
				</React.Fragment>}
				{showsConfig && <React.Fragment>
					<div className="config-item">
						<h3>フォント</h3>
						<p><Selector name="font-family" setValue={setFontFamily} default={fontFamily} options={[
							{ value: "BIZ UDPMincho", title: "明朝" },
							{ value: "BIZ UDPGothic", title: "ゴシック" }
						]} /></p>
					</div>
					<div className="config-item">
						<h3>背景</h3>
						<p><Selector name="opacity" setValue={setOpacity} default={opacity} options={[
							{ value: "0", title: "色なし" },
							{ value: "8", title: "うす塗り" },
							{ value: "f", title: "ベタ塗り" }
						]} /></p>
						<p>
							<ColorSelector name="backgroundColor" setColor={setBackgroundColor} default={backgroundColor}
								enabled={opacity != "0"}
							/>
						</p>
					</div>
					<div className="config-item">
						<h3>余白</h3>
						<p><Selector name="padding-style" setValue={setPaddingStyle} default={paddingStyle} options={[
							{ value: "none", title: "余白なし" },
							{ value: "normal", title: "四角" },
							{ value: "round", title: "角丸" }
						]} /></p>
					</div>
					<div className="config-item">
						<h3>縦幅調整</h3>
						<p><Selector name="compression-limit" setValue={setCompressionLimit} default={compressionLimit}
							options={[
							{ value: 10.0, title: "均等" },
							{ value: 3.0, title: "弱" },
							{ value: 2.0, title: "中" },
							{ value: 1.25, title: "強" },
							{ value: 1.0, title: "フリー" },
						]} /></p>
					</div>
					<div className="config-item">
						<h3>横幅調整</h3>
						<p><Selector name="spacing-policy" setValue={setSpacingPolicy} default={spacingPolicy} options={[
							{ value: "proportional", title: "しない" },
							{ value: "normal", title: "普通" },
							{ value: "fit-width", title: "最強" },
						]} /></p>
					</div>
					<div className="config-item">
						<h3>詰め方</h3>
						<p><Selector name="kerning-ratio" setValue={setKerningRatio} default={kerningRatio} options={[
							{ value: 0.0, title: "余裕" },
							{ value: 0.05, title: "やや詰め" },
							{ value: 0.1, title: "激詰め" }
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
						kerningRatio={kerningRatio}
						width={128} height={128} padding={paddingStyle != "none" ? 12 : 0} paddingStyle={paddingStyle}
						color={color + "f"} backgroundColor={backgroundColor + opacity}
						downloading={isDownloading} setStamp={setStamp}
						time={time} />
				</p>
				<p><button onClick={downloadStamp}>ダウンロード</button></p>
				<h3>サンプル</h3>
				<div className="sample-list">
					<StampSample theme="light" stamp={stamp} />
					<StampSample theme="dark" stamp={stamp} />
				</div>
				<p><button onClick={() => setTime(time + 1)}>表示更新 (更新されない場合)</button></p>
			</div>
		</div>
	</div>
}