import os
import re

files = [f for f in os.listdir('app/calculators') if f.endswith('.tsx')]
for file in files:
    with open(f'app/calculators/{file}', 'r', encoding='utf-8') as f:
        data = f.read()

    # Colors
    data = re.sub(r'color:\s*Colors\.white,', "color: Colors.text,\n    fontFamily: 'DMSans_500Medium',", data)
    data = re.sub(r'color:\s*Colors\.white\b', "color: Colors.text", data)
    data = re.sub(r"color:\s*'#000'", "color: Colors.text", data)
    data = re.sub(r"color:\s*'#FFF'", "color: Colors.text", data)
    data = re.sub(r"color:\s*'#FFFFFF'", "color: Colors.text", data)
    data = re.sub(r'color:\s*Colors\.navy,', "color: Colors.text,", data)
    data = re.sub(r'backgroundColor:\s*Colors\.navy,', "backgroundColor: Colors.background,", data)
    
    # Backgrounds and borders
    data = re.sub(r'backgroundColor:\s*Colors\.cardBg,', "backgroundColor: Colors.cardBg,\n    borderColor: Colors.border,\n    borderWidth: 1,", data)
    data = re.sub(r"backgroundColor:\s*'#1B2F53',", "backgroundColor: Colors.cardBg,\n    borderColor: Colors.border,\n    borderWidth: 1,", data)
    data = re.sub(r"backgroundColor:\s*'#0F2650'", "backgroundColor: Colors.cardBg,\n    borderColor: Colors.border,\n    borderWidth: 1", data)
    data = re.sub(r"backgroundColor:\s*'#2A4365'", "backgroundColor: Colors.inputBg,\n    borderColor: Colors.border,\n    borderWidth: 1", data)

    # Fonts
    data = re.sub(r"fontWeight:\s*'bold',", "fontFamily: 'DMSans_700Bold',", data)
    data = re.sub(r"fontWeight:\s*'500',", "fontFamily: 'DMSans_500Medium',", data)
    data = re.sub(r"fontWeight:\s*'300',", "fontFamily: 'DMSans_400Regular',", data)

    # Pickers
    data = re.sub(r"dropdownIconColor=\{Colors\.white\}", "dropdownIconColor={Colors.text}", data)

    # Edge cases
    data = re.sub(r"backgroundColor:\s*'#E0E5EC',", "backgroundColor: '#E2E8F0',", data) # Lighter action buttons for basic calc
    
    with open(f'app/calculators/{file}', 'w', encoding='utf-8') as f:
        f.write(data)

print("Migration complete!")
