export interface Kangrat {
	siteName: string;
	author: string;
	basePage: string;
	pages: {
		[key: string]: Page
	};
	elements: {
		[key: string]: BowerElement;
	}
}
export interface Page {
	schema: Schema;
	template: TemplateElement[];
}

export interface TemplateElement {
	elementTag: string;
	propertyBindings: {
		[key: string]: string;
	}
}
export interface Schema {
	[key: string]: string;
}
export interface BowerElement {
	bowerPackage: string;
	elementPath: string;
}