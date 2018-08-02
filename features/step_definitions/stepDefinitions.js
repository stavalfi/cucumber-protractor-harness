const angularPage = require('../pages/homePage.js');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const {Given, When, Then} = require('cucumber');

chai.use(chaiAsPromised);
const expect = chai.expect;

Given(/^I go to "(.*)"$/, function (site, callback) {
    angularPage.go(site);
    expect(browser.getTitle()).to.eventually.equal('AngularJS — Superheroic JavaScript MVW Framework');
    callback();
});
When(/^I add "(.*)" in the task field$/, function (task, callback) {
    angularPage.addTask(task);
    callback();
});
When(/^I click the add button$/, function (callback) {
    angularPage.submitTask();
    callback();
});
Then(/^I should see my new task in the list$/, function (callback) {
    const todoList = angularPage.angularHomepage.todoList;
    expect(todoList.count()).to.eventually.equal(3);
    expect(todoList.get(2).getText()).to.eventually.equal('Be Awesome');
    callback();
});
