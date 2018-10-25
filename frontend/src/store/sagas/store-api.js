
function compare(a, b) {
  if (a.distance < b.distance) return -1;
  if (a.distance > b.distance) return 1;
  return 0;
}

export default function getList() {
  const stores = [
    { name: 'prisma', distance: 100, id: 0 },
    { name: 'alepa', distance: 13, id: 1 },
    { name: 'alko', distance: 3, id: 2 },
    { name: 'k-kauppa', distance: 303, id: 3 },
  ];
  for (let i = 0; i < 50; i += 1) {
    stores.push({
      name: `kauppa-${Math.floor(Math.random() * 1000)}`,
      distance: (Math.floor(Math.random() * 1000)),
      id: (Math.floor(Math.random() * 10000)),
    });
  }
  return stores.sort(compare);
}