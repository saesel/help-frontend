export function dataFormatter(dataString) {
  const meses = [
    "janeiro",
    "fevereiro",
    "março",
    "abril",
    "maio",
    "junho",
    "julho",
    "agosto",
    "setembro",
    "outubro",
    "novembro",
    "dezembro",
  ];

  const [ano, mes, dia] = dataString.split("-");
  const mesPorExtenso = meses[parseInt(mes, 10) - 1];

  return `${dia} de ${mesPorExtenso} de ${ano}`;
}
