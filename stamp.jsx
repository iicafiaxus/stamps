const Stamp = function(props){
	const lines = (text => {
		const segmenter = new Intl.Segmenter();
		const toGraphemes = text => Array.from(segmenter.segment(text)).map(s => s.segment);
		return text?.split(/\r?\n/g).filter(x => x.length).map(toGraphemes) || [];
	})(props.text);
	const fontParams = (props.font || "").split(",").map(x => x.trim());
	const fontFamily = fontParams[0] || "Biz UDPMincho";
	const fontWeight = fontParams[1] || "bold";
	const alignmentParams = (props.alignment || "normal,2.5").split(",").map(x => x.trim());
	const policy = alignmentParams[0] || "normal";
	const maxProportion = +alignmentParams[1] || 2.5;
	const kerningRatio = +props.kerningRatio || 0.0;
	const canvasWidth = +props.width || 128;
	const canvasHeight = +props.height || 128;
	const padding = +props.padding || 0;
	const paddingStyle = props.paddingStyle || "square";
	const innerWidth = canvasWidth - padding * 2;
	const innerHeight = canvasHeight - padding * 2;

	let canvasRef = React.useRef(null);
	const [ctx, setCtx] = React.useState(null);
	const [isDone, setIsDone] = React.useState(false);
	const [timer, setTimer] = React.useState(null);
	const init = () => {
		ctx.textAlign = "left";
		ctx.textBaseline = "top";
		ctx.clearRect(0, 0, canvasWidth, canvasHeight);
		ctx.fillStyle = props.backgroundColor;
		if(paddingStyle == "round"){
			const radius = padding * 2;
			ctx.beginPath();
			ctx.arc(radius, radius, radius, Math.PI, Math.PI * 1.5);
			ctx.lineTo(canvasWidth - radius, 0);
			ctx.arc(canvasWidth - radius, radius, radius, Math.PI * 1.5, Math.PI * 2);
			ctx.lineTo(canvasWidth, canvasHeight - radius);
			ctx.arc(canvasWidth - radius, canvasHeight - radius, radius, 0, Math.PI * 0.5);
			ctx.lineTo(radius, canvasHeight);
			ctx.arc(radius, canvasHeight - radius, radius, Math.PI * 0.5, Math.PI);
			ctx.lineTo(0, radius);
			ctx.fill();
		}
		else{
			ctx.fillRect(0, 0, canvasWidth, canvasHeight);
		}
		ctx.fillStyle = props.color || "#000f";
		ctx.font = [fontWeight, canvasHeight + "px", fontFamily].join(" ");
	}
	const putLetter = (letter, x, y, width, height) => {
		const naturalWidth = calcWidth([letter]);
		const widthRatio = width / naturalWidth, heightRatio = height / canvasHeight;
		ctx.save();
		ctx.scale(widthRatio, heightRatio);
		ctx.fillText(letter, x / widthRatio, y / heightRatio);
		ctx.restore();
	}
	const calcWidth = (letters) => {
		if(!letters.length) return 0;
		const kerning = canvasHeight * kerningRatio * (letters.length - 1);
		const metrics = ctx.measureText(letters.join(""));
		return metrics.width - kerning;
	}
	const calcHeight = (letters) => { // 幅を合わせたときの自然な高さ
		if(!letters.length) return 0;
		const naturalWidth = calcWidth(letters);
		const ratio = Math.min(1.0, innerWidth / naturalWidth);
		return canvasHeight * ratio;
	}

	const sum = array => array.length ? array.reduce((a, b) => a + b, 0) : 0;
	const min = array => array.length ? array.reduce((a, b) => Math.min(a, b), array[0]) : Infty;
	const mid = (a0, b0, f) => { // assert a < b, f(a), !f(b); find min x s.t. !f(x)
		let a = a0, b = b0;
		let m = (a + b) / 2;
		while(b - a > 0.1) m = (a + b) / 2, f(m) ? (a = m): (b = m);
		return b;
	};

	const fitHeight = (height, targetHeight) => {
		if(height * maxProportion < targetHeight) return height * maxProportion;
		else return targetHeight;
	}
	const draw = () => {
		if(!lines.length) return;
		const naturalHeights = lines.map(line => calcHeight(line));
		const higherAverageHeight = mid(0, innerHeight, x => sum(naturalHeights.map(h => fitHeight(h, x))) < innerHeight);
		const lineHeights = naturalHeights.map(h => fitHeight(h, higherAverageHeight));
		const proportion = min(lines.map((line, i) => naturalHeights[i] / lineHeights[i]));
		const totalHeight = sum(lineHeights);
		const excessHeight = innerHeight - totalHeight;
		let top = padding + excessHeight / (lines.length + 1);
		for(let i = 0; i < lines.length; i ++){
			if(policy == "proportional") drawLine(lines[i], top, lineHeights[i], proportion);
			else drawLine(lines[i], top, lineHeights[i]);
			top += lineHeights[i] + excessHeight / (lines.length + 1);
		}
	}
	const drawLine = (letters, lineTop, lineHeight, proportion) => {
		if(!letters?.length) return;
		const heightRatio = lineHeight / canvasHeight;
		const naturalWidth = calcWidth(letters);
		const maxWidthRatio = policy == "fit-width" ? 10.0 : heightRatio * maxProportion;
		const widthRatio = proportion ? heightRatio * proportion :
			Math.min(maxWidthRatio, innerWidth / naturalWidth);
		const left = padding + (innerWidth - naturalWidth * widthRatio) / 2;
		for(let i = 0; i < letters.length; i ++){
			const naturalLetterWidth = calcWidth([letters[i]]);
			const naturalLetterLeft = calcWidth(letters.slice(0, i + 1)) - naturalLetterWidth;
			const modifiedLetterLeft = naturalLetterLeft * widthRatio;
			const modifiedLetterWidth = naturalLetterWidth * widthRatio;
			putLetter(letters[i], left + modifiedLetterLeft, lineTop, modifiedLetterWidth, lineHeight);
		}
	}
	const downloadImage = () => {
		if(!canvasRef.current) return;
		canvasRef.current.toBlob( blob => {
			const url = URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.download = lines.join("_");
			a.href = url;
			a.click();
			URL.revokeObjectURL(url);
		})
	}
	const makeImage = () => {
		if(!canvasRef.current) return;
		const data = canvasRef.current.toDataURL();
		return <img src={data} width="22" height="22" />;
	}
	React.useEffect(() => {
		if(!ctx) setCtx(canvasRef.current?.getContext("2d"));
	})
	React.useEffect(() => {
		if(ctx){
			init();
			draw();
			if(props.downloading) downloadImage();
			setIsDone(true);
		}
	})
	React.useEffect(() => {
		if(isDone){
			if(timer) window.clearTimeout(timer);
			setTimer(window.setTimeout(() => {
				init(), draw();
			}, 100));
			if(props.setStamp) props.setStamp(makeImage());
		}
		setIsDone(false);
	}, [isDone])
	return <canvas width={`${canvasWidth}px`} height={`${canvasHeight}px`} ref={canvasRef} />
}

// https://qiita.com/amabie-mamoru/items/af1f7c7d0877022dbe89