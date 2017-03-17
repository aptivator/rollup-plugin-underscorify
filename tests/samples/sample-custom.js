/* globals assert _ */
import sampleTpl from './templates/sample.html';

assert.equal(sampleTpl({username: 'Dmitriy', _}).trim(), '<h2>Welcome Dmitriy</h2><h3>true,1</h3>');
