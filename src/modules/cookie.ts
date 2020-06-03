export const cookie = {
  set: (
    cname: String,
    cvalue: string | number | null,
    exHours: number | null
  ) => {
    if (exHours) {
      const d = new Date();
      d.setTime(d.getTime() + exHours * 60 * 60 * 1000);
      const expires = 'expires=' + d.toUTCString();
      document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
    } else {
      document.cookie = cname + '=' + cvalue;
    }
  },

  get: (cname: String) => {
    const name = cname + '=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  },
};
