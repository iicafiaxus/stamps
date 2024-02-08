const Stamp = function(props){
	const lines = props.text?.split(/\r?\n/g).filter(x => x.length) || [];
	const fontFamily = props.fontFamily || "BIZ UDPMincho";
	const canvasWidth = +props.width || 128;
	const canvasHeight = +props.height || 128;
	const padding = +props.padding || 0;
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
		ctx.fillRect(0, 0, canvasWidth, canvasHeight);
		ctx.fillStyle = props.color || "#000f";
		ctx.font = ["bold", canvasHeight + "px", fontFamily].join(" ");
	}
	const putLetter = (letter, x, y, width, height) => {
		const naturalWidth = calcWidth(letter);
		const widthRatio = width / naturalWidth, heightRatio = height / canvasHeight;
		ctx.scale(widthRatio, heightRatio);
		ctx.fillText(letter, x / widthRatio, y / heightRatio);
		ctx.scale(1 / widthRatio, 1 / heightRatio);
	}
	const calcWidth = (letters) => {
		const metrics = ctx.measureText(letters);
		return metrics.width;
	}
	const calcHeight = (letters) => { // 幅を合わせたときの自然な高さ
		if(!letters.length) return 0;
		const naturalWidth = calcWidth(letters);
		const ratio = Math.min(1.0, innerWidth / naturalWidth);
		return canvasHeight * ratio;
	}

	const sum = array => array.reduce((a, b) => a + b, 0);
	const mid = (a0, b0, f) => { // assert a < b, f(a), !f(b); find min x s.t. !f(x)
		let a = a0, b = b0;
		let m = (a + b) / 2;
		while(b - a > 0.1) m = (a + b) / 2, f(m) ? (a = m): (b = m);
		return b;
	};

	const fitHeight = (height, targetHeight) => {
		if(height * 2.5 < targetHeight) return height * 2.5;
		else return targetHeight;
	}
	const draw = () => {
		if(!lines.length) return;
		const naturalHeights = lines.map(line => calcHeight(line));
		const higherAverageHeight = mid(0, innerHeight, x => sum(naturalHeights.map(h => fitHeight(h, x))) < innerHeight);
		const lineHeights = naturalHeights.map(h => fitHeight(h, higherAverageHeight));
		const totalHeight = sum(lineHeights);
		const excessHeight = innerHeight - totalHeight;
		let top = padding + excessHeight / (lines.length + 1);
		for(let i = 0; i < lines.length; i ++){
			drawLine(lines[i], top, lineHeights[i]);
			top += lineHeights[i] + excessHeight / (lines.length + 1);
		}
	}
	const drawLine = (letters, lineTop, lineHeight) => {
		if(!letters?.length) return;
		const heightRatio = lineHeight / canvasHeight;
		const naturalWidth = calcWidth(letters);
		const widthRatio = Math.min(heightRatio * 2.5, innerWidth / naturalWidth);
		const left = padding + (innerWidth - naturalWidth * widthRatio) / 2;
		for(let i = 0; i < letters.length; i ++){
			const naturalLetterWidth = calcWidth(letters[i]);
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