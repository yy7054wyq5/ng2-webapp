const url = location.href;
const index = url.indexOf('appTag=');
let appTag = url.substring(index + 7, index + 13);
if (index === -1) {
  appTag = 'CcYgnu';
}
export { appTag }
