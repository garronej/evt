### **1.11.2** (2022-06-01)  
  
- Fix useRerenderOnStateChange    
  
### **1.11.1** (2022-06-01)  
  
- Correct error in useEvt    
  
## **1.11.0** (2022-06-01)  
  
- hooks compat React 18  
- Create init-onyxia.sh  
- Merge pull request #24 from garronej/dependabot/npm_and_yarn/shelljs-0.8.5

Bump shelljs from 0.8.4 to 0.8.5    
  
### **1.10.2** (2021-12-23)  
  
- Fix for Deno 1.17  
- Update README.md  
- Update README.md  
- Update README.md    
  
### **1.10.1** (2021-07-20)  
  
-  #21: Feat distinct operator    
  
## **1.10.0** (2021-07-20)  
  
- #21: Feat distinct operator    
  
### **1.9.14** (2021-05-08)  
  
- Deno fix: tools/inDepth --no-check compat    
  
### **1.9.13** (2021-04-16)  
  
- #19: Fix compat with Deno v1.9    
  
### **1.9.12** (2020-12-29)  
  
- Support --no-check deno flag  
- Add React example in the readme    
  
### **1.9.11** (2020-12-05)  
  
- Indicate that v2 is under devloppement.    
  
### **1.9.10** (2020-11-25)  
  
- Fix issue related to strict mode hooks/useEvt    
  
### **1.9.9** (2020-11-16)  
  
- Create publish-beta.yaml    
  
### **1.9.8** (2020-11-16)  
  
- Add nonNullable operator    
  
### **1.9.7** (2020-11-15)  
  
- Add tools/typeSafety/PromiseOrNot helper type    
  
### **1.9.6** (2020-11-15)  
  
- Improve Evt.asyncPipe()    
  
### **1.9.5** (2020-11-14)  
  
- Ensure semantic guarantee for hooks/useEvt    
  
### **1.9.4** (2020-11-10)  
  
- Add the Id helper type in tools/typeSafety/id    
  
### **1.9.3** (2020-11-09)  
  
- Add tools/typeSafety/MethodNames    
  
### **1.9.2** (2020-10-29)  
  
- Improve error stack trace of tools/typeSafety/assert    
  
### **1.9.1** (2020-10-28)  
  
- Make EventEmitter.removeListener easily emulable    
  
## **1.9.0** (2020-10-24)  
  
- Add evt.postAndWait()    
  
### **1.8.11** (2020-10-22)  
  
- Fix TypeScript error in Evt.asNonPostable.d.ts '=' expected. TS1005
(create-react-app) Use of import type was breaking the TypeScript retroconpatibility.    
  
### **1.8.10** (2020-09-14)  
  
- Merge pull request #14 from garronej/issue-12-support-strict-type-import-export

Issue 12 support strict type import export ( fix for retrocompat )  
- Use --unstable flag to run tests  
- CI workflow runs test on Windows as well  
- fix: missed some
fix: add type imports to test files  
- fix: use import/export type syntax for types  
- Merge pull request #11 from garronej/dependabot/npm_and_yarn/node-fetch-2.6.1

Bump node-fetch from 2.6.0 to 2.6.1  
- Update README.md  
- Update README.md    
  
### **1.8.9** (2020-09-03)  
  
- add Evt.asyncPipe (as a static method until async operator lands)    
  
### **1.8.8** (2020-08-28)  
  
- Hooks denoified as well  
- Update README.md    
  
### **1.8.6** (2020-08-08)  
  
- Advertise React Hooks integration    
  
### **1.8.5** (2020-08-07)  
  
- Merge pull request #8 from garronej/dependabot/npm_and_yarn/lodash-4.17.19

Bump lodash from 4.17.15 to 4.17.19  
- Fix issue #9: Bug with Evt.from(window,...)    
  
### **1.8.4** (2020-08-05)  
  
- Switch back to tag name prefixed with 'v'  
- fix useEvt hook for verry slow browser    
  
### **1.8.3** (2020-07-31)  
  
- Add documentation for react hooks    
  
### **1.8.2** (2020-07-31)  
  
- Fix for useEvt on Safari    
  
### **1.8.1** (2020-07-28)  
  
- fix bug in hooks/useStatefulEvt  
- Add missing 'attachExtract' overloads    
  
## **1.8.0** (2020-07-24)  
  
- Add hooks for react integration    
  
### **1.7.14** (2020-07-19)  
  
- update dependencies    
  
### **1.7.13** (2020-06-14)  
  
- Add JSDoc link to Evt.merge  
- update deps  
- Update project description  
- Reference Denoify in the readme  
- include who is using it sectiion    
  
### **1.7.12** (2020-05-30)  
  
- Reference Denoify in the readme  
- Update README.md    
  
### **1.7.11** (2020-05-25)  
  
  
  
### **1.7.11** (2020-05-25)  
  
- Re include source map without breaking TS retro compatibility  
  
### **1.7.10** (2020-05-25)  
  
- Fix: Include CDN build    
  
### **1.7.9** (2020-05-24)  
  
- Do not include source in the NPM bundle for TS retro compatibility (they will be re-included later)
  
### **1.7.8** (2020-05-24)  
  
- Remove nullish coalescing from source for stackblitz compat  
  
### **1.7.7** (2020-05-24)  
  
- Not including source test files in the NPM bundle  
- readme typo fix    
  
### **1.7.6** (2020-05-23)  
  
- Make the README links visible on deno.land/x  
- Merge pull request #7 from searchableguy/develop
- Add a note in overview about difference between attach and $attach  
- Update run-exclusive    
  
### **1.7.5** (2020-05-23)  
  
- Bump version ( changelog ignore )  
- Use test/mod.ts instead of test/index_deno.ts to align with conventions  
- Enable source map, 'Go to Definition' navigate to .ts source file instead of .d.ts file  
- Revert back to the old type import syntax and regain support for TS 3.4 - 3.7, WARNING: This release do not work with Deno 1.0.1 but do work with 1.0.2  
- Typo fixes
  
### **1.7.4** (2020-05-22)  
  
- GitBook: [develop] one page modified  
- instruct to refer to CHANGELOG.md  
- GitBook: [develop] one page modified  
- GitBook: [develop] 32 pages and one asset modified    
  
### **1.7.3** (2020-05-21)  
  
- fix for supporting Deno v1.0.1, temporary dropping support for TS < 3.8    
  
### **1.7.2** (2020-05-21)  
  
- Notice about the fact EVT won't work on Deno 1.0.1  
- GitBook: [develop] 17 pages and one asset modified    
  
### **1.7.1** (2020-05-21)  
  
- Temporarily disabling sourcemaps  
- Add CI badge    
  

### **1.7.0** (2020-05-21)  
  
- Includes CDN build to import from HTML.
- Enable short path ( Breaking change ) ``evt/dist/tools/typeSafety`` => ``evt/tools/typeSafety``
