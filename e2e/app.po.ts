import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }

  getError() {
    return element(by.id('error')).getText();
  }

  setSearchInput(searchKey: string) {
    element(by.id('city')).sendKeys(searchKey);
  }

  clickSearch() {
    element(by.tagName('button')).click();
  }

  getLastRowFirstCellData() {
    const tabledata = element.all(by.css("table"));

    const row = tabledata.all(by.tagName("tr")).last();

    const cell = row.all(by.tagName("td")).first();

    return cell.getText();
  }

}

