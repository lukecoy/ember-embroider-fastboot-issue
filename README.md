### Issue
Embroider + Fastboot issue which throws exception. In specific scenarios, Webpack is referencing `document.createElement` in Fastboot, which causes reference errors. I didn't see this on Embroider `0.28.0`, but did when upgrading to `0.35.0`.

### Seeing the issue in this repo
This repo reproduces the issue [in this commit](https://github.com/lukecoy/ember-embroider-fastboot-issue/commit/38aaf28b9051a7277e1c1dcdcba5024b6e275158) by enabling code splitting & adding a dependency on `ember-power-select` (Ive seen this issue with other dependencies as well though)

1.) `npm install && ember serve`

2.) Go to `localhost:4200/bar` and see the exception (`ReferenceError: document is not defined`)

3.) Oddly enough, if you do [this](https://github.com/lukecoy/ember-embroider-fastboot-issue/blob/main/tests/integration/bar-component-test.js#L10), then everything works perfectly as expected. 

---


### Misc:
*If it helps, here's the specific steps I did in this repo:*

0.) Add Embroider (`0.35.0`)

1.) Add Fastboot (`ember-cli-fastboot 3.0.0-beta.2`)

2.) Add dependency on an external repo (I use `ember-power-select ^2.x.x` here, but I've seen this same error with other repos as well)

3.) Enable all the Embroider settings described [here](https://github.com/embroider-build/embroider#options) to enable code splitting

4.) Add 2 routes (I used `foo` & `bar`) and 2 corresponding components in those routes (I used `FooComponent` & `BarComponent`)

5.) Add `{{#power-select ...}}` to `BarComponent` 

6.) Add some test text to `FooComponent` as a reference

7.) *Important*: Add 2 integration tests for each component that just do the `await render(...)` in `foo-component-test.js` & `bar-component-test.js`

8.) Observe the exception when visiting `/bar`:
```
ReferenceError: document is not defined
    at Function.requireEnsure [as e] (/var/folders/jl/71dybhnj1zvcmkhj50vmjzbw0000gn/T/broccoli-8738901D5cd9H2gma/out-253-packager_runner_embroider_webpack/assets/chunk.5b7e63d4f16ef67e9215.js:116:27)
    at Object.load (webpack:///./assets/ember-embroider-fastboot-issue.js?:104:60)
    at PrivateRouter.name [as getRoute] (webpack:///./node_modules/@embroider/router/index.js?:87:23)
    at UnresolvedRouteInfoByParam.fetchRoute (/var/folders/jl/71dybhnj1zvcmkhj50vmjzbw0000gn/T/broccoli-8738901D5cd9H2gma/out-253-packager_runner_embroider_webpack/assets/router_js.js:830:1)
...
```
9.) Again, if you edit the test to do [this](https://github.com/lukecoy/ember-embroider-fastboot-issue/blob/main/tests/integration/bar-component-test.js#L10), then everything works perfectly as expected.
