# Storybook Addon Source

Storybook Source Addon can be used to show story source inside the preview.

## Installation

```sh
npm i -D storysource
```

## Configuration

Then create a file called `addons.js` in your storybook config.

Add following content to it:

```js
import 'storysource/register';
```

## Usage

You can add the source to all stories with `withSource` in `.storybook/config.js`:

```js
import { withSource } from 'storysource';

addDecorator(withSource);
```