const settings = {
  NI: { free: 9500, rate: 12 },
  tax: { free: 12500, firstRate: 20, secondRate: 40, thirdRate: 45 },
  brackets: {
    personalAllowance: 12570,
    firstBracket: 50270,
    secondBracket: 150000,
  },
};

const calculateFunction = (salary, pensionPercentage) => {
  const salaryInt = Number(salary);
  if (salaryInt > 0) {
    console.log("salary RAW", salary);
    const pensionInt = Number(pensionPercentage);
    if (salaryInt < settings.NI.free) {
      console.log("less than NI\n");
      //   const pensionContibution = parseFloat(
      //     (salaryInt * pensionInt) / 100
      //   ).toFixed(2);
      //   const NIYear = 0;
      //   const Takehome = Number(salaryInt) - Number(pensionContibution);
      //   const totalTax = 0;
      //   return { totalTax, NIYear, pensionContibution, Takehome };
    }
  } else if (
    settings.brackets.personalAllowance > salaryInt &&
    salaryInt > settings.NI.free
  ) {
    //tax free
    console.log("tax free");
    // const pensionContibution = parseFloat(
    //   (salaryInt * pensionInt) / 100
    // ).toFixed(2);
    // const NIdeducable = salaryInt - settings.NI.free;
    // const NIYear = (NIdeducable * settings.NI.rate) / 100;
    // const Takehome = Number(salaryInt) - Number(pensionContibution);
    // const totalTax = 0;
    // return { totalTax, NIYear, pensionContibution, Takehome };
  } else if (
    settings.brackets.personalAllowance < salaryInt &&
    salaryInt < settings.brackets.firstBracket
  ) {
    console.log("first bracket and second bracket");
  } else if (
    settings.brackets.firstBracket > salaryInt &&
    salaryInt < settings.brackets.secondBracket
  ) {
    console.log("between personal allowance and second bracket\n");
    // const taxableSalary = salaryInt - settings.tax.free;
    // console.log("Taxable salary:", taxableSalary);
    // const totalTax = parseFloat(
    //   (taxableSalary * settings.tax.firstRate) / 100
    // ).toFixed(2);

    // console.log("total tax:", totalTax);
    // const NIdeducable = salaryInt - settings.NI.free;
    // const NIYear = parseFloat((NIdeducable * settings.NI.rate) / 100).toFixed(
    //   2
    // );
    // console.log("total NI:", Number(NIYear));
    // const pensionContibution = parseFloat(
    //   (salaryInt * pensionInt) / 100
    // ).toFixed(2);
    // console.log("totalPension:", pensionContibution);
    // const Takehome =
    //   Number(salaryInt) -
    //   Number(NIYear) -
    //   Number(totalTax) -
    //   Number(pensionContibution);
    // console.log("TAKE HOME:", Takehome);
    // return { totalTax, NIYear, pensionContibution, Takehome };
  } else {
    return;
  }
};

export default calculateFunction;
