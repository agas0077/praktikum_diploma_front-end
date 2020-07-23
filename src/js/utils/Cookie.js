export default class Cookie {
  getACookieValue(cookieName) {
    const arr = document.cookie.split(/;\s/);
    const whatToFind = new RegExp(`^${cookieName}`);
    const cookie = arr.find((item) => {
      if (whatToFind.test(item)) {
        return item;
      }
      return '';
    });
    let toReturn = cookie ? cookie.split('=')[1] : null;
    toReturn = decodeURIComponent(toReturn);
    return toReturn;
  }
}
