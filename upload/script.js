'use strict';
let SELECTED_FILE = null;
picker.addEventListener('change', event => SELECTED_FILE = event.target.files);
upload.addEventListener('click', event => {
  if (SELECTED_FILE === null) return;
  [].slice.call(SELECTED_FILE).forEach(file => {
    const ref = storage.ref(`uploaded/${file.name.split('.')[0]}`);
    ref.put(file).then(snapshot => ref.getDownloadURL().then(url => database.ref('share').push({
      name: file.name,
      url: url
    })).catch(console.error)).catch(console.error);
  });
  SELECTED_FILE = null;
});
