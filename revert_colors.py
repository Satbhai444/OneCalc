import os
import re

files = [f for f in os.listdir('app/calculators') if f.endswith('.tsx')]

for file in files:
    path = f'app/calculators/{file}'
    slug = file.replace('.tsx', '')
    
    with open(path, 'r', encoding='utf-8') as f:
        data = f.read()

    # 1. Hook
    data = re.sub(r"const\s*\{\s*colors:\s*GlobalColors\s*\}\s*=\s*useApp\(\);\s*const\s*Colors\s*=\s*GlobalColors\.themes\.[a-zA-Z]+;", "const { colors: Colors } = useApp();", data)
    
    # 2. Backgrounds
    data = data.replace('Colors.screenBg', 'Colors.background')
    data = data.replace('Colors.displayBg', 'Colors.background')
    data = data.replace('Colors.numBtn', 'Colors.inputBg')
    data = data.replace('Colors.fnBtn', "Colors.inputBg")
    data = data.replace("Colors.opBtn", f"Colors.accents.{slug}")
    data = data.replace('Colors.eqBtn', f"Colors.accents.{slug}")
    
    # 3. Colors
    data = data.replace('Colors.textColor', 'Colors.white')
    data = data.replace('Colors.displayText', 'Colors.white')
    data = data.replace("color: Colors.text", "color: Colors.white")

    # 4. Fonts
    data = re.sub(r"fontFamily:\s*'Nunito_700Bold'", "fontWeight: 'bold'", data)
    data = re.sub(r"fontFamily:\s*'Nunito_900Black'", "fontWeight: 'bold'", data)
    data = re.sub(r"fontFamily:\s*'Nunito_500Medium'", "fontWeight: '500'", data)
    data = re.sub(r"fontFamily:\s*'Nunito_400Regular'", "fontWeight: 'bold'", data)
    data = re.sub(r"fontFamily:\s*'DMSans_700Bold'", "fontWeight: 'bold'", data)
    data = re.sub(r"fontFamily:\s*'DMSans_500Medium'", "fontWeight: '500'", data)
    data = re.sub(r"fontFamily:\s*'DMSans_400Regular'", "fontWeight: 'bold'", data)

    # 5. Borders
    data = re.sub(r"borderColor:\s*'rgba\(0,0,0,0\.05\)'", "borderColor: '#2A4365'", data)
    data = data.replace("borderColor: Colors.border", "borderColor: '#2A4365'")
    
    # Header Accent
    data = re.sub(r'accentColor=\{Colors\.accents\.[a-zA-Z]+\}', f'accentColor={{Colors.accents.{slug}}}', data)

    with open(path, 'w', encoding='utf-8') as f:
        f.write(data)

print("Reverted colors across all calculators.")
