export function setModelUrl(model_url) {
  const Store = require('electron-store');
  const store = new Store();

  store.set("MODEL_URL", model_url);
}

export function setAction(action) {

  const Store = require('electron-store');
  const store = new Store();

  store.set("ACTION", action);
}

export function getConfiguration() {

  const Store = require('electron-store');
  const store = new Store();

  let configuration = {};
  configuration["model_url"] = store.get("MODEL_URL");
  configuration["action"] = store.get("ACTION");
  return configuration;
}

export function setSlackURL(url) {
  const Store = require('electron-store');
  const store = new Store();
  store.set("SLACKURL",url)

}

export function getSlackURL() {
  const Store = require('electron-store');
  const store = new Store();
  return store.get("SLACKURL")

}

export function setSlackActive(isActive) {
  const Store = require('electron-store');
  const store = new Store();
  store.set("IS_SLACK_ACTIVE",isActive)
}

export function getSlackActive() {
  const Store = require('electron-store');
  const store = new Store();
  return store.get("IS_SLACK_ACTIVE")
}


export function setTelegramActive(isActive) {
  const Store = require('electron-store');
  const store = new Store();
  store.set("IS_SLACK_ACTIVE",isActive)
}

export function getTelegramActive() {
  const Store = require('electron-store');
  const store = new Store();
  return store.get("IS_SLACK_ACTIVE")
}

export function setTelegramConfig(token,chatId) {
  const Store = require('electron-store');
  const store = new Store();
  store.set('TOKEN',token);
  store.set('CHATID',chatId)
}

export function getTelegramConfig() {
  const Store = require('electron-store');
  const store = new Store();

  let configuration = {};
  configuration["token"] = store.get("TOKEN");
  configuration["chatId"] = store.get("CHATID");
  return configuration;
}
