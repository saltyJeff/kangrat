"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs = require("fs-extra");
const SafetyCheck_1 = require("./SafetyCheck");
const colors = require('colors');
const KANGRAT_ROOT = '<!--KANGRAT_ROOT-->';
const KANGRAT_BINDINGS = '[/*KANGRAT_BINDINGS*/]';
const KANGRAT_IMPORT = '<!--KANGRAT_IMPORT-->';
class KangratBuild {
    constructor(save, outputDir) {
        this.save = save;
        this.outputDir = outputDir;
    }
    buildAll(validate) {
        return __awaiter(this, void 0, void 0, function* () {
            let startTime = Date.now();
            console.log(`Building site: ${this.save.getMetadata().name} (v${this.save.getMetadata().version})\noutput: ${this.outputDir}`.red);
            yield fs.ensureDir(this.outputDir);
            if (validate) {
                console.log('Running static checks on site'.red);
                yield new SafetyCheck_1.SafetyCheck(this.save).checkAll();
                console.log('Everything checks out! (you deserve a pat on the back)'.green);
            }
            let buildPromises = [];
            for (let schemaName of yield this.save.getSchemaNames()) {
                yield this.buildTemplate(schemaName);
            }
            yield Promise.all(buildPromises);
            console.log('copying dependencies'.cyan);
            yield this.copyDependencies();
            console.log('dependencies copied'.green);
            console.log('copying data'.cyan);
            yield this.copyData();
            console.log('data copied'.green);
            console.log(`Build complete in ${(Date.now() - startTime) / 1000} seconds`.red);
        });
    }
    buildTemplate(schemaName) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`building template: ${schemaName}`.cyan);
            let schema = yield this.save.getSchema(schemaName);
            let elements = yield this.save.getElementManifests();
            let template = yield this.save.getTemplate(schemaName);
            let pageElements = '';
            let bindings = [];
            let neededImports = '';
            let currentId = 0;
            for (let pgElement of template) {
                let builtIn = pgElement.elementTag.indexOf('-') == -1;
                for (let bind of pgElement.bindings) {
                    bindings.push({ value: bind.value, property: bind.property, elemId: 'kangrat' + currentId });
                }
                pageElements += `<div class="kangratelement"><${pgElement.elementTag} id="${'kangrat' + (currentId++)}" /></div>\n`;
                if (!builtIn) {
                    let element = elements.get(pgElement.elementTag);
                    if (element.importType == 'script') {
                        neededImports += `<script src="${element.href}"></script>\n`;
                    }
                    else if (element.importType == 'html') {
                        neededImports += `<link rel="import" href="${element.href}">\n`;
                    }
                }
            }
            console.log(`writing ${schemaName}.html`.green);
            yield this.writePage(schemaName, pageElements, bindings, neededImports);
        });
    }
    writePage(schema, pageElements, bindings, neededImports) {
        return __awaiter(this, void 0, void 0, function* () {
            let originalText = yield this.save.getBasePage();
            originalText = originalText.replace(KANGRAT_ROOT, pageElements).replace(KANGRAT_BINDINGS, JSON.stringify(bindings)).replace(KANGRAT_IMPORT, neededImports);
            yield fs.ensureFile(path.resolve(this.outputDir, schema + '.html'));
            yield fs.writeFile(path.resolve(this.outputDir, schema + '.html'), originalText, 'UTF-8');
        });
    }
    copyDependencies() {
        return __awaiter(this, void 0, void 0, function* () {
            yield fs.copy(path.resolve(this.save.savePath, 'elements'), path.resolve(this.outputDir, 'elements'));
        });
    }
    copyData() {
        return __awaiter(this, void 0, void 0, function* () {
            yield fs.copy(this.save.dataPath, path.resolve(this.outputDir, 'data'));
        });
    }
}
exports.KangratBuild = KangratBuild;
function getFieldType(schema, name) {
    for (let field of schema) {
        if (field.name == name) {
            return field.type;
        }
    }
    return null;
}
function getPropertyType(element, name) {
    if (element.properties[name] != undefined) {
        return element.properties[name];
    }
    return null;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiS2FuZ3JhdEJ1aWxkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vS2FuZ3JhdEJ1aWxkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSw2QkFBOEI7QUFFOUIsK0JBQStCO0FBRS9CLCtDQUEwQztBQUUxQyxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7QUFPakMsTUFBTSxZQUFZLEdBQUcscUJBQXFCLENBQUM7QUFDM0MsTUFBTSxnQkFBZ0IsR0FBRyx3QkFBd0IsQ0FBQztBQUNsRCxNQUFNLGNBQWMsR0FBRyx1QkFBdUIsQ0FBQztBQUMvQztJQVFJLFlBQVksSUFBYyxFQUFFLFNBQWlCO1FBQ3pDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO0lBQy9CLENBQUM7SUFLWSxRQUFRLENBQUMsUUFBaUI7O1lBQ25DLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUMzQixPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLElBQUksTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sY0FBYyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbkksTUFBTSxFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNuQyxFQUFFLENBQUEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsK0JBQStCLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2pELE1BQU0sSUFBSSx5QkFBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDNUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyx3REFB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QVMsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQzFHLENBQUM7S0FBQTtJQUNhLFFBQVE7O1lBQ2xCLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUM1RSxDQUFDO0tBQUE7Q0FDSjtBQWxGRCxvQ0FrRkM7QUFNRCxzQkFBc0IsTUFBZSxFQUFFLElBQVk7SUFDL0MsR0FBRyxDQUFBLENBQUMsSUFBSSxLQUFLLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQztRQUN0QixFQUFFLENBQUEsQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDcEIsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7UUFDdEIsQ0FBQztJQUNMLENBQUM7SUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUFDRCx5QkFBeUIsT0FBd0IsRUFBRSxJQUFZO0lBQzNELEVBQUUsQ0FBQSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQztRQUN2QyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQztBQUNoQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogIGFzIHBhdGggZnJvbSAncGF0aCc7XHJcbmltcG9ydCB7U2F2ZUZpbGV9IGZyb20gJy4vU2F2ZUZpbGUnO1xyXG5pbXBvcnQgKiBhcyBmcyBmcm9tICdmcy1leHRyYSc7XHJcbmltcG9ydCB7UGFnZUVsZW1lbnQsIEJpbmRpbmcsIEVsZW1lbnRNYW5pZmVzdCwgRmllbGQsIHJlY29nbml6ZWRUeXBlc30gZnJvbSAnLi9GaWxlVHlwZXMnO1xyXG5pbXBvcnQge1NhZmV0eUNoZWNrfSBmcm9tICcuL1NhZmV0eUNoZWNrJztcclxuaW1wb3J0ICogYXMgS2FuZ3JhdEVycnMgZnJvbSAnLi9FcnJvclR5cGVzJztcclxuY29uc3QgY29sb3JzID0gcmVxdWlyZSgnY29sb3JzJyk7IC8vd2VpcmQgbGliIHRoaW5nXHJcbmludGVyZmFjZSBCaW5kaW5nQ29tbWFuZCB7XHJcbiAgICB2YWx1ZTogc3RyaW5nO1xyXG4gICAgZWxlbUlkOiBzdHJpbmc7XHJcbiAgICBwcm9wZXJ0eTogc3RyaW5nO1xyXG59XHJcbi8vY29uc3RzIHRoYXQgZ2V0IHJlcGxhY2VkIChzaXRlIGNhbm5vdCBoYXZlIHRoZXNlKVxyXG5jb25zdCBLQU5HUkFUX1JPT1QgPSAnPCEtLUtBTkdSQVRfUk9PVC0tPic7XHJcbmNvbnN0IEtBTkdSQVRfQklORElOR1MgPSAnWy8qS0FOR1JBVF9CSU5ESU5HUyovXSc7XHJcbmNvbnN0IEtBTkdSQVRfSU1QT1JUID0gJzwhLS1LQU5HUkFUX0lNUE9SVC0tPic7XHJcbmV4cG9ydCBjbGFzcyBLYW5ncmF0QnVpbGQge1xyXG4gICAgcHJpdmF0ZSBzYXZlOiBTYXZlRmlsZTtcclxuICAgIHByaXZhdGUgb3V0cHV0RGlyOiBzdHJpbmc7XHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgbmV3IEthbmdyYXRCdWlsZCBpbnN0YW5jZVxyXG4gICAgICogQHBhcmFtIHNhdmUgdGhlIHNhdmUgZmlsZSB0byByZWFkIGZyb21cclxuICAgICAqIEBwYXJhbSBvdXRwdXREaXIgdGhlIGRpcmVjdG9yeSB0byB3cml0ZSB0b1xyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihzYXZlOiBTYXZlRmlsZSwgb3V0cHV0RGlyOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLnNhdmUgPSBzYXZlO1xyXG4gICAgICAgIHRoaXMub3V0cHV0RGlyID0gb3V0cHV0RGlyO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBCdWlsZHMgdGhlIHByb2plY3QhXHJcbiAgICAgKiBAcGFyYW0gdmFsaWRhdGUgY2hlY2sgKHRydWUpIG9yIG5vdCBjaGVjayAoZmFsc2UpIHRoZSBmaWxlcyB0byBzZWUgaWYgdGhlIHR5cGVzIG1hdGNoIHVwXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhc3luYyBidWlsZEFsbCh2YWxpZGF0ZTogYm9vbGVhbikge1xyXG4gICAgICAgIGxldCBzdGFydFRpbWUgPSBEYXRlLm5vdygpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGBCdWlsZGluZyBzaXRlOiAke3RoaXMuc2F2ZS5nZXRNZXRhZGF0YSgpLm5hbWV9ICh2JHt0aGlzLnNhdmUuZ2V0TWV0YWRhdGEoKS52ZXJzaW9ufSlcXG5vdXRwdXQ6ICR7dGhpcy5vdXRwdXREaXJ9YC5yZWQpO1xyXG4gICAgICAgIGF3YWl0IGZzLmVuc3VyZURpcih0aGlzLm91dHB1dERpcik7XHJcbiAgICAgICAgaWYodmFsaWRhdGUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ1J1bm5pbmcgc3RhdGljIGNoZWNrcyBvbiBzaXRlJy5yZWQpO1xyXG4gICAgICAgICAgICBhd2FpdCBuZXcgU2FmZXR5Q2hlY2sodGhpcy5zYXZlKS5jaGVja0FsbCgpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnRXZlcnl0aGluZyBjaGVja3Mgb3V0ISAoeW91IGRlc2VydmUgYSBwYXQgb24gdGhlIGJhY2spJy5ncmVlbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBidWlsZFByb21pc2VzOiBQcm9taXNlPHZvaWQ+W10gPSBbXTtcclxuICAgICAgICBmb3IobGV0IHNjaGVtYU5hbWUgb2YgYXdhaXQgdGhpcy5zYXZlLmdldFNjaGVtYU5hbWVzKCkpIHtcclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5idWlsZFRlbXBsYXRlKHNjaGVtYU5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBhd2FpdCBQcm9taXNlLmFsbChidWlsZFByb21pc2VzKTtcclxuICAgICAgICBjb25zb2xlLmxvZygnY29weWluZyBkZXBlbmRlbmNpZXMnLmN5YW4pO1xyXG4gICAgICAgIGF3YWl0IHRoaXMuY29weURlcGVuZGVuY2llcygpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdkZXBlbmRlbmNpZXMgY29waWVkJy5ncmVlbik7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2NvcHlpbmcgZGF0YScuY3lhbik7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5jb3B5RGF0YSgpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdkYXRhIGNvcGllZCcuZ3JlZW4pO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGBCdWlsZCBjb21wbGV0ZSBpbiAkeyhEYXRlLm5vdygpLXN0YXJ0VGltZSkvMTAwMH0gc2Vjb25kc2AucmVkKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgYXN5bmMgYnVpbGRUZW1wbGF0ZSAoc2NoZW1hTmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coYGJ1aWxkaW5nIHRlbXBsYXRlOiAke3NjaGVtYU5hbWV9YC5jeWFuKTtcclxuICAgICAgICAvL25lZWRlZCBmcm9tIHNhdmUgZmlsZVxyXG4gICAgICAgIGxldCBzY2hlbWEgPSBhd2FpdCB0aGlzLnNhdmUuZ2V0U2NoZW1hKHNjaGVtYU5hbWUpO1xyXG4gICAgICAgIGxldCBlbGVtZW50cyA9IGF3YWl0IHRoaXMuc2F2ZS5nZXRFbGVtZW50TWFuaWZlc3RzKCk7XHJcbiAgICAgICAgbGV0IHRlbXBsYXRlID0gYXdhaXQgdGhpcy5zYXZlLmdldFRlbXBsYXRlKHNjaGVtYU5hbWUpO1xyXG4gICAgICAgIC8vaG9sZGVycyBmb3IgZmluYWwgcmVzdWx0XHJcbiAgICAgICAgbGV0IHBhZ2VFbGVtZW50cyA9ICcnO1xyXG4gICAgICAgIGxldCBiaW5kaW5nczogQmluZGluZ0NvbW1hbmRbXSA9IFtdO1xyXG4gICAgICAgIGxldCBuZWVkZWRJbXBvcnRzID0gJyc7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRJZCA9IDA7XHJcbiAgICAgICAgLy9idWlsZCBsb29wXHJcbiAgICAgICAgZm9yKGxldCBwZ0VsZW1lbnQgb2YgdGVtcGxhdGUpIHtcclxuICAgICAgICAgICAgbGV0IGJ1aWx0SW4gPSBwZ0VsZW1lbnQuZWxlbWVudFRhZy5pbmRleE9mKCctJykgPT0gLTE7XHJcbiAgICAgICAgICAgIGZvcihsZXQgYmluZCBvZiBwZ0VsZW1lbnQuYmluZGluZ3MpIHtcclxuICAgICAgICAgICAgICAgIGJpbmRpbmdzLnB1c2goe3ZhbHVlOiBiaW5kLnZhbHVlLCBwcm9wZXJ0eTogYmluZC5wcm9wZXJ0eSwgZWxlbUlkOiAna2FuZ3JhdCcrY3VycmVudElkfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy93ZWxsIGlmIG5vdGhpbmcncyBibG93biB1cCB5ZXRcclxuICAgICAgICAgICAgcGFnZUVsZW1lbnRzICs9IGA8ZGl2IGNsYXNzPVwia2FuZ3JhdGVsZW1lbnRcIj48JHtwZ0VsZW1lbnQuZWxlbWVudFRhZ30gaWQ9XCIkeydrYW5ncmF0JysoY3VycmVudElkKyspfVwiIC8+PC9kaXY+XFxuYDtcclxuICAgICAgICAgICAgaWYoIWJ1aWx0SW4pIHtcclxuICAgICAgICAgICAgICAgIGxldCBlbGVtZW50ID0gZWxlbWVudHMuZ2V0KHBnRWxlbWVudC5lbGVtZW50VGFnKTtcclxuICAgICAgICAgICAgICAgIGlmKGVsZW1lbnQuaW1wb3J0VHlwZSA9PSAnc2NyaXB0Jykge1xyXG4gICAgICAgICAgICAgICAgICAgIG5lZWRlZEltcG9ydHMgKz0gYDxzY3JpcHQgc3JjPVwiJHtlbGVtZW50LmhyZWZ9XCI+PC9zY3JpcHQ+XFxuYFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZihlbGVtZW50LmltcG9ydFR5cGUgPT0gJ2h0bWwnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmVlZGVkSW1wb3J0cyArPSBgPGxpbmsgcmVsPVwiaW1wb3J0XCIgaHJlZj1cIiR7ZWxlbWVudC5ocmVmfVwiPlxcbmA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coYHdyaXRpbmcgJHtzY2hlbWFOYW1lfS5odG1sYC5ncmVlbik7XHJcbiAgICAgICAgYXdhaXQgdGhpcy53cml0ZVBhZ2Uoc2NoZW1hTmFtZSwgcGFnZUVsZW1lbnRzLCBiaW5kaW5ncywgbmVlZGVkSW1wb3J0cyk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGFzeW5jIHdyaXRlUGFnZShzY2hlbWE6IHN0cmluZywgcGFnZUVsZW1lbnRzOiBzdHJpbmcsIGJpbmRpbmdzOiBCaW5kaW5nQ29tbWFuZFtdLCBuZWVkZWRJbXBvcnRzOiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgb3JpZ2luYWxUZXh0ID0gYXdhaXQgdGhpcy5zYXZlLmdldEJhc2VQYWdlKCk7XHJcbiAgICAgICAgb3JpZ2luYWxUZXh0ID0gb3JpZ2luYWxUZXh0LnJlcGxhY2UoS0FOR1JBVF9ST09ULCBwYWdlRWxlbWVudHMpLnJlcGxhY2UoS0FOR1JBVF9CSU5ESU5HUywgSlNPTi5zdHJpbmdpZnkoYmluZGluZ3MpKS5yZXBsYWNlKEtBTkdSQVRfSU1QT1JULCBuZWVkZWRJbXBvcnRzKTtcclxuICAgICAgICBhd2FpdCBmcy5lbnN1cmVGaWxlKHBhdGgucmVzb2x2ZSh0aGlzLm91dHB1dERpciwgc2NoZW1hKycuaHRtbCcpKTtcclxuICAgICAgICBhd2FpdCBmcy53cml0ZUZpbGUocGF0aC5yZXNvbHZlKHRoaXMub3V0cHV0RGlyLCBzY2hlbWErJy5odG1sJyksIG9yaWdpbmFsVGV4dCwgJ1VURi04Jyk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGFzeW5jIGNvcHlEZXBlbmRlbmNpZXMoKSB7XHJcbiAgICAgICAgYXdhaXQgZnMuY29weShwYXRoLnJlc29sdmUodGhpcy5zYXZlLnNhdmVQYXRoLCAnZWxlbWVudHMnKSwgcGF0aC5yZXNvbHZlKHRoaXMub3V0cHV0RGlyLCAnZWxlbWVudHMnKSk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGFzeW5jIGNvcHlEYXRhICgpIHtcclxuICAgICAgICBhd2FpdCBmcy5jb3B5KHRoaXMuc2F2ZS5kYXRhUGF0aCwgcGF0aC5yZXNvbHZlKHRoaXMub3V0cHV0RGlyLCAnZGF0YScpKTtcclxuICAgIH1cclxufVxyXG5pbnRlcmZhY2UgU29ydEhvbGRlciB7XHJcbiAgICB2YWx1ZTogbnVtYmVyO1xyXG4gICAgZmlsZW5hbWU6IHN0cmluZztcclxufVxyXG4vL2hlbHBlciBmdW5jdGlvbnNcclxuZnVuY3Rpb24gZ2V0RmllbGRUeXBlKHNjaGVtYTogRmllbGRbXSwgbmFtZTogc3RyaW5nKSB7XHJcbiAgICBmb3IobGV0IGZpZWxkIG9mIHNjaGVtYSkge1xyXG4gICAgICAgIGlmKGZpZWxkLm5hbWUgPT0gbmFtZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmllbGQudHlwZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxufVxyXG5mdW5jdGlvbiBnZXRQcm9wZXJ0eVR5cGUoZWxlbWVudDogRWxlbWVudE1hbmlmZXN0LCBuYW1lOiBzdHJpbmcpIHtcclxuICAgIGlmKGVsZW1lbnQucHJvcGVydGllc1tuYW1lXSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICByZXR1cm4gZWxlbWVudC5wcm9wZXJ0aWVzW25hbWVdO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbn1cclxuIl19