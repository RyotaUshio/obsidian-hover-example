import { MarkdownView, Plugin } from 'obsidian';

export default class MyPlugin extends Plugin {
	async onload() {
		// To see what happens when you hover over a link, uncomment the following!
		// @ts-ignore
		// this.registerEvent(this.app.workspace.on('hover-link', (data) => {
		// 	console.log(data);
		// 	const view = this.app.workspace.getActiveViewOfType(MarkdownView);
		// 	console.log(view?.currentMode === data.hoverParent); // true
		// }))

		this.registerHoverLinkSource('my-plugin', { // This is the source name that will be used as the "source" attribute in the hover-link event
			display: 'My plugin',
			defaultMod: false,
		}); // you can see the list of all hover link sources in app.workspace.hoverLinkSources

		this.registerDomEvent(document, 'mouseover', (event) => {
			if (event.target instanceof HTMLElement && event.target.matches('.inline-title')) {
				const view = this.app.workspace.getActiveViewOfType(MarkdownView);
				if (view?.file) {
					this.app.workspace.trigger('hover-link', {
						event,
						source: 'my-plugin', // the same string as the id that you registered with registerHoverLinkSource
						hoverParent: view.currentMode,
						linktext: view.file.path,
						sourcePath: view.file.path ?? ''
					});	
				}
			}
		});
	}
}
