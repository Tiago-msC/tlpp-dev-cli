import { expect, test } from '@oclif/test';
import inquirer from 'inquirer';
import sinon from 'sinon';

import {GenerateService} from '../../../src/services/generate.js'

describe('new', () => {
  let stub: sinon.SinonStub;

  afterEach(() => {
    stub.restore();
  });

  test
    .stdout()
    .do(() => {
      stub = sinon.stub(inquirer, 'prompt').resolves({ type: 'api' });
    })
    .command(['new'])
    .it('run new command with api choices', ctx => {
      expect(ctx.stdout).to.contain('api');
    });
  
  test
    .stdout()
    .do(() => {
      stub = sinon.stub(inquirer, 'prompt').resolves({ name: 'test' });
      sinon.stub(GenerateService.prototype, 'tests').callsFake(async () => {
        console.log('test');
      });
    })
    .command(['new', 'test'])
    .it('run new command with test argument', ctx => {
      expect(ctx.stdout).to.contain('test');
    });
});