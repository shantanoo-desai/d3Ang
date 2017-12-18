import { D3AngPage } from './app.po';

describe('d3-ang App', () => {
  let page: D3AngPage;

  beforeEach(() => {
    page = new D3AngPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
