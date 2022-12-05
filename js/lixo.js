const groupsBy = key => array =>
  array.reduce(
    (objectsByKeyValue, obj) => ({
      ...objectsByKeyValue,
      [obj[key]]: (objectsByKeyValue[obj[key]] || []).concat(obj)
    }),
    {}
  );

  const groupByBrand = groupsBy('brand');
  
  const cars = [
    { brand: 'Audi', color: 'black' },
    { brand: 'Audi', color: 'white' },
    { brand: 'Ferarri', color: 'red' },
    { brand: 'Ford', color: 'white' },
    { brand: 'Peugot', color: 'white' }
  ];
  
  const groupByBrand = groupsBy('brand');
  const groupByColor = groupsBy('color');
  
  console.log(
    JSON.stringify({
      carsByBrand: groupByBrand(cars),
      carsByColor: groupByColor(cars)
    }, null, 2)
  );
