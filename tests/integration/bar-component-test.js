import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | Bar-component', (hooks) => {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // If you change this to "await render(hbs``);", serving the app locally
    // works fine when visiting /bar
    await render(hbs`<BarComponent/>`);

    assert.ok(true);
  });
});
