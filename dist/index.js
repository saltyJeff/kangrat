#! /usr/bin/env node
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
const SaveFile_1 = require("./SaveFile");
exports.SaveFile = SaveFile_1.SaveFile;
const KangratBuild_1 = require("./KangratBuild");
const SafetyCheck_1 = require("./SafetyCheck");
exports.SafetyCheck = SafetyCheck_1.SafetyCheck;
const FileTypes = require("./FileTypes");
exports.FileTypes = FileTypes;
const path = require("path");
const program = require("commander");
program
    .version('1.0.0')
    .option('-f, --from <dir>', 'Directory to read from')
    .option('-t, --to <dir>', 'Directory to write to')
    .option('-d, --dangerous', 'Throw switch to disable safety checks')
    .option('-q, --quiet', 'Run in no-output mode')
    .parse(process.argv);
if (program.quiet) {
    console.log = () => { };
}
if (!program.from) {
    console.log('switch -f not found, run kangrat --help for help');
    process.exit(1);
}
if (!program.to) {
    console.log('switch -t not found, run kangrat --help for help');
    process.exit(1);
}
function run(from, to, dangerous = false) {
    return __awaiter(this, void 0, void 0, function* () {
        let save = new SaveFile_1.SaveFile();
        yield save.readFrom(from);
        let build = new KangratBuild_1.KangratBuild(save, to);
        yield build.buildAll(!dangerous);
    });
}
exports.build = run;
;
run(path.resolve(process.cwd(), program.from), path.resolve(process.cwd(), program.to), program.dangerous);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBLHlDQUFvQztBQW1DbkMsbUJBbkNPLG1CQUFRLENBbUNQO0FBbENULGlEQUE0QztBQUM1QywrQ0FBMEM7QUFrQ3pDLHNCQWxDTyx5QkFBVyxDQWtDUDtBQWpDWix5Q0FBeUM7QUFtQzNCLDhCQUFTO0FBbEN2Qiw2QkFBNkI7QUFDN0IscUNBQXFDO0FBRXJDLE9BQU87S0FDTCxPQUFPLENBQUMsT0FBTyxDQUFDO0tBQ2hCLE1BQU0sQ0FBQyxrQkFBa0IsRUFBRSx3QkFBd0IsQ0FBQztLQUNwRCxNQUFNLENBQUMsZ0JBQWdCLEVBQUUsdUJBQXVCLENBQUM7S0FDakQsTUFBTSxDQUFDLGlCQUFpQixFQUFFLHVDQUF1QyxDQUFDO0tBQ2xFLE1BQU0sQ0FBQyxhQUFhLEVBQUUsdUJBQXVCLENBQUM7S0FDOUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN0QixFQUFFLENBQUEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUNsQixPQUFPLENBQUMsR0FBRyxHQUFHLFFBQU8sQ0FBQyxDQUFDO0FBQ3hCLENBQUM7QUFDRCxFQUFFLENBQUEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ2xCLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0RBQWtELENBQUMsQ0FBQztJQUNoRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2pCLENBQUM7QUFDRCxFQUFFLENBQUEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ2hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0RBQWtELENBQUMsQ0FBQztJQUNoRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2pCLENBQUM7QUFDRCxhQUFvQixJQUFZLEVBQUUsRUFBVSxFQUFFLFlBQXFCLEtBQUs7O1FBQ3ZFLElBQUksSUFBSSxHQUFhLElBQUksbUJBQVEsRUFBRSxDQUFDO1FBQ3BDLE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxQixJQUFJLEtBQUssR0FBaUIsSUFBSSwyQkFBWSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNyRCxNQUFNLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNsQyxDQUFDO0NBQUE7QUFPTyxvQkFBSztBQVBaLENBQUM7QUFDRixHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLE9BQU8sQ0FBQyxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIjISAvdXNyL2Jpbi9lbnYgbm9kZVxyXG5pbXBvcnQge1NhdmVGaWxlfSBmcm9tICcuL1NhdmVGaWxlJztcclxuaW1wb3J0IHtLYW5ncmF0QnVpbGR9IGZyb20gJy4vS2FuZ3JhdEJ1aWxkJztcclxuaW1wb3J0IHtTYWZldHlDaGVja30gZnJvbSAnLi9TYWZldHlDaGVjayc7XHJcbmltcG9ydCAqIGFzIEZpbGVUeXBlcyBmcm9tICcuL0ZpbGVUeXBlcyc7XHJcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XHJcbmltcG9ydCAqIGFzIHByb2dyYW0gZnJvbSAnY29tbWFuZGVyJztcclxuXHJcbnByb2dyYW1cclxuXHQudmVyc2lvbignMS4wLjAnKVxyXG5cdC5vcHRpb24oJy1mLCAtLWZyb20gPGRpcj4nLCAnRGlyZWN0b3J5IHRvIHJlYWQgZnJvbScpXHJcblx0Lm9wdGlvbignLXQsIC0tdG8gPGRpcj4nLCAnRGlyZWN0b3J5IHRvIHdyaXRlIHRvJylcclxuXHQub3B0aW9uKCctZCwgLS1kYW5nZXJvdXMnLCAnVGhyb3cgc3dpdGNoIHRvIGRpc2FibGUgc2FmZXR5IGNoZWNrcycpXHJcblx0Lm9wdGlvbignLXEsIC0tcXVpZXQnLCAnUnVuIGluIG5vLW91dHB1dCBtb2RlJylcclxuXHQucGFyc2UocHJvY2Vzcy5hcmd2KTtcclxuaWYocHJvZ3JhbS5xdWlldCkge1xyXG5cdGNvbnNvbGUubG9nID0gKCkgPT4ge307XHJcbn1cclxuaWYoIXByb2dyYW0uZnJvbSkge1xyXG5cdGNvbnNvbGUubG9nKCdzd2l0Y2ggLWYgbm90IGZvdW5kLCBydW4ga2FuZ3JhdCAtLWhlbHAgZm9yIGhlbHAnKTtcclxuXHRwcm9jZXNzLmV4aXQoMSk7XHJcbn1cclxuaWYoIXByb2dyYW0udG8pIHtcclxuXHRjb25zb2xlLmxvZygnc3dpdGNoIC10IG5vdCBmb3VuZCwgcnVuIGthbmdyYXQgLS1oZWxwIGZvciBoZWxwJyk7XHJcblx0cHJvY2Vzcy5leGl0KDEpO1xyXG59XHJcbmFzeW5jIGZ1bmN0aW9uIHJ1biAoZnJvbTogc3RyaW5nLCB0bzogc3RyaW5nLCBkYW5nZXJvdXM6IGJvb2xlYW4gPSBmYWxzZSkge1xyXG5cdGxldCBzYXZlOiBTYXZlRmlsZSA9IG5ldyBTYXZlRmlsZSgpO1xyXG5cdGF3YWl0IHNhdmUucmVhZEZyb20oZnJvbSk7XHJcblx0bGV0IGJ1aWxkOiBLYW5ncmF0QnVpbGQgPSBuZXcgS2FuZ3JhdEJ1aWxkKHNhdmUsIHRvKTtcclxuXHRhd2FpdCBidWlsZC5idWlsZEFsbCghZGFuZ2Vyb3VzKTtcclxufTtcclxucnVuKHBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCBwcm9ncmFtLmZyb20pLCBwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgcHJvZ3JhbS50byksIHByb2dyYW0uZGFuZ2Vyb3VzKTtcclxuXHJcbi8vdGhpcyBpcyBpbiBjYXNlIGFueW9uZSB3YW50cyB0aGUgY2xhc3Nlc1xyXG5leHBvcnQge1xyXG5cdFNhdmVGaWxlLFxyXG5cdFNhZmV0eUNoZWNrLFxyXG5cdHJ1biBhcyBidWlsZCxcclxuXHRGaWxlVHlwZXMgYXMgRmlsZVR5cGVzXHJcbn0iXX0=