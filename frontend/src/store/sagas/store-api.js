
function compare(a, b) {
  if (a.distance < b.distance) return -1;
  if (a.distance > b.distance) return 1;
  return 0;
}

export default function getList() {
  return [
    { name: 'prisma', distance: 100, id: 0 },
    { name: 'alepa', distance: 13, id: 1 },
    { name: 'alko', distance: 3, id: 2 },
    { name: 'k-kauppa', distance: 303, id: 3 }
  ].sort(compare); 
}