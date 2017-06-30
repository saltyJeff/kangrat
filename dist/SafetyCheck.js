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
const KangratErrs = require("./ErrorTypes");
const FileTypes_1 = require("./FileTypes");
class SafetyCheck {
    constructor(save) {
        this.save = save;
    }
    checkAll() {
        return __awaiter(this, void 0, void 0, function* () {
            let schemas = yield this.save.getSchemaNames();
            for (let schema of schemas) {
                yield this.checkTemplate(schema);
            }
        });
    }
    checkTemplate(schemaName) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`checking template: ${schemaName}`.cyan);
            let schema = yield this.save.getSchema(schemaName);
            let elements = yield this.save.getElementManifests();
            let template = yield this.save.getTemplate(schemaName);
            for (let pgElement of template) {
                if (pgElement.elementTag.indexOf('-') == -1) {
                    continue;
                }
                let element = elements.get(pgElement.elementTag);
                if (element == undefined) {
                    throw KangratErrs.KangratElementNotFound.create(pgElement.elementTag, schemaName);
                }
                for (let bind of pgElement.bindings) {
                    let schemaType = getFieldType(schema, bind.value);
                    if (schemaType == null) {
                        throw KangratErrs.KangratValueNotFound.create(schemaName, bind.value, schemaName);
                    }
                    let elementType = getPropertyType(element, bind.property);
                    if (elementType == null) {
                        throw KangratErrs.KangratPropertyNotFound.create(element.elementTag, bind.property, schemaName);
                    }
                    if (schemaType != elementType) {
                        throw KangratErrs.KangratTypeMismatch.create(schemaType, elementType, schemaName, bind.value, element.elementTag, bind.property);
                    }
                    let checkType = schemaType;
                    if (checkType.indexOf('[') == 0 && checkType.indexOf(']') == schemaType.length - 1) {
                        checkType = schemaType.substring(1, schemaType.length - 1);
                    }
                    if (FileTypes_1.recognizedTypes.indexOf(checkType) == -1) {
                        throw KangratErrs.KangratTypeNotRecognized.create(schemaType, schemaName, bind.value, schemaName);
                    }
                }
            }
            console.log(`template ${schemaName} checks out`.green);
        });
    }
}
exports.SafetyCheck = SafetyCheck;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2FmZXR5Q2hlY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9TYWZldHlDaGVjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQ0EsNENBQTRDO0FBQzVDLDJDQUEwRjtBQUUxRjtJQUVJLFlBQVksSUFBYztRQUN0QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNyQixDQUFDO0lBQ1ksUUFBUTs7WUFDakIsSUFBSSxPQUFPLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQy9DLEdBQUcsQ0FBQSxDQUFDLElBQUksTUFBTSxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQ3hCLE1BQU0sSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNyQyxDQUFDO1FBQ0wsQ0FBQztLQUFBO0lBQ2EsYUFBYSxDQUFFLFVBQWtCOztZQUMzQyxPQUFPLENBQUMsR0FBRyxDQUFDLHNCQUFzQixVQUFVLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUVyRCxJQUFJLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ25ELElBQUksUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1lBQ3JELElBQUksUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7WUFFdkQsR0FBRyxDQUFBLENBQUMsSUFBSSxTQUFTLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDNUIsRUFBRSxDQUFBLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN6QyxRQUFRLENBQUM7Z0JBQ2IsQ0FBQztnQkFDRCxJQUFJLE9BQU8sR0FBRyxR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U0FBUyxDQUFDLENBQUMsQ0FBQztRQUN2QyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQztBQUNoQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtTYXZlRmlsZX0gZnJvbSAnLi9TYXZlRmlsZSc7XHJcbmltcG9ydCAqIGFzIEthbmdyYXRFcnJzIGZyb20gJy4vRXJyb3JUeXBlcyc7XHJcbmltcG9ydCB7UGFnZUVsZW1lbnQsIEJpbmRpbmcsIEVsZW1lbnRNYW5pZmVzdCwgRmllbGQsIHJlY29nbml6ZWRUeXBlc30gZnJvbSAnLi9GaWxlVHlwZXMnO1xyXG5pbXBvcnQgKiBhcyBjb2xvcnMgZnJvbSAnY29sb3JzJztcclxuZXhwb3J0IGNsYXNzIFNhZmV0eUNoZWNrIHtcclxuICAgIHByaXZhdGUgc2F2ZTogU2F2ZUZpbGU7XHJcbiAgICBjb25zdHJ1Y3RvcihzYXZlOiBTYXZlRmlsZSkge1xyXG4gICAgICAgIHRoaXMuc2F2ZSA9IHNhdmU7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgYXN5bmMgY2hlY2tBbGwgKCkge1xyXG4gICAgICAgIGxldCBzY2hlbWFzID0gYXdhaXQgdGhpcy5zYXZlLmdldFNjaGVtYU5hbWVzKCk7XHJcbiAgICAgICAgZm9yKGxldCBzY2hlbWEgb2Ygc2NoZW1hcykge1xyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLmNoZWNrVGVtcGxhdGUoc2NoZW1hKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGFzeW5jIGNoZWNrVGVtcGxhdGUgKHNjaGVtYU5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGBjaGVja2luZyB0ZW1wbGF0ZTogJHtzY2hlbWFOYW1lfWAuY3lhbik7XHJcbiAgICAgICAgLy9uZWVkZWQgZnJvbSBzYXZlIGZpbGVcclxuICAgICAgICBsZXQgc2NoZW1hID0gYXdhaXQgdGhpcy5zYXZlLmdldFNjaGVtYShzY2hlbWFOYW1lKTtcclxuICAgICAgICBsZXQgZWxlbWVudHMgPSBhd2FpdCB0aGlzLnNhdmUuZ2V0RWxlbWVudE1hbmlmZXN0cygpO1xyXG4gICAgICAgIGxldCB0ZW1wbGF0ZSA9IGF3YWl0IHRoaXMuc2F2ZS5nZXRUZW1wbGF0ZShzY2hlbWFOYW1lKTtcclxuICAgICAgICAvL2NoZWNrIGxvb3BcclxuICAgICAgICBmb3IobGV0IHBnRWxlbWVudCBvZiB0ZW1wbGF0ZSkge1xyXG4gICAgICAgICAgICBpZihwZ0VsZW1lbnQuZWxlbWVudFRhZy5pbmRleE9mKCctJykgPT0gLTEpIHsgLy9ubyBoeXBoZW4gPSBidWlsdCBpbiBjb21wb25lbnQgc28gaSBoYXZlIG5vIGlkZWEgd2hhdHMgdXBcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBlbGVtZW50ID0gZWxlbWVudHMuZ2V0KHBnRWxlbWVudC5lbGVtZW50VGFnKTtcclxuICAgICAgICAgICAgaWYoZWxlbWVudCA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IEthbmdyYXRFcnJzLkthbmdyYXRFbGVtZW50Tm90Rm91bmQuY3JlYXRlKHBnRWxlbWVudC5lbGVtZW50VGFnLCBzY2hlbWFOYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IobGV0IGJpbmQgb2YgcGdFbGVtZW50LmJpbmRpbmdzKSB7XHJcbiAgICAgICAgICAgICAgICAvL2luIGNhc2UgeW91IHNjcmV3ZWQgdXBcclxuICAgICAgICAgICAgICAgIGxldCBzY2hlbWFUeXBlID0gZ2V0RmllbGRUeXBlKHNjaGVtYSwgYmluZC52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2NoZW1hVHlwZSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgS2FuZ3JhdEVycnMuS2FuZ3JhdFZhbHVlTm90Rm91bmQuY3JlYXRlKHNjaGVtYU5hbWUsIGJpbmQudmFsdWUsIHNjaGVtYU5hbWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGV0IGVsZW1lbnRUeXBlID0gZ2V0UHJvcGVydHlUeXBlKGVsZW1lbnQsIGJpbmQucHJvcGVydHkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGVsZW1lbnRUeXBlID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBLYW5ncmF0RXJycy5LYW5ncmF0UHJvcGVydHlOb3RGb3VuZC5jcmVhdGUoZWxlbWVudC5lbGVtZW50VGFnLCBiaW5kLnByb3BlcnR5LCBzY2hlbWFOYW1lKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChzY2hlbWFUeXBlICE9IGVsZW1lbnRUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgS2FuZ3JhdEVycnMuS2FuZ3JhdFR5cGVNaXNtYXRjaC5jcmVhdGUoc2NoZW1hVHlwZSwgZWxlbWVudFR5cGUsIHNjaGVtYU5hbWUsIGJpbmQudmFsdWUsIGVsZW1lbnQuZWxlbWVudFRhZywgYmluZC5wcm9wZXJ0eSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZXQgY2hlY2tUeXBlID0gc2NoZW1hVHlwZTtcclxuICAgICAgICAgICAgICAgIGlmKGNoZWNrVHlwZS5pbmRleE9mKCdbJykgPT0gMCAmJiBjaGVja1R5cGUuaW5kZXhPZignXScpID09IHNjaGVtYVR5cGUubGVuZ3RoIC0gMSkgeyAvL2NoZWNrcyBmb3IgYXJyYXkuIHByb2JhYmx5IHNob3VsZCB1c2UgcmVnZXhcclxuICAgICAgICAgICAgICAgICAgICBjaGVja1R5cGUgPSBzY2hlbWFUeXBlLnN1YnN0cmluZygxLCBzY2hlbWFUeXBlLmxlbmd0aCAtIDEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHJlY29nbml6ZWRUeXBlcy5pbmRleE9mKGNoZWNrVHlwZSkgPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBLYW5ncmF0RXJycy5LYW5ncmF0VHlwZU5vdFJlY29nbml6ZWQuY3JlYXRlKHNjaGVtYVR5cGUsIHNjaGVtYU5hbWUsIGJpbmQudmFsdWUsIHNjaGVtYU5hbWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUubG9nKGB0ZW1wbGF0ZSAke3NjaGVtYU5hbWV9IGNoZWNrcyBvdXRgLmdyZWVuKTtcclxuICAgIH1cclxufVxyXG4vL2hlbHBlcnNcclxuZnVuY3Rpb24gZ2V0RmllbGRUeXBlKHNjaGVtYTogRmllbGRbXSwgbmFtZTogc3RyaW5nKSB7XHJcbiAgICBmb3IobGV0IGZpZWxkIG9mIHNjaGVtYSkge1xyXG4gICAgICAgIGlmKGZpZWxkLm5hbWUgPT0gbmFtZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmllbGQudHlwZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxufVxyXG5mdW5jdGlvbiBnZXRQcm9wZXJ0eVR5cGUoZWxlbWVudDogRWxlbWVudE1hbmlmZXN0LCBuYW1lOiBzdHJpbmcpIHtcclxuICAgIGlmKGVsZW1lbnQucHJvcGVydGllc1tuYW1lXSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICByZXR1cm4gZWxlbWVudC5wcm9wZXJ0aWVzW25hbWVdO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbn0iXX0=