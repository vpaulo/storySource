import addons from '@storybook/addons';
import React from 'react';
import StorySource from './components/StorySource';

// Register the addon with a unique name.
addons.register('source-addon', api => {
    const channel = addons.getChannel();
	// Also need to set a unique name to the panel.
	addons.addPanel('source-addon/panel', {
		title: 'Source',
		render: ({ active }) => <StorySource channel={channel} api={api} active={active} />
	});
});
