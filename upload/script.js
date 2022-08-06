'use strict';
let SELECTED_FILE = null;
picker.addEventListener('change', ({target: {files}}) => SELECTED_FILE = files, false);
upload.addEventListener('click', () => {
  [].slice.call(SELECTED_FILE ?? []).forEach(file => {
    const {name} = file;
    const ref = storage.ref(`files/${name}`);
    ref.put(file).then(snapshot => ref.getDownloadURL().then(url => {
      database.ref('share').push({name, url});
      window.alert(`password: ${Date.now()}`);
    }));
  });
  SELECTED_FILE = null;
}, false);
