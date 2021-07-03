const brandArr = [
  'BMW',
  'Tesla',
  'Mercedes-Benz',
  'Audi',
  'Hyundai',
  'Honda',
  'Nissan',
  'Volkswagen',
  'Toyota',
  'Bentley',
];

const modelArr = [
  'i8',
  'A3',
  'Accord',
  'Huracan',
  'Armada',
  'Atlas',
  'Camry',
  'Civic',
  'EcoSport',
  'Uru',
];

export const randomName = () => {
  const result = [];
  for (let i = 0; i < brandArr.length; i += 1) {
    for (let j = 0; j < brandArr.length; j += 1) {
      result.push(`${brandArr[i]} ${modelArr[j]}`);
    }
  }
  return result;
};
