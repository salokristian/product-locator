
function compare(a, b) {
  if (a.distance < b.distance) return -1;
  if (a.distance > b.distance) return 1;
  return 0;
}

export async function getStoreList() {
  // const stores = [
  //   { name: 'prisma', distance: 100, id: 0 },
  //   { name: 'alepa', distance: 13, id: 1 },
  //   { name: 'alko', distance: 3, id: 2 },
  //   { name: 'k-kauppa', distance: 303, id: 3 },
  // ];
  // for (let i = 0; i < 50; i += 1) {
  //   stores.push({
  //     name: `kauppa-${Math.floor(Math.random() * 1000)}`,
  //     distance: (Math.floor(Math.random() * 1000)),
  //     id: (Math.floor(Math.random() * 1000000)),
  //   });
  // }

  return fetch('https://productlocator.herokuapp.com/')
    .then(response => response.json())
    .then(data => {

      console.log("storeapi.js: " + data);
      return data.map((store) => (
        {
          ...store,
          distance: store.location,
        }
      ));
    });

  // return stores.sort(compare);
}

function getStoresByName(text) {
  const stores = getStoreList();
  const filtered = stores.filter(store => store.name.toLowerCase().includes(text.toLowerCase()));
  return filtered.sort(compare);
}

export {
  // getStoreList,
  getStoresByName
};