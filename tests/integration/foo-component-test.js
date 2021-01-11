import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | Foo-component', (hooks) => {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`<FooComponent/>`);

    assert.ok(true);

  });
});
