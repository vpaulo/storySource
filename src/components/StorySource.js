import React, { Component } from 'react';
import { process, copyToClipboard } from '../utils';

const styles = {
	fontSize: '0.88em',
	fontFamily: 'monospace',
	backgroundColor: 'rgb(250, 250, 250)',
	padding: '20px 0.5rem',
	lineHeight: 1.5,
	margin: '10px',
	border: '1px solid #cdcdcd',
	overflow: 'auto',
	cursor: 'copy'
};

class StorySource extends Component {
	constructor(props) {
		super(props);
		this.state = { text: '' };
		this.onAddSource = this.onAddSource.bind(this);
	}

	onAddSource(text) {
		this.setState({ text });
	}

	componentDidMount() {
		const { channel, api } = this.props;
		// Listen to the source and render it.
		channel.on('source-addon/add_source', this.onAddSource);

		// Clear the current source on every story change.
		this.stopListeningOnStory = api.onStory(() => {
			this.onAddSource('');
		});
	}

	handleClick() {
		const { text } = this.state;
		copyToClipboard(text);
	}

	render() {
		const { text } = this.state;
		const { active } = this.props;
		const processedText = process(text);
		return active ? (
			<pre style={styles} onClick={this.handleClick.bind(this)}>
				{processedText}
			</pre>
		) : null;
	}

	// This is some cleanup tasks when the Source panel is unmounting.
	componentWillUnmount() {
		if (this.stopListeningOnStory) {
			this.stopListeningOnStory();
		}
		const { channel } = this.props;
		channel.removeListener('source-addon/add_source', this.onAddSource);
	}
}

export default StorySource;
