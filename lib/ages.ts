function getAge() {
  const today = new Date();
  const birthDate = new Date(2005, 9, 25); // 0-based měsíc → 9 = říjen
  const diff = today.getTime() - birthDate.getTime();
  const years = Math.floor(diff / (365.25 * 24 * 60 * 60 * 1000));
  return years;
}

function getFakeTubeAge() {
  // Oprava: měsíc je 0-based → 11 = prosinec
  const created = new Date(2016, 11, 28);
  const today = new Date();

  let years = today.getFullYear() - created.getFullYear();
  let months = today.getMonth() - created.getMonth();

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return { years, months };
}

export { getAge, getFakeTubeAge };