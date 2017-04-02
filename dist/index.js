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
const NBBuild_1 = require("./NBBuild");
const SafetyCheck_1 = require("./SafetyCheck");
exports.SafetyCheck = SafetyCheck_1.SafetyCheck;
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
        let build = new NBBuild_1.NBBuild(save, to);
        yield build.buildAll(dangerous);
    });
}
exports.build = run;
;
run(path.resolve(process.cwd(), program.from), path.resolve(process.cwd(), program.to), program.dangerous);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBLHlDQUFvQztBQWtDbkMsdUNBQVE7QUFqQ1QsdUNBQWtDO0FBQ2xDLCtDQUEwQztBQWlDekMsZ0RBQVc7QUFoQ1osNkJBQTZCO0FBQzdCLHFDQUFxQztBQUVyQyxPQUFPO0tBQ0wsT0FBTyxDQUFDLE9BQU8sQ0FBQztLQUNoQixNQUFNLENBQUMsa0JBQWtCLEVBQUUsd0JBQXdCLENBQUM7S0FDcEQsTUFBTSxDQUFDLGdCQUFnQixFQUFFLHVCQUF1QixDQUFDO0tBQ2pELE1BQU0sQ0FBQyxpQkFBaUIsRUFBRSx1Q0FBdUMsQ0FBQztLQUNsRSxNQUFNLENBQUMsYUFBYSxFQUFFLHVCQUF1QixDQUFDO0tBQzlDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDdEIsRUFBRSxDQUFBLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDbEIsT0FBTyxDQUFDLEdBQUcsR0FBRyxRQUFPLENBQUMsQ0FBQztBQUN4QixDQUFDO0FBQ0QsRUFBRSxDQUFBLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUNsQixPQUFPLENBQUMsR0FBRyxDQUFDLGtEQUFrRCxDQUFDLENBQUM7SUFDaEUsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNqQixDQUFDO0FBQ0QsRUFBRSxDQUFBLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNoQixPQUFPLENBQUMsR0FBRyxDQUFDLGtEQUFrRCxDQUFDLENBQUM7SUFDaEUsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNqQixDQUFDO0FBQ0QsYUFBb0IsSUFBWSxFQUFFLEVBQVUsRUFBRSxZQUFxQixLQUFLOztRQUN2RSxJQUFJLElBQUksR0FBYSxJQUFJLG1CQUFRLEVBQUUsQ0FBQztRQUNwQyxNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDMUIsSUFBSSxLQUFLLEdBQVksSUFBSSxpQkFBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMzQyxNQUFNLEtBQUssQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDakMsQ0FBQztDQUFBO0FBT08sb0JBQUs7QUFQWixDQUFDO0FBQ0YsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxPQUFPLENBQUMsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiIyEgL3Vzci9iaW4vZW52IG5vZGVcclxuaW1wb3J0IHtTYXZlRmlsZX0gZnJvbSAnLi9TYXZlRmlsZSc7XHJcbmltcG9ydCB7TkJCdWlsZH0gZnJvbSAnLi9OQkJ1aWxkJztcclxuaW1wb3J0IHtTYWZldHlDaGVja30gZnJvbSAnLi9TYWZldHlDaGVjayc7XHJcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XHJcbmltcG9ydCAqIGFzIHByb2dyYW0gZnJvbSAnY29tbWFuZGVyJztcclxuXHJcbnByb2dyYW1cclxuXHQudmVyc2lvbignMS4wLjAnKVxyXG5cdC5vcHRpb24oJy1mLCAtLWZyb20gPGRpcj4nLCAnRGlyZWN0b3J5IHRvIHJlYWQgZnJvbScpXHJcblx0Lm9wdGlvbignLXQsIC0tdG8gPGRpcj4nLCAnRGlyZWN0b3J5IHRvIHdyaXRlIHRvJylcclxuXHQub3B0aW9uKCctZCwgLS1kYW5nZXJvdXMnLCAnVGhyb3cgc3dpdGNoIHRvIGRpc2FibGUgc2FmZXR5IGNoZWNrcycpXHJcblx0Lm9wdGlvbignLXEsIC0tcXVpZXQnLCAnUnVuIGluIG5vLW91dHB1dCBtb2RlJylcclxuXHQucGFyc2UocHJvY2Vzcy5hcmd2KTtcclxuaWYocHJvZ3JhbS5xdWlldCkge1xyXG5cdGNvbnNvbGUubG9nID0gKCkgPT4ge307XHJcbn1cclxuaWYoIXByb2dyYW0uZnJvbSkge1xyXG5cdGNvbnNvbGUubG9nKCdzd2l0Y2ggLWYgbm90IGZvdW5kLCBydW4ga2FuZ3JhdCAtLWhlbHAgZm9yIGhlbHAnKTtcclxuXHRwcm9jZXNzLmV4aXQoMSk7XHJcbn1cclxuaWYoIXByb2dyYW0udG8pIHtcclxuXHRjb25zb2xlLmxvZygnc3dpdGNoIC10IG5vdCBmb3VuZCwgcnVuIGthbmdyYXQgLS1oZWxwIGZvciBoZWxwJyk7XHJcblx0cHJvY2Vzcy5leGl0KDEpO1xyXG59XHJcbmFzeW5jIGZ1bmN0aW9uIHJ1biAoZnJvbTogc3RyaW5nLCB0bzogc3RyaW5nLCBkYW5nZXJvdXM6IGJvb2xlYW4gPSBmYWxzZSkge1xyXG5cdGxldCBzYXZlOiBTYXZlRmlsZSA9IG5ldyBTYXZlRmlsZSgpO1xyXG5cdGF3YWl0IHNhdmUucmVhZEZyb20oZnJvbSk7XHJcblx0bGV0IGJ1aWxkOiBOQkJ1aWxkID0gbmV3IE5CQnVpbGQoc2F2ZSwgdG8pO1xyXG5cdGF3YWl0IGJ1aWxkLmJ1aWxkQWxsKGRhbmdlcm91cyk7XHJcbn07XHJcbnJ1bihwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgcHJvZ3JhbS5mcm9tKSwgcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksIHByb2dyYW0udG8pLCBwcm9ncmFtLmRhbmdlcm91cyk7XHJcblxyXG4vL3RoaXMgaXMgaW4gY2FzZSBhbnlvbmUgd2FudHMgdGhlIGNsYXNzZXNcclxuZXhwb3J0IHtcclxuXHRTYXZlRmlsZSxcclxuXHRTYWZldHlDaGVjayxcclxuXHRydW4gYXMgYnVpbGRcclxufSJdfQ==