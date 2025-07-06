"REQUIRE stamp.jsx";
"REQUIRE colorselector.jsx";
"REQUIRE alignmentselector.jsx";
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
	const [alignment, setAlignment] = React.useState("normal,1.25");
	const [kerningRatio, setKerningRatio] = React.useState(0.05);
	const [font, setFont] = React.useState("BIZ UDPMincho");
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
		<p>激詰めスタンプを作り，Slackなどで使いましょう。</p>
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
						<p><Selector name="font-family" setValue={setFont} default={font} options={[
							{ value: "BIZ UDPMincho", title: "明朝" },
							{ value: "BIZ UDPGothic", title: "ゴシック" },
							{ value: "Mochiy Pop P One, 400", title: "ポップ" }
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
						<h3>文字サイズ調整</h3>
						<p><AlignmentSelector name="alignment" setAlignment={setAlignment} default={alignment}
							compressionLimits={[10.0, 3.0, 2.0, 1.25, 1.0]}
							spacingPolicies={["proportional", "normal", "fit-width"]}
							sampleText={text.replaceAll(/[^\n]/g, "□")}
						/></p>
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
					<Stamp text={text} font={font} alignment={alignment}
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