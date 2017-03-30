import * as fs from 'fs-promise';
import * as path from 'path';
import {MetaData, Field, PageElement, Binding, ElementManifest} from './FileTypes';
export class SaveFile {
	public metadata: MetaData;
	private schemas: Map<string, Field[]> = new Map<string, Field[]>();
	private templates: Map<string, PageElement[]> = new Map<string, PageElement[]>();
	private elementManifests: Map<string, ElementManifest> = new Map<string, ElementManifest>();
	private loadPath: string;
	private basePage: string = null;
	public get dataPath () {
		return path.resolve(this.loadPath, 'data');
	}
	public get savePath () {
		return this.loadPath;
	}
	/**
	 * Reads a save directory (must be called before everything else on this instance)
	 * @param dirname the directory to read from
	 */
	public async readFrom (dirname: string) {
		this.loadPath = dirname;
		let metaFile = await fs.readFile(path.resolve(this.loadPath, 'metadata.json'), 'UTF-8');
		this.metadata = SaveFile.parseMetaData(JSON.parse(metaFile));
	}
	public static parseMetaData (obj: any): MetaData {
		let toReturn = {name: obj.name, version: obj.version};
		return toReturn as MetaData;
	}
	public static parseFields (obj: any[]): Field[] {
		let toReturn: Field[] = [];
		obj.forEach((field) => {
			toReturn.push({name: field.name, type: field.type.toLowerCase()} as Field);
		})
		return toReturn;
	}
	public getMetadata (): MetaData {
		return this.metadata;
	}
	//schemas and templates
	public static parsePageElements (obj: any[]): PageElement[] {
		let toReturn: PageElement[] = [];
		obj.forEach((pageelem: PageElement) => {
			let thisPageElem: any = {};
			thisPageElem.elementTag = pageelem.elementTag;
			thisPageElem.bindings = [];
			pageelem.bindings.forEach((binding: Binding) => {
				thisPageElem.bindings.push({property: binding.property, value: binding.value} as Binding);
			});
			toReturn.push(thisPageElem as PageElement);
		})
		return toReturn;
	}
	/**
	 * returns the array of what fields the schema contains
	 * @param name name of the schema to get
	 */
	public async getSchema(name: string): Promise<Field[]> {
		if(this.schemas.has(name)) {
			return this.schemas.get(name) as Field[]; //silly typescript
		}
		let schemaFile = await fs.readFile(path.resolve(this.loadPath, 'schemas', name+'.json'), 'UTF-8');
		let fields = SaveFile.parseFields(JSON.parse(schemaFile));
		this.schemas.set(name, fields);
		return fields;
	}
	/**
	 * Returns the names of all the schemas
	 */
	public async getSchemaNames (): Promise<string[]> {
		let schemaDir = await fs.readdir(path.resolve(this.loadPath, 'schemas'));
		let toReturn: string[] = [];
		for(let filename of schemaDir) {
			if(path.extname(filename) === '.json') {
				let base = path.basename(filename, '.json');
				toReturn.push(base);
			}
		};
		return toReturn;
	}
	/**
	 * gets the template definition of a schema
	 * @param name The name of the template to get
	 */
	public async getTemplate(name: string): Promise<PageElement[]> {
		if(this.templates.has(name)) {
			return this.templates.get(name) as PageElement[]; //silly typescript
		}
		let templateFile = await fs.readFile(path.resolve(this.loadPath, 'templates', name+'.json'), 'UTF-8');
		let pageElems = SaveFile.parsePageElements(JSON.parse(templateFile));
		this.templates.set(name, pageElems);
		return pageElems;
	}
	//element manifest stuff
	public static parseManifest (obj: any): ElementManifest {
		let toReturn = {elementTag: obj.elementTag, href: obj.href, importType: obj.importType.toLowerCase(), properties: obj.properties};
		for(let prop in toReturn.properties) {
			toReturn.properties[prop] = toReturn.properties[prop].toLowerCase();
		}
		return toReturn;
	}
	/**
	 * Gets registered element manifests
	 */
	public async getElementManifests () {
		if(this.elementManifests.size != 0) {
			return this.elementManifests;
		}
		let folderDir = path.resolve(this.loadPath, 'elements');
		let folders = await fs.readdir(folderDir);
		for(let folder of folders) {
			let thisPath = path.resolve(folderDir, folder);
			let stat = await fs.stat(thisPath);
			if(!stat.isDirectory()) {
				continue;
			}
			let fileHref = path.resolve(thisPath, 'nodeblogmanifest.json');
			if(await fs.exists(fileHref)) {
				let file = await fs.readFile(fileHref, 'UTF-8');
				let manifest = SaveFile.parseManifest(JSON.parse(file));					
				manifest.href = path.relative(this.loadPath, path.resolve(thisPath, manifest.href)).replace(new RegExp('\\' + path.sep, 'g'), '/'); //slash for web server compatibility
				this.elementManifests.set(manifest.elementTag, manifest);
			}
		}
		return this.elementManifests;
	}
	/**
	 * Gets the associated base page, or if none is found the ugly default one
	 */
	public async getBasePage() {
		if(this.basePage != null) {
			return this.basePage;
		}
		let testPath = path.resolve(this.loadPath, 'BasePage.html');
		if(await fs.exists(testPath)) {
			this.basePage = await fs.readFile(path.resolve(this.loadPath, 'BasePage.html'), 'UTF-8');
		}
		else {
			this.basePage = await fs.readFile(path.resolve(__dirname, '../BasePage.html'), 'UTF-8');
		}
		return this.basePage;
	}
}