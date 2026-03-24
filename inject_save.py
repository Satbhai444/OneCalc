import os
import re

calc_dir = r"app/calculators"

handlers = {
    "basic.tsx": (r"(setResult\(evalResult\.toString\(\)\);)", r"\1\n        saveHistory('basic', input, evalResult.toString());\n        scheduleSmartNotification('basic');"),
    "scientific.tsx": (r"(setResult\(evalResult\.toString\(\)\);)", r"\1\n        saveHistory('scientific', input, evalResult.toString());\n        scheduleSmartNotification('scientific');"),
    "emi.tsx": (r"(setResult\(\{ emi, totalAmount, totalInterest \}\);)", r"\1\n    saveHistory('emi', `P:${principal} R:${rate}% T:${tenure}`, `EMI: ${emi}`);\n    scheduleSmartNotification('emi');"),
    "gst.tsx": (r"(setResult\(\{ baseAmount, gstAmount, totalAmount, mode: calcMode \}\);)", r"\1\n    saveHistory('gst', `Amt:${amount} Rate:${rate}%`, `Total: ${totalAmount}`);\n    scheduleSmartNotification('gst');"),
    "interest.tsx": (r"(setResult\(\{ principalAmount, interestAmount, totalAmount, type \}\);)", r"\1\n    saveHistory('interest', `P:${principal} R:${rate}%`, `Total: ${totalAmount}`);\n    scheduleSmartNotification('interest');"),
    "age.tsx": (r"(const results = calculateAge\(\);)", r"\1\n  saveHistory('age', dob.toLocaleDateString(), `${results.years}y ${results.months}m ${results.days}d`);\n  scheduleSmartNotification('age');"),
    "discount.tsx": (r"(setResult\(\{ discountAmount: discountAmt, finalPrice: final \}\);)", r"\1\n    saveHistory('discount', `Price:${price} Off:${discount}%`, `Final: ${final}`);\n    scheduleSmartNotification('discount');"),
    "split.tsx": (r"(setResult\(\{ totalPerPerson: perPerson, tipPerPerson \}\);)", r"\1\n    saveHistory('split', `Bill:${amount} Ppl:${people} Tip:${tip}%`, `Per Person: ${perPerson}`);\n    scheduleSmartNotification('split');"),
}

for filename, (pattern, replacement) in handlers.items():
    filepath = os.path.join(calc_dir, filename)
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Only inject once
        if 'saveHistory(' not in content:
            new_content = re.sub(pattern, replacement, content)
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Injected calculation hook into {filename}")
        else:
            print(f"Already injected {filename}")

