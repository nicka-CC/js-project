export const getFilteredStructure = (data) => {
  let time = [];
  let weekNumbers = [];
  let teachers = [];

  if (!data) return { time, weekNumbers, teachers };
  console.log("🚀 ~ getFilterStructure ~ data:", data);

  for (let k of data) {
    weekNumbers.push(...Object.keys(k));

    let weekNumberKey = Object.keys(k)[0];
    let currentWeek = k[weekNumberKey];
    for (let currentDay of Object.keys(k[weekNumberKey])) {
      let currentRow = currentWeek[currentDay];

      if (Array.isArray(currentRow) && currentRow.length === 7) {
        time = currentRow.map((column) => column.time);
      }
      teachers = [
        ...teachers,
        ...currentRow.map((column) => column?.lecture?.teacher),
      ];
    }
  }

  weekNumbers = weekNumbers.map((wn) => wn.replaceAll(" ", ""));
  teachers = [...new Set(teachers)];

  time = time.map((t) => ({ value: t, label: t }));
  teachers = teachers.map((t) => ({ value: t, label: t }));
  weekNumbers = weekNumbers.map((w) => ({ value: w, label: w }));

  return { time, teachers, weekNumbers };
};
