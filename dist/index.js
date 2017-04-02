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
const NBBuild_1 = require("./NBBuild");
const SafetyCheck_1 = require("./SafetyCheck");
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
;
run(path.resolve(process.cwd(), program.from), path.resolve(process.cwd(), program.to), program.dangerous);
module.exports = {
    SaveFile: SaveFile_1.SaveFile,
    SafetyCheck: SafetyCheck_1.SafetyCheck,
    build: run
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBLHlDQUFvQztBQUNwQyx1Q0FBa0M7QUFDbEMsK0NBQTBDO0FBQzFDLDZCQUE2QjtBQUM3QixxQ0FBcUM7QUFFckMsT0FBTztLQUNMLE9BQU8sQ0FBQyxPQUFPLENBQUM7S0FDaEIsTUFBTSxDQUFDLGtCQUFrQixFQUFFLHdCQUF3QixDQUFDO0tBQ3BELE1BQU0sQ0FBQyxnQkFBZ0IsRUFBRSx1QkFBdUIsQ0FBQztLQUNqRCxNQUFNLENBQUMsaUJBQWlCLEVBQUUsdUNBQXVDLENBQUM7S0FDbEUsTUFBTSxDQUFDLGFBQWEsRUFBRSx1QkFBdUIsQ0FBQztLQUM5QyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3RCLEVBQUUsQ0FBQSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ2xCLE9BQU8sQ0FBQyxHQUFHLEdBQUcsUUFBTyxDQUFDLENBQUM7QUFDeEIsQ0FBQztBQUNELEVBQUUsQ0FBQSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDbEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrREFBa0QsQ0FBQyxDQUFDO0lBQ2hFLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDakIsQ0FBQztBQUNELEVBQUUsQ0FBQSxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDaEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrREFBa0QsQ0FBQyxDQUFDO0lBQ2hFLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDakIsQ0FBQztBQUNELGFBQW9CLElBQVksRUFBRSxFQUFVLEVBQUUsWUFBcUIsS0FBSzs7UUFDdkUsSUFBSSxJQUFJLEdBQWEsSUFBSSxtQkFBUSxFQUFFLENBQUM7UUFDcEMsTUFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzFCLElBQUksS0FBSyxHQUFZLElBQUksaUJBQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDM0MsTUFBTSxLQUFLLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7Q0FBQTtBQUFBLENBQUM7QUFDRixHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLE9BQU8sQ0FBQyxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7QUFFM0csTUFBTSxDQUFDLE9BQU8sR0FBRztJQUNoQixRQUFRLEVBQUUsbUJBQVE7SUFDbEIsV0FBVyxFQUFFLHlCQUFXO0lBQ3hCLEtBQUssRUFBRSxHQUFHO0NBQ1YsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIiMhIC91c3IvYmluL2VudiBub2RlXHJcbmltcG9ydCB7U2F2ZUZpbGV9IGZyb20gJy4vU2F2ZUZpbGUnO1xyXG5pbXBvcnQge05CQnVpbGR9IGZyb20gJy4vTkJCdWlsZCc7XHJcbmltcG9ydCB7U2FmZXR5Q2hlY2t9IGZyb20gJy4vU2FmZXR5Q2hlY2snO1xyXG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xyXG5pbXBvcnQgKiBhcyBwcm9ncmFtIGZyb20gJ2NvbW1hbmRlcic7XHJcblxyXG5wcm9ncmFtXHJcblx0LnZlcnNpb24oJzEuMC4wJylcclxuXHQub3B0aW9uKCctZiwgLS1mcm9tIDxkaXI+JywgJ0RpcmVjdG9yeSB0byByZWFkIGZyb20nKVxyXG5cdC5vcHRpb24oJy10LCAtLXRvIDxkaXI+JywgJ0RpcmVjdG9yeSB0byB3cml0ZSB0bycpXHJcblx0Lm9wdGlvbignLWQsIC0tZGFuZ2Vyb3VzJywgJ1Rocm93IHN3aXRjaCB0byBkaXNhYmxlIHNhZmV0eSBjaGVja3MnKVxyXG5cdC5vcHRpb24oJy1xLCAtLXF1aWV0JywgJ1J1biBpbiBuby1vdXRwdXQgbW9kZScpXHJcblx0LnBhcnNlKHByb2Nlc3MuYXJndik7XHJcbmlmKHByb2dyYW0ucXVpZXQpIHtcclxuXHRjb25zb2xlLmxvZyA9ICgpID0+IHt9O1xyXG59XHJcbmlmKCFwcm9ncmFtLmZyb20pIHtcclxuXHRjb25zb2xlLmxvZygnc3dpdGNoIC1mIG5vdCBmb3VuZCwgcnVuIGthbmdyYXQgLS1oZWxwIGZvciBoZWxwJyk7XHJcblx0cHJvY2Vzcy5leGl0KDEpO1xyXG59XHJcbmlmKCFwcm9ncmFtLnRvKSB7XHJcblx0Y29uc29sZS5sb2coJ3N3aXRjaCAtdCBub3QgZm91bmQsIHJ1biBrYW5ncmF0IC0taGVscCBmb3IgaGVscCcpO1xyXG5cdHByb2Nlc3MuZXhpdCgxKTtcclxufVxyXG5hc3luYyBmdW5jdGlvbiBydW4gKGZyb206IHN0cmluZywgdG86IHN0cmluZywgZGFuZ2Vyb3VzOiBib29sZWFuID0gZmFsc2UpIHtcclxuXHRsZXQgc2F2ZTogU2F2ZUZpbGUgPSBuZXcgU2F2ZUZpbGUoKTtcclxuXHRhd2FpdCBzYXZlLnJlYWRGcm9tKGZyb20pO1xyXG5cdGxldCBidWlsZDogTkJCdWlsZCA9IG5ldyBOQkJ1aWxkKHNhdmUsIHRvKTtcclxuXHRhd2FpdCBidWlsZC5idWlsZEFsbChkYW5nZXJvdXMpO1xyXG59O1xyXG5ydW4ocGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksIHByb2dyYW0uZnJvbSksIHBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCBwcm9ncmFtLnRvKSwgcHJvZ3JhbS5kYW5nZXJvdXMpO1xyXG4vL3RoaXMgaXMgaW4gY2FzZSBhbnlvbmUgd2FudHMgdGhlIGNsYXNzZXNcclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblx0U2F2ZUZpbGU6IFNhdmVGaWxlLFxyXG5cdFNhZmV0eUNoZWNrOiBTYWZldHlDaGVjayxcclxuXHRidWlsZDogcnVuXHJcbn0iXX0=