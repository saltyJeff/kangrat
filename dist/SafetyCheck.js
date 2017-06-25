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
const NBErrs = require("./ErrorTypes");
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
            console.log('checking template: ' + schemaName);
            let schema = yield this.save.getSchema(schemaName);
            let elements = yield this.save.getElementManifests();
            let template = yield this.save.getTemplate(schemaName);
            for (let pgElement of template) {
                if (pgElement.elementTag.indexOf('-') == -1) {
                    continue;
                }
                let element = elements.get(pgElement.elementTag);
                if (element == undefined) {
                    throw NBErrs.NodeBlogElementNotFound.create(pgElement.elementTag, schemaName);
                }
                for (let bind of pgElement.bindings) {
                    let schemaType = getFieldType(schema, bind.value);
                    if (schemaType == null) {
                        throw NBErrs.NodeBlogValueNotFound.create(schemaName, bind.value, schemaName);
                    }
                    let elementType = getPropertyType(element, bind.property);
                    if (elementType == null) {
                        throw NBErrs.NodeBlogPropertyNotFound.create(element.elementTag, bind.property, schemaName);
                    }
                    if (schemaType != elementType) {
                        throw NBErrs.NodeBlogTypeMismatch.create(schemaType, elementType, schemaName, bind.value, element.elementTag, bind.property);
                    }
                    let checkType = schemaType;
                    if (checkType.indexOf('[') == 0 && checkType.indexOf(']') == schemaType.length - 1) {
                        checkType = schemaType.substring(1, schemaType.length - 1);
                    }
                    if (FileTypes_1.recognizedTypes.indexOf(checkType) == -1) {
                        throw NBErrs.NodeBlogTypeNotRecognized.create(schemaType, schemaName, bind.value, schemaName);
                    }
                }
            }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2FmZXR5Q2hlY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9TYWZldHlDaGVjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQ0EsdUNBQXVDO0FBQ3ZDLDJDQUEwRjtBQUUxRjtJQUVJLFlBQVksSUFBYztRQUN0QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNyQixDQUFDO0lBQ1ksUUFBUTs7WUFDakIsSUFBSSxPQUFPLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQy9DLEdBQUcsQ0FBQSxDQUFDLElBQUksTUFBTSxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQ3hCLE1BQU0sSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNyQyxDQUFDO1FBQ0wsQ0FBQztLQUFBO0lBQ2EsYUFBYSxDQUFFLFVBQWtCOztZQUMzQyxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixHQUFDLFVBQVUsQ0FBQyxDQUFDO1lBRTlDLElBQUksTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDbkQsSUFBSSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7WUFDckQsSUFBSSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUV2RCxHQUFHLENBQUEsQ0FBQyxJQUFJLFNBQVMsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUM1QixFQUFFLENBQUEsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3pDLFFBQVEsQ0FBQztnQkFDYixDQUFDO2dCQUNELElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUNqRCxFQUFFLENBQUEsQ0FBQyxPQUFPLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQztvQkFDdEIsTUFBTSxNQUFNLENBQUMsdUJBQXVCLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7Z0JBQ2xGLENBQUM7Z0JBQ0QsR0FBRyxDQUFBLENBQUMsSUFBSSxJQUFJLElBQUksU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7b0JBRWpDLElBQUksVUFBVSxHQUFHLFlBQVksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUNsRCxFQUFFLENBQUMsQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQzt3QkFDckIsTUFBTSxNQUFNLENBQUMscUJBQXFCLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLFVBQVUsQ0FBQyxDQUFDO29CQUNsRixDQUFDO29CQUNELElBQUksV0FBVyxHQUFHLGVBQWUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUMxRCxFQUFFLENBQUMsQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQzt3QkFDdEIsTUFBTSxNQUFNLENBQUMsd0JBQXdCLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQztvQkFDaEcsQ0FBQztvQkFDRCxFQUFFLENBQUMsQ0FBQyxVQUFVLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQzt3QkFDNUIsTUFBTSxNQUFNLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQ2pJLENBQUM7b0JBQ0QsSUFBSSxTQUFTLEdBQUcsVUFBVSxDQUFDO29CQUMzQixFQUFFLENBQUEsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxTQUFTLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDaEYsU0FBUyxHQUFHLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBQy9ELENBQUM7b0JBQ0QsRUFBRSxDQUFDLENBQUMsMkJBQWUsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUMzQyxNQUFNLE1BQU0sQ0FBQyx5QkFBeUIsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLFVBQVUsQ0FBQyxDQUFDO29CQUNsRyxDQUFDO2dCQUNMLENBQUM7WUFDTCxDQUFDO1FBQ0wsQ0FBQztLQUFBO0NBQ0o7QUFqREQsa0NBaURDO0FBRUQsc0JBQXNCLE1BQWUsRUFBRSxJQUFZO0lBQy9DLEdBQUcsQ0FBQSxDQUFDLElBQUksS0FBSyxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDdEIsRUFBRSxDQUFBLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO1FBQ3RCLENBQUM7SUFDTCxDQUFDO0lBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQztBQUNoQixDQUFDO0FBQ0QseUJBQXlCLE9BQXdCLEVBQUUsSUFBWTtJQUMzRCxFQUFFLENBQUEsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFDdkMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUNELE1BQU0sQ0FBQyxJQUFJLENBQUM7QUFDaEIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7U2F2ZUZpbGV9IGZyb20gJy4vU2F2ZUZpbGUnO1xyXG5pbXBvcnQgKiBhcyBOQkVycnMgZnJvbSAnLi9FcnJvclR5cGVzJztcclxuaW1wb3J0IHtQYWdlRWxlbWVudCwgQmluZGluZywgRWxlbWVudE1hbmlmZXN0LCBGaWVsZCwgcmVjb2duaXplZFR5cGVzfSBmcm9tICcuL0ZpbGVUeXBlcyc7XHJcblxyXG5leHBvcnQgY2xhc3MgU2FmZXR5Q2hlY2sge1xyXG4gICAgcHJpdmF0ZSBzYXZlOiBTYXZlRmlsZTtcclxuICAgIGNvbnN0cnVjdG9yKHNhdmU6IFNhdmVGaWxlKSB7XHJcbiAgICAgICAgdGhpcy5zYXZlID0gc2F2ZTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBhc3luYyBjaGVja0FsbCAoKSB7XHJcbiAgICAgICAgbGV0IHNjaGVtYXMgPSBhd2FpdCB0aGlzLnNhdmUuZ2V0U2NoZW1hTmFtZXMoKTtcclxuICAgICAgICBmb3IobGV0IHNjaGVtYSBvZiBzY2hlbWFzKSB7XHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuY2hlY2tUZW1wbGF0ZShzY2hlbWEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHByaXZhdGUgYXN5bmMgY2hlY2tUZW1wbGF0ZSAoc2NoZW1hTmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2NoZWNraW5nIHRlbXBsYXRlOiAnK3NjaGVtYU5hbWUpO1xyXG4gICAgICAgIC8vbmVlZGVkIGZyb20gc2F2ZSBmaWxlXHJcbiAgICAgICAgbGV0IHNjaGVtYSA9IGF3YWl0IHRoaXMuc2F2ZS5nZXRTY2hlbWEoc2NoZW1hTmFtZSk7XHJcbiAgICAgICAgbGV0IGVsZW1lbnRzID0gYXdhaXQgdGhpcy5zYXZlLmdldEVsZW1lbnRNYW5pZmVzdHMoKTtcclxuICAgICAgICBsZXQgdGVtcGxhdGUgPSBhd2FpdCB0aGlzLnNhdmUuZ2V0VGVtcGxhdGUoc2NoZW1hTmFtZSk7XHJcbiAgICAgICAgLy9jaGVjayBsb29wXHJcbiAgICAgICAgZm9yKGxldCBwZ0VsZW1lbnQgb2YgdGVtcGxhdGUpIHtcclxuICAgICAgICAgICAgaWYocGdFbGVtZW50LmVsZW1lbnRUYWcuaW5kZXhPZignLScpID09IC0xKSB7IC8vbm8gaHlwaGVuID0gYnVpbHQgaW4gY29tcG9uZW50IHNvIGkgaGF2ZSBubyBpZGVhIHdoYXRzIHVwXHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgZWxlbWVudCA9IGVsZW1lbnRzLmdldChwZ0VsZW1lbnQuZWxlbWVudFRhZyk7XHJcbiAgICAgICAgICAgIGlmKGVsZW1lbnQgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBOQkVycnMuTm9kZUJsb2dFbGVtZW50Tm90Rm91bmQuY3JlYXRlKHBnRWxlbWVudC5lbGVtZW50VGFnLCBzY2hlbWFOYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IobGV0IGJpbmQgb2YgcGdFbGVtZW50LmJpbmRpbmdzKSB7XHJcbiAgICAgICAgICAgICAgICAvL2luIGNhc2UgeW91IHNjcmV3ZWQgdXBcclxuICAgICAgICAgICAgICAgIGxldCBzY2hlbWFUeXBlID0gZ2V0RmllbGRUeXBlKHNjaGVtYSwgYmluZC52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2NoZW1hVHlwZSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgTkJFcnJzLk5vZGVCbG9nVmFsdWVOb3RGb3VuZC5jcmVhdGUoc2NoZW1hTmFtZSwgYmluZC52YWx1ZSwgc2NoZW1hTmFtZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZXQgZWxlbWVudFR5cGUgPSBnZXRQcm9wZXJ0eVR5cGUoZWxlbWVudCwgYmluZC5wcm9wZXJ0eSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZWxlbWVudFR5cGUgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IE5CRXJycy5Ob2RlQmxvZ1Byb3BlcnR5Tm90Rm91bmQuY3JlYXRlKGVsZW1lbnQuZWxlbWVudFRhZywgYmluZC5wcm9wZXJ0eSwgc2NoZW1hTmFtZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoc2NoZW1hVHlwZSAhPSBlbGVtZW50VHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IE5CRXJycy5Ob2RlQmxvZ1R5cGVNaXNtYXRjaC5jcmVhdGUoc2NoZW1hVHlwZSwgZWxlbWVudFR5cGUsIHNjaGVtYU5hbWUsIGJpbmQudmFsdWUsIGVsZW1lbnQuZWxlbWVudFRhZywgYmluZC5wcm9wZXJ0eSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZXQgY2hlY2tUeXBlID0gc2NoZW1hVHlwZTtcclxuICAgICAgICAgICAgICAgIGlmKGNoZWNrVHlwZS5pbmRleE9mKCdbJykgPT0gMCAmJiBjaGVja1R5cGUuaW5kZXhPZignXScpID09IHNjaGVtYVR5cGUubGVuZ3RoIC0gMSkgeyAvL2NoZWNrcyBmb3IgYXJyYXkuIHByb2JhYmx5IHNob3VsZCB1c2UgcmVnZXhcclxuICAgICAgICAgICAgICAgICAgICBjaGVja1R5cGUgPSBzY2hlbWFUeXBlLnN1YnN0cmluZygxLCBzY2hlbWFUeXBlLmxlbmd0aCAtIDEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHJlY29nbml6ZWRUeXBlcy5pbmRleE9mKGNoZWNrVHlwZSkgPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBOQkVycnMuTm9kZUJsb2dUeXBlTm90UmVjb2duaXplZC5jcmVhdGUoc2NoZW1hVHlwZSwgc2NoZW1hTmFtZSwgYmluZC52YWx1ZSwgc2NoZW1hTmFtZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuLy9oZWxwZXJzXHJcbmZ1bmN0aW9uIGdldEZpZWxkVHlwZShzY2hlbWE6IEZpZWxkW10sIG5hbWU6IHN0cmluZykge1xyXG4gICAgZm9yKGxldCBmaWVsZCBvZiBzY2hlbWEpIHtcclxuICAgICAgICBpZihmaWVsZC5uYW1lID09IG5hbWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZpZWxkLnR5cGU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbn1cclxuZnVuY3Rpb24gZ2V0UHJvcGVydHlUeXBlKGVsZW1lbnQ6IEVsZW1lbnRNYW5pZmVzdCwgbmFtZTogc3RyaW5nKSB7XHJcbiAgICBpZihlbGVtZW50LnByb3BlcnRpZXNbbmFtZV0gIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQucHJvcGVydGllc1tuYW1lXTtcclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG59Il19