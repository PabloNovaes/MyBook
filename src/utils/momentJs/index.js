import moment from "moment";

export function testDate(date) {
  try {
    moment.locale("pt-br")
    
    const current = moment();
    const difference = moment.duration(current.diff(date));

    const timeUnits = [
      { unit: "anos", value: Math.floor(difference.asYears()) },
      { unit: "meses", value: Math.floor(difference.asMonths()) },
      { unit: "dias", value: Math.floor(difference.asDays()) },
      { unit: "horas", value: Math.floor(difference.asHours()) },
      { unit: "minutos", value: Math.floor(difference.asMinutes()) },
      { unit: "segundos", value: Math.floor(difference.asSeconds()) },
    ];

    const singularTimeUnit = {
      segundos: "segundo",
      minutos: "minuto",
      horas: "hora",
      dias: "dia",
      meses: "mês",
      anos: "ano",
    };

    const timeUnit = timeUnits.find(
      (unit) => unit.value != 0 && unit.value > -1
    );

    timeUnit.unit =
      timeUnit.value == 1 ? singularTimeUnit[timeUnit.unit] : timeUnit.unit;

    return `Há ${timeUnit.value} ${timeUnit.unit}`;
  } catch (err) {
    return err;
  }
}
