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
import SplitBillCalculator from './SplitBillCalculator';
import LengthConverter from './LengthConverter';
import DiceRoller from './DiceRoller';
import CoinToss from './CoinToss';
import LoveCalculator from './LoveCalculator';
import SpinWheel from './SpinWheel';
import RockPaperScissors from './RockPaperScissors';
import Magic8Ball from './Magic8Ball';
import LotteryGenerator from './LotteryGenerator';
import NumberGuessGame from './NumberGuessGame';
import AreaConverter from './AreaConverter';
import WeightConverter from './WeightConverter';
import TemperatureConverter from './TemperatureConverter';
import CardPicker from './CardPicker';
import TruthOrDare from './TruthOrDare';
import MemoryGame from './MemoryGame';
import ZodiacFinder from './ZodiacFinder';
import InvestmentReturn from './InvestmentReturn';
import MortgageCalculator from './MortgageCalculator';
import PercentageChange from './PercentageChange';
import TipCalculator from './TipCalculator';
import TaxCalculator from './TaxCalculator';
import RetirementCalculator from './RetirementCalculator';
import LoanEligibility from './LoanEligibility';
import SalaryTaxSplit from './SalaryTaxSplit';
import GSTReverse from './GSTReverse';
import LoanPrepayment from './LoanPrepayment';
import EMIInterestSplit from './EMIInterestSplit';
import BMRCalculator from './BMRCalculator';
import CalorieCalculator from './CalorieCalculator';
import WaterIntake from './WaterIntake';
import IdealWeight from './IdealWeight';
import BACEstimator from './BACEstimator';
import BasesConverter from './BasesConverter';
import QuadraticSolver from './QuadraticSolver';
import PrimeChecker from './PrimeChecker';
import RomanConverter from './RomanConverter';
import GPACalculator from './GPACalculator';
import ScientificNotation from './ScientificNotation';
import Base64Tool from './Base64Tool';
import PalindromeChecker from './PalindromeChecker';
import SpeedCalculator from './SpeedCalculator';
import LCMHCFCalculator from './LCMHCFCalculator';
import NumberToWords from './NumberToWords';
import CAGRCalculator from './CAGRCalculator';
import PasswordGenerator from './PasswordGenerator';
import TextCaseConverter from './TextCaseConverter';
import TextCounter from './TextCounter';
import RandomNumberGenerator from './RandomNumberGenerator';
import PasswordStrength from './PasswordStrength';

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
  'split-bill': SplitBillCalculator,
  length: LengthConverter,
  dice: DiceRoller,
  'coin-toss': CoinToss,
  'love-calc': LoveCalculator,
  'spin-wheel': SpinWheel,
  'rock-paper-scissors': RockPaperScissors,
  'magic-8-ball': Magic8Ball,
  lottery: LotteryGenerator,
  'number-guess': NumberGuessGame,
  area: AreaConverter,
  weight: WeightConverter,
  temperature: TemperatureConverter,
  'card-picker': CardPicker,
  'truth-dare': TruthOrDare,
  'memory-game': MemoryGame,
  zodiac: ZodiacFinder,
  investment: InvestmentReturn,
  mortgage: MortgageCalculator,
  'percentage-change': PercentageChange,
  tip: TipCalculator,
  tax: TaxCalculator,
  retirement: RetirementCalculator,
  'loan-eligibility': LoanEligibility,
  'salary-tax-split': SalaryTaxSplit,
  'gst-reverse': GSTReverse,
  'loan-prepayment': LoanPrepayment,
  'emi-interest-split': EMIInterestSplit,
  bmr: BMRCalculator,
  calorie: CalorieCalculator,
  'water-intake': WaterIntake,
  'ideal-weight': IdealWeight,
  bac: BACEstimator,
  bases: BasesConverter,
  quadratic: QuadraticSolver,
  prime: PrimeChecker,
  roman: RomanConverter,
  gpa: GPACalculator,
  'scientific-notation': ScientificNotation,
  base64: Base64Tool,
  palindrome: PalindromeChecker,
  speed: SpeedCalculator,
  'lcm-hcf': LCMHCFCalculator,
  'number-to-words': NumberToWords,
  cagr: CAGRCalculator,
  password: PasswordGenerator,
  'text-case': TextCaseConverter,
  'text-counter': TextCounter,
  'random-number': RandomNumberGenerator,
  'password-strength': PasswordStrength,
  // More will be added here...
};
