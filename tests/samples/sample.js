/* globals assert */

import sampleTpl from './templates/sample.tpl';

assert.equal(sampleTpl({username: 'Dmitriy'}).trim(), '<h2>Welcome Dmitriy</h2>');
