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
const KangratBuild_1 = require("./KangratBuild");
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
;
run(path.resolve(process.cwd(), program.from), path.resolve(process.cwd(), program.to), program.dangerous);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vcnVuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQ0EseUNBQW9DO0FBQ3BDLGlEQUE0QztBQUc1Qyw2QkFBNkI7QUFDN0IscUNBQXFDO0FBRXJDLE9BQU87S0FDTCxPQUFPLENBQUMsT0FBTyxDQUFDO0tBQ2hCLE1BQU0sQ0FBQyxrQkFBa0IsRUFBRSx3QkFBd0IsQ0FBQztLQUNwRCxNQUFNLENBQUMsZ0JBQWdCLEVBQUUsdUJBQXVCLENBQUM7S0FDakQsTUFBTSxDQUFDLGlCQUFpQixFQUFFLHVDQUF1QyxDQUFDO0tBQ2xFLE1BQU0sQ0FBQyxhQUFhLEVBQUUsdUJBQXVCLENBQUM7S0FDOUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN0QixFQUFFLENBQUEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUNsQixPQUFPLENBQUMsR0FBRyxHQUFHLFFBQU8sQ0FBQyxDQUFDO0FBQ3hCLENBQUM7QUFDRCxFQUFFLENBQUEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ2xCLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0RBQWtELENBQUMsQ0FBQztJQUNoRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2pCLENBQUM7QUFDRCxFQUFFLENBQUEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ2hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0RBQWtELENBQUMsQ0FBQztJQUNoRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2pCLENBQUM7QUFDRCxhQUFvQixJQUFZLEVBQUUsRUFBVSxFQUFFLFlBQXFCLEtBQUs7O1FBQ3ZFLElBQUksSUFBSSxHQUFhLElBQUksbUJBQVEsRUFBRSxDQUFDO1FBQ3BDLE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxQixJQUFJLEtBQUssR0FBaUIsSUFBSSwyQkFBWSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNyRCxNQUFNLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNsQyxDQUFDO0NBQUE7QUFBQSxDQUFDO0FBQ0YsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxPQUFPLENBQUMsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiIyEgL3Vzci9iaW4vZW52IG5vZGVcclxuaW1wb3J0IHtTYXZlRmlsZX0gZnJvbSAnLi9TYXZlRmlsZSc7XHJcbmltcG9ydCB7S2FuZ3JhdEJ1aWxkfSBmcm9tICcuL0thbmdyYXRCdWlsZCc7XHJcbmltcG9ydCB7U2FmZXR5Q2hlY2t9IGZyb20gJy4vU2FmZXR5Q2hlY2snO1xyXG5pbXBvcnQgKiBhcyBGaWxlVHlwZXMgZnJvbSAnLi9GaWxlVHlwZXMnO1xyXG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xyXG5pbXBvcnQgKiBhcyBwcm9ncmFtIGZyb20gJ2NvbW1hbmRlcic7XHJcblxyXG5wcm9ncmFtXHJcblx0LnZlcnNpb24oJzEuMC4wJylcclxuXHQub3B0aW9uKCctZiwgLS1mcm9tIDxkaXI+JywgJ0RpcmVjdG9yeSB0byByZWFkIGZyb20nKVxyXG5cdC5vcHRpb24oJy10LCAtLXRvIDxkaXI+JywgJ0RpcmVjdG9yeSB0byB3cml0ZSB0bycpXHJcblx0Lm9wdGlvbignLWQsIC0tZGFuZ2Vyb3VzJywgJ1Rocm93IHN3aXRjaCB0byBkaXNhYmxlIHNhZmV0eSBjaGVja3MnKVxyXG5cdC5vcHRpb24oJy1xLCAtLXF1aWV0JywgJ1J1biBpbiBuby1vdXRwdXQgbW9kZScpXHJcblx0LnBhcnNlKHByb2Nlc3MuYXJndik7XHJcbmlmKHByb2dyYW0ucXVpZXQpIHtcclxuXHRjb25zb2xlLmxvZyA9ICgpID0+IHt9O1xyXG59XHJcbmlmKCFwcm9ncmFtLmZyb20pIHtcclxuXHRjb25zb2xlLmxvZygnc3dpdGNoIC1mIG5vdCBmb3VuZCwgcnVuIGthbmdyYXQgLS1oZWxwIGZvciBoZWxwJyk7XHJcblx0cHJvY2Vzcy5leGl0KDEpO1xyXG59XHJcbmlmKCFwcm9ncmFtLnRvKSB7XHJcblx0Y29uc29sZS5sb2coJ3N3aXRjaCAtdCBub3QgZm91bmQsIHJ1biBrYW5ncmF0IC0taGVscCBmb3IgaGVscCcpO1xyXG5cdHByb2Nlc3MuZXhpdCgxKTtcclxufVxyXG5hc3luYyBmdW5jdGlvbiBydW4gKGZyb206IHN0cmluZywgdG86IHN0cmluZywgZGFuZ2Vyb3VzOiBib29sZWFuID0gZmFsc2UpIHtcclxuXHRsZXQgc2F2ZTogU2F2ZUZpbGUgPSBuZXcgU2F2ZUZpbGUoKTtcclxuXHRhd2FpdCBzYXZlLnJlYWRGcm9tKGZyb20pO1xyXG5cdGxldCBidWlsZDogS2FuZ3JhdEJ1aWxkID0gbmV3IEthbmdyYXRCdWlsZChzYXZlLCB0byk7XHJcblx0YXdhaXQgYnVpbGQuYnVpbGRBbGwoIWRhbmdlcm91cyk7XHJcbn07XHJcbnJ1bihwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgcHJvZ3JhbS5mcm9tKSwgcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksIHByb2dyYW0udG8pLCBwcm9ncmFtLmRhbmdlcm91cyk7XHJcbiJdfQ==