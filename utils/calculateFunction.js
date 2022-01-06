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
    if (salaryInt > settings.brackets.secondBracket) {
      console.log("more than 150 000 ");
      const taxOnFirstBracket = parseFloat(
        Number(37699 * settings.tax.firstRate) / 100
      ).toFixed(2);
      console.log("tax on first bracket", taxOnFirstBracket);
      const taxOnSecondBracket = parseFloat(
        Number(99729 * settings.tax.secondRate) / 100
      ).toFixed(2);
      console.log("tax on second bracket", taxOnSecondBracket);

      const taxableSalaryThirdBracket = salaryInt - 150000;
      const taxOnThidBracket = parseFloat(
        Number(taxableSalaryThirdBracket * settings.tax.thirdRate) / 100
      ).toFixed(2);
      console.log("tax on third bracket", taxOnThidBracket);

      const totalTax =
        Number(taxOnFirstBracket) +
        Number(taxOnSecondBracket) +
        Number(taxOnThidBracket);

      console.log("total tax:", totalTax);
      const NIdeducable = salaryInt - settings.NI.free;
      const NIYear = parseFloat((NIdeducable * settings.NI.rate) / 100).toFixed(
        2
      );
      console.log("total NI:", Number(NIYear));
      const pensionContibution = parseFloat(
        (salaryInt * pensionInt) / 100
      ).toFixed(2);
      console.log("totalPension:", pensionContibution);
      const Takehome =
        Number(salaryInt) -
        Number(NIYear) -
        Number(totalTax) -
        Number(pensionContibution);
      console.log("TAKE HOME:", Takehome);
      return { totalTax, NIYear, pensionContibution, Takehome };
    } else if (
      (Number(settings.brackets.firstBracket) < salaryInt) &
      (salaryInt < Number(settings.brackets.secondBracket))
    ) {
      console.log("!!between first and second bracket\n");
      const taxableSalary = salaryInt - settings.tax.free;
      console.log("Taxable salary:", taxableSalary);
      const totalTax = parseFloat(
        (taxableSalary * settings.tax.secondRate) / 100
      ).toFixed(2);

      console.log("total tax:", totalTax);
      const NIdeducable = salaryInt - settings.NI.free;
      const NIYear = parseFloat((NIdeducable * settings.NI.rate) / 100).toFixed(
        2
      );
      console.log("total NI:", Number(NIYear));
      const pensionContibution = parseFloat(
        (salaryInt * pensionInt) / 100
      ).toFixed(2);
      console.log("totalPension:", pensionContibution);
      const Takehome =
        Number(salaryInt) -
        Number(NIYear) -
        Number(totalTax) -
        Number(pensionContibution);
      console.log("TAKE HOME:", Takehome);
      return { totalTax, NIYear, pensionContibution, Takehome };
    } else if (
      (settings.brackets.personalAllowance < salaryInt) &
      (salaryInt < settings.brackets.firstBracket)
    ) {
      console.log("personal allowance and first bracket");
      const NIdeducable = salaryInt - settings.NI.free;
      const taxableSalary = salaryInt - settings.tax.free;
      const totalTax = parseFloat(
        (taxableSalary * settings.tax.firstRate) / 100
      ).toFixed(2);
      const NIYear = (NIdeducable * settings.NI.rate) / 100;
      const pensionContibution = parseFloat(
        (salaryInt * pensionInt) / 100
      ).toFixed(2);
      const Takehome =
        Number(salaryInt) -
        Number(pensionContibution) -
        Number(NIYear) -
        Number(totalTax);
      return { totalTax, NIYear, pensionContibution, Takehome };
    } else if (
      (salaryInt < settings.brackets.personalAllowance) &
      (salaryInt > settings.NI.free)
    ) {
      //tax free
      console.log("tax free");
      const pensionContibution = parseFloat(
        (salaryInt * pensionInt) / 100
      ).toFixed(2);
      const NIdeducable = salaryInt - settings.NI.free;
      const NIYear = (NIdeducable * settings.NI.rate) / 100;
      const totalTax = 0;
      const Takehome =
        Number(salaryInt) - Number(pensionContibution) - Number(NIYear);
      return { totalTax, NIYear, pensionContibution, Takehome };
    } else if (salaryInt < settings.NI.free) {
      console.log("less than NI\n");
      const pensionContibution = parseFloat(
        (salaryInt * pensionInt) / 100
      ).toFixed(2);
      const NIYear = 0;
      const Takehome = Number(salaryInt) - Number(pensionContibution);
      const totalTax = 0;
      return { totalTax, NIYear, pensionContibution, Takehome };
    }
  } else {
    return;
  }
};

export default calculateFunction;
