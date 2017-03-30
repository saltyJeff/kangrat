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
(() => __awaiter(this, void 0, void 0, function* () {
    let save = new SaveFile_1.SaveFile();
    yield save.readFrom(path.resolve(process.cwd(), program.from));
    let build = new NBBuild_1.NBBuild(save, path.resolve(process.cwd(), program.to));
    yield build.buildAll(!program.dangerous);
}))();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBLHlDQUFvQztBQUNwQyx1Q0FBa0M7QUFDbEMsNkJBQTZCO0FBQzdCLHFDQUFxQztBQUVyQyxPQUFPO0tBQ0wsT0FBTyxDQUFDLE9BQU8sQ0FBQztLQUNoQixNQUFNLENBQUMsa0JBQWtCLEVBQUUsd0JBQXdCLENBQUM7S0FDcEQsTUFBTSxDQUFDLGdCQUFnQixFQUFFLHVCQUF1QixDQUFDO0tBQ2pELE1BQU0sQ0FBQyxpQkFBaUIsRUFBRSx1Q0FBdUMsQ0FBQztLQUNsRSxNQUFNLENBQUMsYUFBYSxFQUFFLHVCQUF1QixDQUFDO0tBQzlDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDdEIsRUFBRSxDQUFBLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDbEIsT0FBTyxDQUFDLEdBQUcsR0FBRyxRQUFPLENBQUMsQ0FBQztBQUN4QixDQUFDO0FBQ0QsRUFBRSxDQUFBLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUNsQixPQUFPLENBQUMsR0FBRyxDQUFDLGtEQUFrRCxDQUFDLENBQUM7SUFDaEUsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNqQixDQUFDO0FBQ0QsRUFBRSxDQUFBLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNoQixPQUFPLENBQUMsR0FBRyxDQUFDLGtEQUFrRCxDQUFDLENBQUM7SUFDaEUsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNqQixDQUFDO0FBQ0QsQ0FBQztJQUNBLElBQUksSUFBSSxHQUFhLElBQUksbUJBQVEsRUFBRSxDQUFDO0lBQ3BDLE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUMvRCxJQUFJLEtBQUssR0FBWSxJQUFJLGlCQUFPLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ2hGLE1BQU0sS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUMxQyxDQUFDLENBQUEsQ0FBQyxFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIjISAvdXNyL2Jpbi9lbnYgbm9kZVxyXG5pbXBvcnQge1NhdmVGaWxlfSBmcm9tICcuL1NhdmVGaWxlJztcclxuaW1wb3J0IHtOQkJ1aWxkfSBmcm9tICcuL05CQnVpbGQnO1xyXG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xyXG5pbXBvcnQgKiBhcyBwcm9ncmFtIGZyb20gJ2NvbW1hbmRlcic7XHJcblxyXG5wcm9ncmFtXHJcblx0LnZlcnNpb24oJzEuMC4wJylcclxuXHQub3B0aW9uKCctZiwgLS1mcm9tIDxkaXI+JywgJ0RpcmVjdG9yeSB0byByZWFkIGZyb20nKVxyXG5cdC5vcHRpb24oJy10LCAtLXRvIDxkaXI+JywgJ0RpcmVjdG9yeSB0byB3cml0ZSB0bycpXHJcblx0Lm9wdGlvbignLWQsIC0tZGFuZ2Vyb3VzJywgJ1Rocm93IHN3aXRjaCB0byBkaXNhYmxlIHNhZmV0eSBjaGVja3MnKVxyXG5cdC5vcHRpb24oJy1xLCAtLXF1aWV0JywgJ1J1biBpbiBuby1vdXRwdXQgbW9kZScpXHJcblx0LnBhcnNlKHByb2Nlc3MuYXJndik7XHJcbmlmKHByb2dyYW0ucXVpZXQpIHtcclxuXHRjb25zb2xlLmxvZyA9ICgpID0+IHt9O1xyXG59XHJcbmlmKCFwcm9ncmFtLmZyb20pIHtcclxuXHRjb25zb2xlLmxvZygnc3dpdGNoIC1mIG5vdCBmb3VuZCwgcnVuIGthbmdyYXQgLS1oZWxwIGZvciBoZWxwJyk7XHJcblx0cHJvY2Vzcy5leGl0KDEpO1xyXG59XHJcbmlmKCFwcm9ncmFtLnRvKSB7XHJcblx0Y29uc29sZS5sb2coJ3N3aXRjaCAtdCBub3QgZm91bmQsIHJ1biBrYW5ncmF0IC0taGVscCBmb3IgaGVscCcpO1xyXG5cdHByb2Nlc3MuZXhpdCgxKTtcclxufVxyXG4oYXN5bmMgKCkgPT4ge1xyXG5cdGxldCBzYXZlOiBTYXZlRmlsZSA9IG5ldyBTYXZlRmlsZSgpO1xyXG5cdGF3YWl0IHNhdmUucmVhZEZyb20ocGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksIHByb2dyYW0uZnJvbSkpO1xyXG5cdGxldCBidWlsZDogTkJCdWlsZCA9IG5ldyBOQkJ1aWxkKHNhdmUsIHBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCBwcm9ncmFtLnRvKSk7XHJcblx0YXdhaXQgYnVpbGQuYnVpbGRBbGwoIXByb2dyYW0uZGFuZ2Vyb3VzKTtcclxufSkoKTtcclxuIl19