import EMICalculator from './EMICalculator';
import SIPCalculator from './SIPCalculator';
import GSTCalculator from './GSTCalculator';
import AgeCalculator from './AgeCalculator';
import ScientificCalculator from './ScientificCalculator';
import BMICalculator from './BMICalculator';
import DiscountCalculator from './DiscountCalculator';
import BasicCalculator from './BasicCalculator';
import FDCalculator from './FDCalculator';
import PercentageCalculator from './PercentageCalculator';
import UnitPriceCalculator from './UnitPriceCalculator';

export const ToolRegistry: Record<string, React.ComponentType> = {
  emi: EMICalculator,
  sip: SIPCalculator,
  gst: GSTCalculator,
  age: AgeCalculator,
  scientific: ScientificCalculator,
  bmi: BMICalculator,
  discount: DiscountCalculator,
  basic: BasicCalculator,
  fd: FDCalculator,
  percentage: PercentageCalculator,
  'unit-price': UnitPriceCalculator,
  // More will be added here...
};
