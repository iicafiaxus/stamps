const AlignmentSelector = function(props){
	const name = props.name || "alignment";
	const [spacingPolicy, compressionLimit] = (props.alignment || "normal,1.25").split(",");
	const spacingPolicies = props.spacingPolicies || ["proportional", "normal", "fit-width"];
	const compressionLimits = props.compressionLimits || [10.0, 3.0, 2.0, 1.25, 1.0];
	const text = props.sampleText || "■■\n■■■\n■■■■■";

	const [alignment, setAlignment] = React.useState(spacingPolicy + "," + compressionLimit);
	return <React.Fragment>
		{spacingPolicies.map(policy =>
			compressionLimits.map(limit => {
				const key = policy + "," + limit;
				return <InlineCheckBox name={name} key={key}
					onChange={() => setAlignment(key) + props.setAlignment(key)}
					checked={alignment == key} smashed>
					<Stamp text={text} alignment={key}
						color={"#333f"} backgroundColor={"#fff0"}
						kerningRatio={0.1}
						width={40} height={40} />
				</InlineCheckBox>
			})
		)}
	</React.Fragment>
}