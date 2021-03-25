'use strict';
database.ref('share').once('value', snapshot => {
  const val = snapshot.val() ?? {};
  Object.values(val).forEach(value => {
    const {name, url} = value;
    const [li, a] = ['li', 'a'].map(tag => document.createElement(tag));
    a.download = name;
    a.href = url;
    a.textContent = name;
    li.appendChild(a);
    list.appendChild(li);
  });
});
