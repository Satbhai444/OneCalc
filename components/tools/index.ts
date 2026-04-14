import EMICalculator from './EMICalculator';
import SIPCalculator from './SIPCalculator';
import GSTCalculator from './GSTCalculator';
import AgeCalculator from './AgeCalculator';
import ScientificCalculator from './ScientificCalculator';

export const ToolRegistry: Record<string, React.ComponentType> = {
  emi: EMICalculator,
  sip: SIPCalculator,
  gst: GSTCalculator,
  age: AgeCalculator,
  scientific: ScientificCalculator,
  // More will be added here...
};
