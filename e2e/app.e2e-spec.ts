import { AppPage } from './app.po';
import { browser, by, element } from 'protractor';

describe('angular-weather App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateTo();
  });

  it('should display app title', () => {
    expect(element.all(by.css('.navbar-brand')).last().getText()).toEqual('AgileSphere coding test - The Weather App');
  });

  it('should display city weather for searching London City', () => {
    const searchInput = 'London'
    page.setSearchInput(searchInput);
    page.clickSearch();

    const result = page.getLastRowFirstCellData();
    expect(result).toContain(searchInput)

  });

  it('should display error when search unknown city', () => {
    const searchInput = 'x'
    page.setSearchInput(searchInput);
    page.clickSearch();

    expect(page.getError()).toBeTruthy()

  });


});
