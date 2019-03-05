export const copyToClipboard = str => {
	const el = document.createElement('textarea');
	el.value = str;
	el.setAttribute('readonly', '');
	el.style.position = 'absolute';
	el.style.left = '-9999px';
	document.body.appendChild(el);
	el.select();
	document.execCommand('copy');
	document.body.removeChild(el);
};

export function process(str) {
	const div = document.createElement('div');
	div.innerHTML = str.trim();
	return format(div, 0).innerHTML.trim();
}

function format(node, level) {
	const indentBefore = new Array(level++ + 1).join('  ');
	const indentAfter = new Array(level - 1).join('  ');
	let textNode;

	for (let i = 0; i < node.children.length; i++) {
		textNode = document.createTextNode('\n' + indentBefore);
		node.insertBefore(textNode, node.children[i]);

		format(node.children[i], level);

		if (node.lastElementChild == node.children[i]) {
			textNode = document.createTextNode('\n' + indentAfter);
			node.appendChild(textNode);
		}
	}

	return node;
}
